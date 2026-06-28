from db import get_shard_db

NUM_SHARDS = 3

def get_shard_number(item_id):
    """Returns which shard (0, 1, or 2) this item_id belongs to."""
    return item_id % NUM_SHARDS

def get_shard_connection(item_id):
    """Returns (connection, shard_number) for the given item_id."""
    shard = get_shard_number(item_id)
    conn = get_shard_db(shard)
    return conn, shard

def get_all_shard_connections():
    """Returns list of (connection, shard_number) for all 3 shards."""
    return [(get_shard_db(i), i) for i in range(NUM_SHARDS)]