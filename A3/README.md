# Assignment 3 — Transaction Management, Concurrency Control, and ACID Validation

## Overview

This assignment extends the QuickBites backend with a custom B+ Tree
indexing layer that stays synchronized with MySQL, a Write-Ahead Log (WAL)
for crash recovery, and multi-user stress testing to verify correctness
under concurrent load.

## Module A — Advanced Transaction Engine & Crash Recovery

Implements ACID guarantees (Atomicity, Consistency, Durability) across
MySQL and a custom B+ Tree index.

Key files:
- bptree.py — Custom B+ Tree implementation
- wal.py — Write-Ahead Log for durability and crash recovery
- validation.py — DB and B+ Tree consistency checker
- routes.py — API routes with WAL and validation integrated
- app.py — Flask app entry point, loads B+ Tree on startup

### How to run
pip install flask flask-cors mysql-connector-python
Update db.py with your MySQL credentials
python Module_A/app.py

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/validate | Check DB and Tree consistency |
| GET | /api/wal/log | View WAL log entries |
| POST | /api/menu | Add menu item |
| DELETE | /api/menu/<id> | Delete menu item |
| PUT | /api/menu/<id> | Update menu item |
| POST | /api/menu/crash | Simulate crash and rollback |

### ACID Properties Implemented
- Atomicity: Crash rollback on both DB and B+ Tree
- Consistency: validate() checks DB and Tree match after every operation
- Durability: WAL persists to disk, replayed on restart

## Module B — Multi-User Behaviour and Stress Testing

Tests how the system behaves when many users interact with it
simultaneously, using Python's threading module.

Key files:
- step1.py — Concurrent users test
- step2.py — Race condition test
- step3.py — Failure simulation
- step4.py — Stress test

### How to run
python step1.py
python step2.py
python step3.py
python step4.py

### Results Summary
| Test | Users | Successful | Failed |
|------|-------|------------|--------|
| Concurrent | 5 | 5 | 0 |
| Race Condition | 10 | 7 | 3 |
| Failure Simulation | 10 | 8 | 2 |
| Stress Test | 100 | 83 | 17 |

## Full Report
See A3_report.pdf for the complete report including all screenshots,
WAL log entries, and detailed observations.

## Video Demo
https://drive.google.com/file/d/1j9A88eCZsyOMBJvNatYaWzyokjfEVlJn/view

## Team
P & Team
