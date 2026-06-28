from bplustree import BPlusTree


class Table:
    def __init__(self, name, schema, order=8, search_key=None):
        self.name = name
        self.schema = schema
        self.order = order
        self.data = BPlusTree(order=order)
        self.search_key = search_key

        if search_key is None or search_key not in schema:
            raise ValueError("search_key must be defined and present in schema")


    # -------- VALIDATION --------
    def validate_record(self, record):
        """
        Check:
        1. All required fields exist
        2. Data types match schema
        """

        # Check all fields present
        for field in self.schema:
            if field not in record:
                raise ValueError(f"Missing field: {field}")

        # Check data types
        for field, dtype in self.schema.items():
            if not isinstance(record[field], dtype):
                raise TypeError(f"Incorrect type for {field}, expected {dtype}")

        return True


    # -------- INSERT --------
    def insert(self, record):
        """
        Insert record using search_key as key
        """

        self.validate_record(record)

        key = record[self.search_key]

        self.data.insert(key, record)


    # -------- GET --------
    def get(self, record_id):
        return self.data.search(record_id)


    # -------- GET ALL --------
    def get_all(self):
        return self.data.get_all()


    # -------- UPDATE --------
    def update(self, record_id, new_record):
        self.validate_record(new_record)
        return self.data.update(record_id, new_record)


    # -------- DELETE --------
    def delete(self, record_id):
        self.data.delete(record_id)


    # -------- RANGE QUERY --------
    def range_query(self, start_value, end_value):
        return self.data.range_query(start_value, end_value)