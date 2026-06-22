# System Architecture

## Overview

The NOC Dashboard is a centralized platform for monitoring infrastructure health, tracking incidents, and responding to operational issues in real time.

The MVP follows a modular monolithic architecture consisting of:

* React Frontend
* Node.js/Express Backend
* PostgreSQL Database

### Architecture Philosophy

> Build the simplest thing.
>
> Find the bottleneck.
>
> Add the component that solves the bottleneck.
>
> Repeat.

---

# High-Level Architecture

```text
+-------------------+
|   React Frontend  |
+---------+---------+
          |
          |
       REST API
          |
          v
+-------------------+
|  Express Backend  |
+---------+---------+
          |
          |
          v
+-------------------+
|    PostgreSQL     |
+-------------------+
```

---

# Component Responsibilities

## Frontend

The frontend provides a centralized dashboard for operators.

Responsibilities:

* User authentication
* Device monitoring views
* Metrics visualization
* Alert management
* Incident management
* Analytics dashboards

Technology:

* React
* TypeScript
* TailwindCSS
* Recharts

---

## Backend

The backend exposes REST APIs and contains all business logic.

Responsibilities:

* Authentication and authorization
* Device management
* Metrics processing
* Alert generation
* Incident workflows
* Audit logging
* Analytics calculations

Technology:

* Node.js
* Express
* TypeScript

---

## Database

PostgreSQL serves as the primary persistent datastore.

Responsibilities:

* User management
* Device inventory
* Metrics storage
* Alert history
* Incident records
* Audit logs

Technology:

* PostgreSQL

---

# Request Flow

```text
User
  |
  v
React Frontend
  |
  v
REST API
  |
  v
Express Backend
  |
  v
PostgreSQL
```

---

# Core Modules

## Authentication Module

Handles:

* User registration
* User login
* JWT authentication
* Role-based access control

Roles:

* Admin
* NOC Engineer
* Viewer

---

## Device Module

Handles:

* Device registration
* Device updates
* Device status tracking
* Device inventory management

---

## Metrics Module

Handles:

* Metric ingestion
* Historical metric storage
* Metric retrieval
* Dashboard visualization support

Tracked Metrics:

* CPU Usage
* Memory Usage
* Disk Usage
* Network Throughput
* Latency
* Packet Loss

---

## Alert Module

Handles:

* Threshold evaluation
* Warning alerts
* Critical alerts
* Alert acknowledgement
* Alert history

---

## Incident Module

Handles:

* Incident creation
* Incident assignment
* Status tracking
* Resolution workflow
* Incident timeline

---

## Audit Module

Handles:

* Login events
* Role changes
* Alert actions
* Incident actions
* Administrative actions

---

# Future Architecture Evolution

The MVP architecture is intentionally simple.

Future versions may introduce:

* Socket.IO for real-time updates
* Redis for caching and Pub/Sub
* Prometheus for monitoring
* Grafana dashboards
* Nginx reverse proxy
* Horizontal backend scaling
* Event-driven processing
* Kubernetes deployment
