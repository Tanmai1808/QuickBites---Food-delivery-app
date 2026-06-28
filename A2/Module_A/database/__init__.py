from bplustree import BPlusTree

def test_bplustree():

    print("===== B+ TREE TEST START =====\n")

    tree = BPlusTree(order=3)

    # -------- INSERT --------
    print("Inserting values...")
    data = [10, 20, 5, 15, 25, 30, 35]

    for key in data:
        tree.insert(key, f"value_{key}")

    print("All data:", tree.get_all())
    print()


    # -------- SEARCH --------
    print("Testing search...")
    print("Search 15:", tree.search(15))
    print("Search 100 (not present):", tree.search(100))
    print()


    # -------- UPDATE --------
    print("Testing update...")
    tree.update(15, "UPDATED_15")
    print("After update:", tree.search(15))
    print()


    # -------- RANGE QUERY --------
    print("Testing range query (10 to 30)...")
    print(tree.range_query(10, 30))
    print()


    # -------- DELETE --------
    print("Testing delete...")

    delete_keys = [15, 25, 5]

    for key in delete_keys:
        print(f"Deleting {key}...")
        tree.delete(key)
        print("Current data:", tree.get_all())
        print()

    # -------- FINAL TREE --------
    print("Final tree data:")
    print(tree.get_all())
    print()


    # -------- VISUALIZATION --------
    print("Generating tree visualization...")
    dot = tree.visualize_tree()
    dot.render("bplustree_output", format="png", view=True)

    print("\n===== TEST COMPLETE =====")


if __name__ == "__main__":
    test_bplustree()