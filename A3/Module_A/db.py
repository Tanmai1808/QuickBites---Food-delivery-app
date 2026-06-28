import mysql.connector

# Local DB (still used by other blueprints like auth, customer, etc.)
def get_db():
    return mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="root123",
        database="mydb"
    )

# Professor's 3 shard servers
SHARD_CONFIGS = {
    0: {
        "host": "10.0.116.184",
        "port": 3307,
        "user": "P_and_team",
        "password": "password@123",
        "database": "P_and_team"
    },
    1: {
        "host": "10.0.116.184",
        "port": 3308,
        "user": "P_and_team",
        "password": "password@123",
        "database": "P_and_team"
    },
    2: {
        "host": "10.0.116.184",
        "port": 3309,
        "user": "P_and_team",
        "password": "password@123",
        "database": "P_and_team"
    }
}

def get_shard_db(shard_number):
    config = SHARD_CONFIGS[shard_number]
    return mysql.connector.connect(**config)