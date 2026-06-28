# Shard Key Justification — MenuItem Table

## 1. Chosen Shard Key: `item_id`

### Justification Point 1 — High Cardinality (Unique Primary Key)

`item_id` is the PRIMARY KEY of the `MenuItem` table, meaning it is unique for every single row. High cardinality is essential for a shard key because it ensures the hash function has enough distinct input values to spread rows evenly across shards. A low-cardinality field (e.g., `category_id`, which only has 10 distinct values) would result in many rows sharing the same hash bucket, causing severe skew. With `item_id` being unique per item, we have maximum cardinality — every row produces a distinct hash input — making it the strongest possible shard key candidate from a distribution standpoint.

---

### Justification Point 2 — Query Alignment (Used in Every API Endpoint's WHERE Clause)

Every API endpoint in the application that reads or modifies a menu item references `item_id` directly in its WHERE clause. For example:
- `GET /menu/<item_id>` — fetch a single item
- `PUT /menu/<item_id>` — update an item
- `DELETE /menu/<item_id>` — remove an item

Because the shard key appears in every query predicate, the application can compute `shard = item_id % 3` at request time and route directly to the correct shard — no scatter-gather (fan-out to all shards) is needed for single-item lookups. This property, called **query alignment**, is critical: a shard key that is not in the WHERE clause forces every query to hit all shards, eliminating the scalability benefit of sharding entirely.

---

### Justification Point 3 — Stability (Never Changes After Insertion)

`item_id` is assigned at insertion time and never updated. This is a mandatory property for a shard key. If a shard key value were allowed to change (e.g., a `price` or `item_name` field), the record would need to be physically moved to a different shard after the update — requiring a delete on the old shard and an insert on the new one, while keeping the B+ Tree and routing table consistent. This is extremely error-prone and expensive. Because `item_id` is immutable, once a row is placed in shard `item_id % 3`, it stays there forever, keeping both the sharding logic and the B+ Tree index stable.

---

## 2. Partitioning Strategy: Hash-Based over Range-Based and Directory-Based

### Why Hash-Based Partitioning?

Hash-based partitioning was chosen because it provides the most **even data distribution** for integer primary keys like `item_id`.

**vs. Range-Based Partitioning:**  
Range partitioning assigns rows based on value intervals (e.g., item_id 1–100 → Shard 0, 101–200 → Shard 1). This works well for datasets with uniformly distributed insertions over time, but our `item_id` values are sequential integers (701–720) inserted largely in one batch. Range partitioning on sequential IDs causes **hotspot skew** — the shard holding the current highest range receives all new inserts while other shards sit idle. Hash partitioning avoids this entirely by distributing based on `item_id % num_shards`, which spreads sequential integers uniformly across shards by design.

**vs. Directory-Based Partitioning:**  
Directory (lookup-table) partitioning maintains an explicit mapping of every key to its shard. While this offers maximum flexibility (any routing pattern is possible), it introduces a **lookup bottleneck** — every query must first consult the directory table before hitting the data shard. This adds latency and creates a single point of failure. For our use case, where routing can be computed deterministically with a simple modulo operation, a directory adds complexity and overhead with no benefit.

**Conclusion:**  
`shard_id = item_id % 3` is O(1), requires no external lookup, distributes sequential integers evenly, and eliminates hotspots — making hash-based partitioning the correct choice.

---

## 3. Estimated Data Distribution

With 19 menu items and 3 shards using `item_id % 3`:

| Shard | item_ids | Count |
|-------|----------|-------|
| Shard 0 (`item_id % 3 == 0`) | 702, 705, 708, 711, 714, 717, 720 | **7 items** |
| Shard 1 (`item_id % 3 == 1`) | 703, 706, 712, 715, 718 | **5 items** |
| Shard 2 (`item_id % 3 == 2`) | 701, 704, 707, 710, 713, 716, 719 | **7 items** |

**Expected:** ~6–7 items per shard (19 ÷ 3 ≈ 6.33)  
**Actual:** 7 / 5 / 7

The distribution is very close to ideal. The minor imbalance (shard 1 has 5 instead of 7) is because 19 is not perfectly divisible by 3 — this is expected and acceptable. The **risk of skew is low** because:
1. `item_id` values are spread across the modulo space (701–720), not clustered.
2. As new items are added, the distribution will continue to balance naturally since sequential IDs cycle evenly through all three remainders.
3. No single shard is more than 2 items heavier than another, well within acceptable variance for this dataset size.
