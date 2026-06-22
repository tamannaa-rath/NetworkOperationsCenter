## Problem Statement

Example:

```
Modern organizations operate hundreds or thousands of servers, network devices, databases, and applications. Monitoring these systems across multiple tools makes it difficult to detect failures, respond to incidents, and maintain high availability.

This project aims to build a centralized Network Operations Center (NOC) Dashboard that provides real-time monitoring, alerting, incident management, audit logging, and operational analytics through a single platform.
```

## What Is An NOC?

NOC means Network Operations Center
Like NASA monitoring a spacecraft

A real NOC room often has giant screens showing:

```
Device Health
Network Status
Server Status
Active Incidents
Active Alerts
Traffic
Availability
```

Engineers watch these systems continuously.

---

## Core Features

|Feature|Simple Explanation|
|---|---|
|**Device Monitoring**|Keep track of all servers, routers, databases, and devices to see whether they are healthy or down.|
|**Real-Time Metrics**|Continuously collect and display CPU, memory, disk, network, and latency data as it changes.|
|**Alerting**|Automatically notify engineers when something abnormal happens, like high CPU or a server crash.|
|**Incident Management**|Track outages and problems from the moment they're discovered until they're fixed.|
|**Audit Logging**|Record every important action performed by users so you know who did what and when.|
|**Analytics**|Analyze historical data to identify trends, recurring issues, downtime patterns, and system reliability.|
|**Authentication**|Verify user identities and control who can access different parts of the dashboard.|

---

## Users

```
Admin
NOC Engineer
Viewer
```

---

## Success Metrics

- 1000 concurrent websocket connections
- 100+ monitored devices
- Metrics every 5 seconds
- API latency under 200ms
- 30-day metrics retention

---
## Engineering Goals

- Learn production-grade backend architecture
- Learn database design and optimization
- Learn real-time communication using WebSockets
- Learn caching using Redis
- Learn observability using Prometheus and Grafana
- Learn CI/CD using GitHub Actions
- Learn distributed systems concepts through Pub/Sub architecture
- Learn cloud deployment and scalability