
# Assignment 4 — Database Sharding and Scalability

## Overview

This assignment extends the QuickBites backend to support horizontal
scaling through sharding. The existing menuitem table from Assignment 3
was partitioned across three simulated shard tables, and the Flask API
was modified to route every query to the correct shard.

## Shard Key Selection

item_id was chosen as the shard key because it is:
- High cardinality — a unique primary key with many distinct values
- Query-aligned — used in every API endpoint's WHERE clause
- Stable — never changes after a record is inserted

## Partitioning Strategy

Hash-based partitioning was used over range-based and directory-based
strategies because it distributes sequential integer IDs more evenly
across shards without needing an extra lookup table.

Formula:
shard_id = item_id % 3

## Module A — Shard Key Justification and Data Partitioning

Three shard tables were created and populated by migrating existing data
from the original menuitem table:

shard_0_menuitem   (item_id % 3 == 0)
shard_1_menuitem   (item_id % 3 == 1)
shard_2_menuitem   (item_id % 3 == 2)

Migration was verified to ensure no data loss and no duplication across
shards — total row count across all shards matches the original table,
and no item_id appears in more than one shard.

Key file:
- Module_A/shard_migration.sql

## Module B — Query Routing Implementation

The Flask backend was modified so every operation routes to the correct
shard:

- INSERT routes to the shard calculated from item_id
- DELETE and UPDATE route to the shard owning that item_id
- GET single item routes to one shard only
- GET all menu items queries all three shards and merges results
- A new range query endpoint queries all shards and merges/sorts results

Key files:
- Module_B/shard_router.py — shard calculation logic
- Module_B/routes.py — updated CRUD routes with shard routing
- Module_B/app.py — updated to load the B+ Tree from all three shards on startup

### API Endpoints

| Method | Endpoint | Behaviour |
|--------|----------|-----------|
| POST | /api/menu | Inserts into the correct shard based on item_id |
| GET | /api/menu/<id> | Reads from the correct shard only |
| GET | /api/menu | Reads from all shards and merges results |
| DELETE | /api/menu/<id> | Deletes from the correct shard |
| PUT | /api/menu/<id> | Updates the correct shard |
| GET | /api/menu/range?start=X&end=Y | Queries all shards and merges/sorts results |

## How to Run

1. Run the SQL migration script first:
   mysql -u your_username -p quickbites < Module_A/shard_migration.sql

2. Install dependencies:
   pip install flask flask-cors mysql-connector-python

3. Run the server:
   python Module_B/app.py

## Scalability and Trade-offs Analysis

**Horizontal vs Vertical Scaling:** Sharding achieves horizontal scaling by
splitting data across multiple shard tables instead of upgrading a single
server's hardware. New shards can be added as data grows.

**Consistency:** In this single-MySQL-server simulation, consistency is
maintained since all shards share the same server. In a true distributed
setup across separate servers, consistency could break if a write to one
shard succeeds while a related write to another fails.

**Availability:** If one shard goes down in a real distributed system, all
items belonging to that shard become inaccessible. In our simulation, all
shards are on one MySQL server, so availability depends on that single
server. A production system would need replicas per shard.

**Partition Tolerance:** The router can be extended to catch errors from a
failed shard and return partial results from the remaining shards, though
data on the failed shard remains unavailable until it recovers.

## Full Report
See A4_report.pdf for the complete report with screenshots and detailed
analysis.

## Video Demo
[https://drive.google.com/file/d/1qKJvaqW1RwHxxCgoM5Yi7GfPyGtYDv6y/view]

## Team Contributions

| Name | Contribution |
|------|--------------|
| Kavya  | Shard table creation, data migration, and verification (Module A) |
| Tanmai Manjula | shard_router.py and query routing implementation (Module B) |
| Anusha | Shard key justification and B+ Tree update for shards |
| Pravallika | Scalability and trade-offs analysis, report compilation |
| Triveni | Video demonstration recording and editing |
=======
# Assignment 4 — Sharding of the Developed Application

## Project Overview

This assignment extends the **QuickBites Food Delivery System** by implementing **horizontal scaling using database sharding**.

The existing database application was modified to support logical data partitioning across multiple simulated shards. The project demonstrates shard key selection, data distribution, query routing, shard isolation, and scalability analysis.

The implementation focuses on:

- Shard Key Selection
- Hash-Based Data Partitioning
- Data Migration
- Query Routing
- Shard Isolation
- Scalability Trade-off Analysis


---

# Sharding Implementation

## 1. Shard Key Selection

### Selected Shard Key

```
item_id
```

The `item_id` attribute from the **MenuItem** table was selected as the shard key.

### Justification

### High Cardinality

`item_id` is the primary key of the MenuItem table and uniquely identifies each record.

This provides high cardinality and enables even distribution of records across shards.

### Query Alignment

Most menu-related operations use `item_id`:

- Fetch menu item
- Update menu item
- Delete menu item

Using `item_id` allows direct routing of queries to the correct shard.

### Stability

`item_id` remains unchanged after insertion, preventing expensive data migration between shards.


---

# 2. Partitioning Strategy

The implemented partitioning strategy is:

## Hash-Based Partitioning

Shard calculation:

```python
shard_id = item_id % 3
```

Data distribution rule:

| Condition | Destination |
|---|---|
| item_id % 3 = 0 | shard_0 |
| item_id % 3 = 1 | shard_1 |
| item_id % 3 = 2 | shard_2 |


## Why Hash Partitioning?

Hash partitioning was chosen because:

- It distributes records uniformly
- It avoids uneven load caused by sequential IDs
- It provides fast shard identification
- It does not require an additional lookup table


---

# 3. Data Partitioning and Migration

The original `MenuItem` table was divided into three shard tables:

```
shard_0_menuitem
shard_1_menuitem
shard_2_menuitem
```

Each shard maintains the same schema as the original MenuItem table.


## Migration Logic

Data was migrated using:

```sql
INSERT INTO shard_X_menuitem
SELECT *
FROM menuitem
WHERE item_id % 3 = X;
```


Example:

```
item_id % 3 = 0  →  shard_0_menuitem

item_id % 3 = 1  →  shard_1_menuitem

item_id % 3 = 2  →  shard_2_menuitem
```


---

# 4. Data Validation

After migration, the following checks were performed:

- Total rows across all shards match original table count

- No duplicate `item_id` values exist across shards

- No records were lost during migration

- Data distribution was verified


Final distribution:

| Shard | Number of Records |
|---|---|
| shard_0_menuitem | 7 |
| shard_1_menuitem | 5 |
| shard_2_menuitem | 7 |


The validation confirms correct partitioning without overlap or data loss.


---

# 5. Query Routing Implementation

A shard router was implemented to direct every request to the correct shard.

Routing logic:

```python
shard = item_id % 3
```


## Single Item Operations

Operations:

- GET
- PUT
- DELETE

are directly routed to the required shard.


Example:

```
item_id = 701

701 % 3 = 2

Request is routed to shard_2_menuitem
```


This avoids unnecessary queries on other shards.


---

## Insert Operations

New records are inserted into the shard calculated using:

```python
item_id % 3
```

The application automatically selects the correct shard before insertion.


---

## Multi-Shard Queries

For queries requiring complete data:

Example:

```
GET all menu items
```

The system:

1. Queries all shards
2. Collects results
3. Merges the output
4. Returns the final response


---

# 6. Sharding Approach and Isolation

The project implements **logical sharding using multiple tables inside a single database instance**.

The simulated shards are:

```
shard_0_menuitem
shard_1_menuitem
shard_2_menuitem
```


Isolation is maintained using:

- Separate shard tables
- Deterministic shard mapping
- Application-level routing


Each record exists in exactly one shard, preventing duplication and inconsistency.


---

# 7. Scalability and Trade-off Analysis


## Horizontal vs Vertical Scaling

### Vertical Scaling

Vertical scaling improves performance by upgrading a single database server.

Examples:

- Increasing RAM
- Increasing CPU capacity
- Increasing storage


Limitations:

- Hardware limits
- Higher upgrade cost


### Horizontal Scaling

Horizontal scaling distributes data across multiple shards.

Advantages:

- Increased storage capacity
- Better workload distribution
- Parallel query execution
- Improved scalability


The implemented system follows horizontal scaling using sharding.


---

# Consistency

Single-shard operations provide strong consistency because only one shard is accessed.

Multi-shard operations require combining results from multiple shards and may require synchronization between shards.


---

# Availability

If one shard fails:

- Data stored in that shard becomes unavailable
- Other shards continue functioning


This provides:

- Partial availability
- Better failure isolation


---

# Partition Tolerance

The system handles partitioning using:

- Independent shard tables
- Deterministic shard mapping
- Controlled query routing


A failure in one shard affects only the records stored inside that shard.


---

# Results Achieved

The project successfully implements:

- Selection of a suitable shard key

- Hash-based partitioning

- Three simulated shards

- Correct data migration

- Zero overlap between shards

- Efficient query routing

- Horizontal scaling simulation

- Scalability analysis


---

# Limitations

- Shards are simulated using tables instead of separate physical servers
- No replication mechanism is implemented
- Range queries require checking multiple shards
- Dataset size is small compared to real distributed systems


---

# Conclusion

The QuickBites database system was successfully extended with sharding capabilities.

The implementation demonstrates how distributed database systems improve scalability by partitioning data, routing queries efficiently, and managing trade-offs between scalability, consistency, and availability.

This assignment provided practical understanding of real-world distributed database concepts and horizontal scaling techniques.

