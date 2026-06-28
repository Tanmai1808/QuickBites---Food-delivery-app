class BruteForceDB:

    def __init__(self):
        # Store data as a simple list of (key, value) pairs
        self.data = []


    # -------- INSERT --------
    def insert(self, key, value):
        self.data.append((key, value))


    # -------- SEARCH --------
    def search(self, key):
        for k, v in self.data:
            if k == key:
                return v
        return None


    # -------- DELETE --------
    def delete(self, key):
        new_data = []
        found = False

        for k, v in self.data:
            if k == key and not found:
                found = True
                continue
            new_data.append((k, v))

        self.data = new_data
        return found


    # -------- UPDATE --------
    def update(self, key, new_value):
        for i, (k, v) in enumerate(self.data):
            if k == key:
                self.data[i] = (k, new_value)
                return True
        return False


    # -------- RANGE QUERY --------
    def range_query(self, start, end):
        result = []
        for k, v in self.data:
            if start <= k <= end:
                result.append(v)
        return result


    # -------- GET ALL --------
    def get_all(self):
        # Sort for fair comparison with B+ Tree
        return sorted(self.data, key=lambda x: x[0])
    
