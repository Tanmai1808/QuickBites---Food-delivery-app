from table import Table


class DatabaseManager:
    def __init__(self):
        self.databases = {}


    # -------- CREATE DATABASE --------
    def create_database(self, db_name):
        if db_name in self.databases:
            print(f"Database '{db_name}' already exists")
            return

        self.databases[db_name] = {}
        print(f"Database '{db_name}' created")


    # -------- DELETE DATABASE --------
    def delete_database(self, db_name):
        if db_name in self.databases:
            del self.databases[db_name]
            print(f"Database '{db_name}' deleted")
        else:
            print("Database not found")


    # -------- LIST DATABASES --------
    def list_databases(self):
        return list(self.databases.keys())


    # -------- CREATE TABLE --------
    def create_table(self, db_name, table_name, schema, order=8, search_key=None):

        if db_name not in self.databases:
            print("Database not found")
            return

        if table_name in self.databases[db_name]:
            print("Table already exists")
            return

        table = Table(table_name, schema, order, search_key)
        self.databases[db_name][table_name] = table

        print(f"Table '{table_name}' created in database '{db_name}'")


    # -------- DELETE TABLE --------
    def delete_table(self, db_name, table_name):

        if db_name not in self.databases:
            print("Database not found")
            return

        if table_name in self.databases[db_name]:
            del self.databases[db_name][table_name]
            print(f"Table '{table_name}' deleted")
        else:
            print("Table not found")


    # -------- LIST TABLES --------
    def list_tables(self, db_name):

        if db_name not in self.databases:
            print("Database not found")
            return []

        return list(self.databases[db_name].keys())


    # -------- GET TABLE --------
    def get_table(self, db_name, table_name):

        if db_name not in self.databases:
            print("Database not found")
            return None

        if table_name not in self.databases[db_name]:
            print("Table not found")
            return None

        return self.databases[db_name][table_name]