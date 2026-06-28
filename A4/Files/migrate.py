import mysql.connector
from db import get_db, get_shard_db

def migrate():
    # Step 1: Read all existing data from your local DB
    local_conn = get_db()
    local_cursor = local_conn.cursor(dictionary=True)
    local_cursor.execute("SELECT * FROM menuitem")
    all_items = local_cursor.fetchall()
    local_cursor.close()
    local_conn.close()

    print(f"📦 Found {len(all_items)} items in local DB")

    # Step 2: Create menuitem table on each shard and insert correct rows
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS menuitem (
        item_id INT PRIMARY KEY,
        item_name VARCHAR(255),
        price DECIMAL(10,2),
        restaurant_id INT,
        category_id INT,
        availability TINYINT(1)
    )
    """

    shard_counts = {0: 0, 1: 0, 2: 0}

    for shard_num in range(3):
        conn = get_shard_db(shard_num)
        cursor = conn.cursor()

        # Create table
        cursor.execute(create_table_sql)
        conn.commit()
        print(f"✅ Table ready on shard {shard_num}")

        # Insert items belonging to this shard
        for item in all_items:
            if item['item_id'] % 3 == shard_num:
                cursor.execute("""
                    INSERT IGNORE INTO menuitem
                    (item_id, item_name, price, restaurant_id, category_id, availability)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    item['item_id'], item['item_name'], item['price'],
                    item['restaurant_id'], item['category_id'], item['availability']
                ))
                shard_counts[shard_num] += 1

        conn.commit()
        cursor.close()
        conn.close()
        print(f"✅ Shard {shard_num} — inserted {shard_counts[shard_num]} items")

    print("\n🎉 Migration complete!")
    print(f"   Shard 0 (port 3307): {shard_counts[0]} items")
    print(f"   Shard 1 (port 3308): {shard_counts[1]} items")
    print(f"   Shard 2 (port 3309): {shard_counts[2]} items")
    print(f"   Total: {sum(shard_counts.values())} items")

if __name__ == "__main__":
    migrate()