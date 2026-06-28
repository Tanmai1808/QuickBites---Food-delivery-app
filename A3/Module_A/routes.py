import json
import os
from datetime import datetime
from flask import Blueprint, jsonify, request
from db import get_db
from shard_router import get_shard_connection, get_all_shard_connections, get_shard_number
from validation import validate
from wal import wal_write, wal_commit, wal_get_log, wal_rollback

bptree = None
menu_bp = Blueprint('menu_bp', __name__)


# ============================================================
# 1. Status check
# ============================================================
@menu_bp.route('/api/status', methods=['GET'])
def check_status():
    return jsonify({"status": "success", "message": "The Food Delivery API is running!"})


# ============================================================
# 2. GET ALL — query all 3 shards and merge
# ============================================================
@menu_bp.route('/api/menu', methods=['GET'])
def get_menu():
    try:
        all_items = []
        for conn, shard_num in get_all_shard_connections():
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM menuitem")
            items = cursor.fetchall()
            all_items.extend(items)
            cursor.close()
            conn.close()

        all_items.sort(key=lambda x: x['item_id'])
        return jsonify({"status": "success", "data": all_items})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 3. GET SINGLE ITEM — route to correct shard
# ============================================================
@menu_bp.route('/api/menu/<int:item_id>', methods=['GET'])
def get_menu_item(item_id):
    try:
        conn, shard_num = get_shard_connection(item_id)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM menuitem WHERE item_id = %s", (item_id,))
        item = cursor.fetchone()
        cursor.close()
        conn.close()

        if not item:
            return jsonify({"status": "error", "message": f"Item {item_id} not found"}), 404

        return jsonify({
            "status": "success",
            "shard_used": shard_num,
            "data": item
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 4. POST — insert into correct shard
# ============================================================
@menu_bp.route('/api/menu', methods=['POST'])
def add_menu_item():
    conn = None
    item_id = None
    try:
        data = request.get_json()
        item_id       = data.get('item_id')
        item_name     = data.get('item_name')
        price         = data.get('price')
        restaurant_id = data.get('restaurant_id')
        category_id   = data.get('category_id')
        availability  = data.get('availability')

        wal_write("INSERT", {"item_id": item_id})

        conn, shard_num = get_shard_connection(item_id)
        cursor = conn.cursor()

        sql = """INSERT INTO menuitem
                 (item_id, item_name, price, restaurant_id, category_id, availability)
                 VALUES (%s, %s, %s, %s, %s, %s)"""
        cursor.execute(sql, (item_id, item_name, price, restaurant_id, category_id, availability))

        bptree.insert(item_id, None)
        conn.commit()
        wal_commit("INSERT", {"item_id": item_id})

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "message": f"Successfully added {item_name} to shard {shard_num}!",
            "shard_used": shard_num
        }), 201

    except Exception as e:
        if conn:
            conn.rollback()
        if item_id is not None:
            try:
                bptree.delete(item_id)
            except Exception:
                pass
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 5. DELETE — route to correct shard
# ============================================================
@menu_bp.route('/api/menu/<int:item_id>', methods=['DELETE'])
def delete_menu_item(item_id):
    conn = None
    try:
        wal_write("DELETE", {"item_id": item_id})

        conn, shard_num = get_shard_connection(item_id)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM menuitem WHERE item_id = %s", (item_id,))
        bptree.delete(item_id)
        conn.commit()
        wal_commit("DELETE", {"item_id": item_id})

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "message": f"Successfully deleted item {item_id} from shard {shard_num}!",
            "shard_used": shard_num
        })

    except Exception as e:
        if conn:
            conn.rollback()
        try:
            bptree.insert(item_id, None)
        except Exception:
            pass
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 6. PUT — route to correct shard
# ============================================================
@menu_bp.route('/api/menu/<int:item_id>', methods=['PUT'])
def update_menu_item(item_id):
    conn = None
    try:
        data = request.get_json()
        new_price        = data.get('price')
        new_availability = data.get('availability')

        wal_write("UPDATE", {"item_id": item_id, "price": new_price, "availability": new_availability})

        conn, shard_num = get_shard_connection(item_id)
        cursor = conn.cursor()

        sql = "UPDATE menuitem SET price = %s, availability = %s WHERE item_id = %s"
        cursor.execute(sql, (new_price, new_availability, item_id))

        if bptree.search(item_id) is None:
            bptree.insert(item_id, None)

        conn.commit()
        wal_commit("UPDATE", {"item_id": item_id, "price": new_price, "availability": new_availability})

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "message": f"Successfully updated item {item_id} on shard {shard_num}!",
            "shard_used": shard_num
        })

    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 7. RANGE QUERY — new endpoint, queries all shards
# ============================================================
@menu_bp.route('/api/menu/range', methods=['GET'])
def range_query():
    try:
        start = request.args.get('start', type=int)
        end   = request.args.get('end', type=int)

        if start is None or end is None:
            return jsonify({"status": "error", "message": "Provide start and end as query params"}), 400

        all_items = []
        for conn, shard_num in get_all_shard_connections():
            cursor = conn.cursor(dictionary=True)
            cursor.execute(
                "SELECT * FROM menuitem WHERE item_id >= %s AND item_id <= %s",
                (start, end)
            )
            items = cursor.fetchall()
            for item in items:
                item['shard_source'] = shard_num   # helpful for demo
            all_items.extend(items)
            cursor.close()
            conn.close()

        all_items.sort(key=lambda x: x['item_id'])

        return jsonify({
            "status": "success",
            "range": f"{start} to {end}",
            "count": len(all_items),
            "data": all_items
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 8. VALIDATE
# ============================================================
@menu_bp.route('/api/validate', methods=['GET'])
def manual_validate():
    try:
        conn = get_db()
        cursor = conn.cursor()
        is_valid  = validate(cursor, bptree, "menuitem", "item_id")
        tree_keys = bptree.get_all_keys()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "consistent": is_valid, "tree_keys": tree_keys})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 9. WAL LOG
# ============================================================
@menu_bp.route('/api/wal/log', methods=['GET'])
def get_wal_log():
    try:
        log = wal_get_log()
        return jsonify({"status": "success", "total": len(log), "log": log})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ============================================================
# 10. CRASH TEST
# ============================================================
@menu_bp.route('/api/menu/crash', methods=['POST'])
def crash_test():
    CRASH_ID = 9999
    conn = None
    tree_inserted = False
    try:
        wal_write("INSERT", {"item_id": CRASH_ID})
        conn, shard_num = get_shard_connection(CRASH_ID)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO menuitem
            (item_id, item_name, price, restaurant_id, category_id, availability)
            VALUES (9999, 'CrashItem', 100, 401, 601, 1)
        """)
        bptree.insert(CRASH_ID, None)
        tree_inserted = True
        raise Exception("Simulated crash before commit!")
        conn.commit()
    except Exception as crash_err:
        if conn:
            conn.rollback()
        if tree_inserted:
            bptree.delete(CRASH_ID)
        wal_rollback("INSERT", {"item_id": CRASH_ID})
        print(f"🔥 CRASH caught → rolled back: {crash_err}")

    conn2 = get_db()
    cursor2 = conn2.cursor()
    is_valid = validate(cursor2, bptree, "menuitem", "item_id")
    tree_has_crash_id = CRASH_ID in bptree.get_all_keys()
    cursor2.close()
    conn2.close()

    return jsonify({
        "status": "success",
        "message": "Crash simulated. Rollback applied.",
        "consistent": is_valid,
        "crash_id_in_tree": tree_has_crash_id
    })