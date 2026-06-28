# Assignment 2 — API and Indexing Layer

## Overview

This assignment extends the QuickBites database from Assignment 1 with a
B+ Tree indexing layer and a full REST API backend, along with a frontend
interface for interacting with the system.

## What We Did

### Module A — B+ Tree Database Layer

We implemented a custom B+ Tree indexing structure integrated with the
database manager to support efficient key-based lookups, inserts, and
range queries.

Key files:
- bplustree.py — Custom B+ Tree implementation
- db_manager.py — Database manager handling DB operations
- table.py — Table abstraction layer
- Bruteforce.py — Baseline/comparison implementation
- report.ipynb — Analysis and testing notebook

### Module B — Backend API and Frontend

We built a full Flask backend with role-based access control (RBAC),
authentication, and modular route handling for restaurants, customers,
delivery, and admin operations. A frontend was also built to interact with
the API.

Backend key files:
- auth.py / auth_middleware.py — Authentication and middleware
- rbac.py — Role-based access control
- Restaurant.py / customer.py / delivery.py / admin.py — Route modules
- logger.py — Logging utility

Frontend:
- Built with Vite

## Folder Structure

A2/
- Module_A/database/ — bplustree.py, db_manager.py, table.py, Bruteforce.py, requirements.txt
- Module_A/report.ipynb
- Module_B/Backend/ — auth.py, auth_middleware.py, rbac.py, Restaurant.py, customer.py, delivery.py, admin.py, logger.py, requirements.txt
- Module_B/frontend/ — src/, public/, package.json
- README.md

## How to Run

### Module A (Database Layer)
cd Module_A/database
pip install -r requirements.txt

Open report.ipynb in Jupyter to view the B+ Tree tests and analysis.

### Module B (Backend)
cd Module_B/Backend
pip install -r requirements.txt
python auth.py

### Module B (Frontend)
cd Module_B/frontend
npm install
npm run dev

## Team Contributions

| Name | Contribution |
|------|--------------|
| Add names and roles here | |
