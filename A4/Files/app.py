from flask import Flask, jsonify
from flask_cors import CORS

from routes import menu_bp
from auth import auth_bp
from customer import customer_bp
from Restaurant import restaurant_bp
from delivery import delivery_bp
from admin import admin_bp

from db import get_shard_db      # ← changed
from wal import wal_replay
from bptree import BPlusTree

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

bptree = BPlusTree(order=3)

def load_bptree():
    # Load item_ids from all 3 professor shard servers
    for shard_num in range(3):
        try:
            conn = get_shard_db(shard_num)
            cursor = conn.cursor()
            cursor.execute("SELECT item_id FROM menuitem")
            rows = cursor.fetchall()
            for row in rows:
                bptree.insert(row[0], None)
            print(f"✅ B+ Tree synced from shard {shard_num} (port {3307 + shard_num}) ({len(rows)} items)")
            cursor.close()
            conn.close()
        except Exception as e:
            print(f"❌ Could not sync from shard {shard_num}: {e}")

    # WAL crash recovery (still uses local DB)
    from db import get_db
    conn2 = get_db()
    cursor2 = conn2.cursor()
    wal_replay(bptree, cursor2)
    cursor2.close()
    conn2.close()

    print("✅ B+ Tree fully synced from all shards")

load_bptree()

app.register_blueprint(menu_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(customer_bp)
app.register_blueprint(restaurant_bp, url_prefix='/api/restaurant')
app.register_blueprint(delivery_bp, url_prefix='/api/delivery')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

import routes
routes.bptree = bptree

@app.route('/')
def index():
    return jsonify({"status": "Server is Up", "message": "Quick Bites Backend Running"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)