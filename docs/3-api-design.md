# API Design — NOC Dashboard (MVP)

> Version: v1.0.0
> Base URL: `/api/v1`
> Status: MVP

---

# 1. Overview

The NOC Dashboard API powers the backend services responsible for monitoring network devices, collecting metrics, and generating alerts.

## Design Principles

* RESTful architecture
* JWT Authentication
* Role-Based Access Control (RBAC)
* JSON request/response format
* ISO 8601 timestamps
* UUID identifiers

---

# 2. Tech Stack

| Layer          | Technology          |
| -------------- | ------------------- |
| Frontend       | React.js            |
| Backend        | Node.js, Express.js |
| Database       | PostgreSQL          |
| Authentication | JWT                 |
| Architecture   | REST API            |

---

# 3. Roles

| Role     | Permissions                        |
| -------- | ---------------------------------- |
| Admin    | Full access                        |
| Engineer | Manage devices, metrics and alerts |
| Viewer   | Read-only access                   |

---

# 4. Authentication

## POST `/auth/login`

Authenticate user.

Request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json
{
  "accessToken": "jwt-token",
  "role": "ADMIN"
}
```

---

## POST `/auth/register`

Create user.

Role: Admin

---

# 5. Device Module

## GET `/devices`

List all devices.

Filters:

```text
?page=1
?status=active
?search=router
```

---

## GET `/devices/{id}`

Get device details.

---

## POST `/devices`

Create new device.

Request:

```json
{
  "hostname": "router-01",
  "ipAddress": "10.0.0.1",
  "type": "router",
  "vendor": "Cisco",
  "location": "Rack-A1"
}
```

---

## PUT `/devices/{id}`

Update device.

---

## DELETE `/devices/{id}`

Soft delete device.

Role: Admin

---

# 6. Metrics Module

## POST `/metrics`

Store metrics.

```json
{
  "deviceId": "uuid",
  "cpu": 72,
  "memory": 58,
  "networkIn": 200,
  "networkOut": 150
}
```

---

## GET `/metrics/{deviceId}`

Retrieve historical metrics.

Query:

```text
?from=
?to=
```

---

## GET `/metrics/{deviceId}/latest`

Retrieve latest metrics.

---

# 7. Alert Module

## GET `/alerts`

Retrieve alerts.

Filters:

```text
?status=open
?severity=critical
```

---

## GET `/alerts/{id}`

Retrieve alert details.

---

## PATCH `/alerts/{id}/acknowledge`

Acknowledge alert.

---

## PATCH `/alerts/{id}/resolve`

Resolve alert.

---

# 8. Dashboard Module

## GET `/dashboard/summary`

Returns overall dashboard statistics.

Response:

```json
{
  "totalDevices": 50,
  "activeDevices": 45,
  "criticalAlerts": 3,
  "openAlerts": 8,
  "avgCpuUsage": 62
}
```

---

## GET `/dashboard/health`

Returns current system health.

```json
{
  "status": "HEALTHY"
}
```

---

# 9. Standard Response Format

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Device not found"
}
```

---

# 10. HTTP Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 201  | Created      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 500  | Server Error |

---

# Future Enhancements (v2)

* Incident Management
* Audit Logs
* Notification Service
* WebSocket Real-Time Updates
* Prometheus Integration
* Grafana Integration
* Redis Caching

---

*NOC Dashboard API Specification v1.0.0*
