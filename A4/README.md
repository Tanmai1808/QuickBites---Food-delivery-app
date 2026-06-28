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
[Add video link here]

## Team Contributions

| Name | Contribution |
|------|--------------|
| [K's name] | Shard table creation, data migration, and verification (Module A) |
| [TM's name] | shard_router.py and query routing implementation (Module B) |
| [A's name] | Shard key justification and B+ Tree update for shards |
| [P's name] | Scalability and trade-offs analysis, report compilation |
| [TR's name] | Video demonstration recording and editing |
