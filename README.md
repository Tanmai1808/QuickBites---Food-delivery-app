# QuickBites---Food-delivery-app

A Database Management System project developed as part of **CS432: Databases, IIT Gandhinagar**.

QuickBites is a full-stack food delivery application designed to model a real-world food ordering platform with a strong database foundation. The project covers the complete database development lifecycle — from schema design and implementation to indexing, transaction management, concurrency handling, and distributed database concepts like sharding.

---

# Project Objective

The goal of this project is to design and develop a reliable, scalable, and efficient database-driven application by applying core database concepts:

- Relational Database Design
- Normalization and Integrity Constraints
- B+ Tree Indexing
- REST API Development
- Transaction Management
- ACID Properties
- Concurrency Control
- Database Sharding

---

# Project Evolution

## Assignment 1 — Database Design and Implementation

Designed and implemented the complete relational database system for QuickBites.

Implemented:

- Conceptual modelling using UML and ER diagrams
- Normalized relational schema (3NF)
- Primary and Foreign Key relationships
- Integrity constraints
- Realistic sample data

Database includes entities such as:

- Members
- Customers
- Restaurants
- Menu Items
- Orders
- Payments
- Delivery
- Reviews

📂 Detailed implementation:
`A1/README.md`

---

# Assignment 2 — B+ Tree Indexing and Application Development

Extended the database system with a custom indexing engine and web application layer.

Implemented:

### Custom Database Engine

- B+ Tree from scratch
- Insert, search, delete operations
- Range queries
- Value storage
- Performance comparison with brute force approach

### Application Layer

- REST API backend
- Authentication system
- Role-Based Access Control (RBAC)
- Frontend interface
- Database optimization

Technologies used:

- Python
- Flask
- MySQL
- JavaScript

📂 Detailed implementation:
`A2/README.md`

---

# Assignment 3 — Transaction Management and ACID Validation

Improved system reliability by adding transaction support and failure recovery mechanisms.

Implemented:

- Transaction execution
- Commit and rollback handling
- Write-Ahead Logging (WAL)
- Crash recovery simulation
- Database and B+ Tree consistency validation

Validated:

- Atomicity
- Consistency
- Isolation
- Durability

Also tested:

- Concurrent users
- Race conditions
- Failure handling
- Stress workload

📂 Detailed implementation:
`A3/README.md`

---

# Assignment 4 — Database Sharding and Scalability

Extended the application to support horizontal scaling through sharding.

Implemented:

- Shard key selection
- Hash-based partitioning
- Data migration
- Query routing
- Shard isolation

Used:

```
shard_id = item_id % 3
```

Created simulated shards:

```
shard_0_menuitem
shard_1_menuitem
shard_2_menuitem
```

Analysed:

- Horizontal vs vertical scaling
- Consistency
- Availability
- Partition tolerance

📂 Detailed implementation:
`A4/README.md`

---

# Technology Stack

## Backend

- Python
- Flask
- REST APIs

## Database

- MySQL
- SQL
- SQLite (testing)

## Data Structures

- Custom B+ Tree Implementation

## Frontend

- HTML
- CSS
- JavaScript
- Vite

## Testing

- Python threading
- API testing
- Performance benchmarking

---

# Major Features

- Relational database design  
- User and restaurant management  
- Menu and order handling  
- Secure API layer  
- Custom B+ Tree indexing  
- Efficient searching and range queries  
- Transaction support  
- Crash recovery  
- Concurrent user handling  
- Stress testing  
- Database sharding  

---

# Project Structure

```
QuickBites
│
├── A1
│   └── Database Design and SQL Implementation
│
├── A2
│   └── B+ Tree, API and Frontend
│
├── A3
│   └── Transactions and Concurrency Control
│
├── A4
│   └── Sharding and Scalability
│
└── README.md
```

---

# Outcome

The project demonstrates the complete development of a database-backed application, starting from schema design and progressing towards efficient indexing, reliable transactions, concurrent access handling, and scalable database architecture.

It provides practical implementation experience with concepts used in real-world Database Management Systems.

---

# Team

**Group: P & Team**

| Name | Roll Number |
|---|---|
| Poladasu Tanmai Manjula | 24110261 |
| Gullapalli Kavya Durga Sri | 24110125 |
| Pravallika Matha | 24110198 |
| Reddyboina Triveni | 24110295 |
| Modalavalasa Anusha | 24110206 |

Course: CS432 — Databases  
Prof: Under the guidance of Yogesh Kumar Meena 
Indian Institute of Technology Gandhinagar 
