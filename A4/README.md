# Assignment 4 — Sharding of the Developed Application

## Overview

This assignment extends the QuickBites food delivery system by implementing **horizontal scaling using database sharding**.

The existing database application was modified to support data partitioning across multiple simulated shards. The assignment focuses on selecting a suitable shard key, migrating data, implementing query routing, and analysing scalability trade-offs.

The system demonstrates:

- Shard Key Selection
- Hash-Based Data Partitioning
- Data Migration
- Query Routing
- Shard Isolation
- Scalability Analysis

---

# Sharding Implementation

## Shard Key Selection

Selected shard key:


item_id


### Justification

### High Cardinality

item_id is the primary key of the MenuItem table and uniquely identifies every record.

This provides a large number of distinct values and allows balanced distribution of records.

### Query Alignment

Most menu operations use item_id:

- Fetch menu item
- Update menu item
- Delete menu item

Using item_id allows direct routing to the correct shard without searching all shards.

### Stability

item_id remains unchanged after insertion, preventing expensive data movement between shards.

---

# Partitioning Strategy

Implemented strategy:


Hash Based Partitioning


Shard calculation:


shard_id = item_id % 3


Distribution rule:

| Condition | Shard |
|---|---|
| item_id % 3 = 0 | shard_0 |
| item_id % 3 = 1 | shard_1 |
| item_id % 3 = 2 | shard_2 |

## Why Hash Partitioning?

- Provides uniform data distribution
- Avoids hotspot formation
- Provides constant time shard identification
- Does not require additional lookup tables

---

# Data Partitioning

The original MenuItem table was divided into three simulated shard tables:


shard_0_menuitem
shard_1_menuitem
shard_2_menuitem


Each shard maintains the same schema as the original MenuItem table.

## Data Migration

Data was migrated using:

```sql
INSERT INTO shard_X_menuitem
SELECT *
FROM menuitem
WHERE item_id % 3 = X;

where X represents shard number.

Example:

item_id % 3 = 0 → shard_0_menuitem
item_id % 3 = 1 → shard_1_menuitem
item_id % 3 = 2 → shard_2_menuitem
Validation

After migration, the following checks were performed:

- Total rows across all shards match original MenuItem count

- No duplicate item_id values exist across shards

- No records were lost during migration

- Data distribution was verified

Final distribution:

Shard	Records
shard_0	7
shard_1	5
shard_2	7
Query Routing

A shard router was implemented to direct queries to the correct shard.

Routing logic:

shard = item_id % 3
Single Item Operations

Operations:

GET
PUT
DELETE

are routed directly to the required shard.

Example:

item_id = 701

701 % 3 = 2

Request goes to shard_2_menuitem

This avoids unnecessary queries on other shards.

Insert Operations

New records are inserted into the shard calculated using:

item_id % 3

The application automatically selects the correct shard.

Multi-Shard Queries

For operations requiring complete data:

Example:

GET all menu items

The system:

Queries all shards
Collects results
Combines and returns the final response
Sharding Approach

The project uses logical sharding using multiple tables inside one database instance.

Created simulated nodes:

shard_0_menuitem
shard_1_menuitem
shard_2_menuitem

Isolation is achieved through:

Separate shard tables
Deterministic routing logic
Controlled application access

Each record belongs to exactly one shard.

Scalability and Trade-off Analysis
Horizontal vs Vertical Scaling
Vertical Scaling

Improves performance by increasing resources of a single database server.

Limitations:

Hardware limitations
Higher upgrade cost
Horizontal Scaling

Distributes data across multiple shards.

Advantages:

Increased storage capacity
Better load distribution
Parallel processing support

The implemented design follows horizontal scaling.

Consistency

Single-shard operations provide strong consistency because only one shard is accessed.

Multi-shard queries require combining data from multiple shards, which may require synchronization.

Availability

If one shard fails:

Data stored in that shard becomes unavailable
Other shards continue operating

This provides partial availability and failure isolation.

Partition Tolerance

The system handles partitioning through:

Independent shard tables
Deterministic shard mapping
Controlled query routing

A failure in one shard affects only the data stored in that shard.

Results Achieved

The system successfully implements:

- Three simulated shards

- Hash-based partitioning

- Correct data migration

- Zero duplication between shards

- Efficient query routing

- Horizontal scaling simulation

- Scalability trade-off analysis

Limitations
Shards are simulated using tables instead of separate physical servers
No replication mechanism implemented
Range queries require searching multiple shards
Small dataset may not represent large-scale distribution behaviour
Conclusion

The QuickBites database system was successfully extended with sharding capabilities.

The implementation demonstrates how distributed database systems improve scalability by partitioning data and routing queries efficiently across multiple shards.

The project provides practical understanding of data distribution, query routing, and scalability challenges in modern database systems.
