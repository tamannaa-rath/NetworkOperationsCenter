import {
  AlertTriangle,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Header from "../components/Header";

const alerts = [
  {
    id: 1,
    severity: "CRITICAL",
    message: "High CPU usage detected (95%)",
    deviceId: "router-03",
    status: "ACTIVE",
    createdAt: "2m ago",
    acknowledgedBy: null,
  },
  {
    id: 2,
    severity: "CRITICAL",
    message: "Device unreachable",
    deviceId: "switch-07",
    status: "ACTIVE",
    createdAt: "5m ago",
    acknowledgedBy: null,
  },
  {
    id: 3,
    severity: "WARNING",
    message: "High memory usage (85%)",
    deviceId: "server-02",
    status: "ACTIVE",
    createdAt: "8m ago",
    acknowledgedBy: null,
  },
  {
    id: 4,
    severity: "WARNING",
    message: "Packet loss detected (12%)",
    deviceId: "firewall-01",
    status: "ACKNOWLEDGED",
    createdAt: "10m ago",
    acknowledgedBy: "Admin User",
  },
  {
    id: 5,
    severity: "INFO",
    message: "Configuration backup completed",
    deviceId: "router-01",
    status: "ACKNOWLEDGED",
    createdAt: "15m ago",
    acknowledgedBy: "Admin User",
  },
];

function AlertsPage() {
  return (
    <div className="noc-app">

      <Header />

      <main className="dashboard">

        {/* PAGE HEADER */}

        <div className="page-section-header">

          <div>
            <div className="page-title">
              Alerts
            </div>

            <div className="page-subtitle">
              Monitor and manage network alerts
            </div>
          </div>

        </div>


        {/* ALERT TABLE */}

        <section className="widget">

          <div className="widget-header">

            <div className="widget-title">
              <AlertTriangle size={15} />
              Alert History
            </div>

            <div className="device-controls">

              <div className="search-box">
                <Search size={14} />

                <input
                  type="text"
                  placeholder="Search alerts..."
                />
              </div>

              <select>
                <option>All Severities</option>
                <option>Critical</option>
                <option>Warning</option>
                <option>Info</option>
              </select>

              <select>
                <option>All Statuses</option>
                <option>Active</option>
                <option>Acknowledged</option>
              </select>

              <button className="filter-button">
                <SlidersHorizontal size={14} />
                Filters
              </button>

            </div>

          </div>


          <div className="table-container">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Message</th>
                  <th>Device</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Acknowledged By</th>
                </tr>
              </thead>

              <tbody>

                {alerts.map((alert) => (
                  <tr key={alert.id}>

                    <td>
                      <span
                        className={`severity ${alert.severity.toLowerCase()}`}
                      >
                        {alert.severity}
                      </span>
                    </td>

                    <td className="alert-message">
                      {alert.message}
                    </td>

                    <td>
                      {alert.deviceId}
                    </td>

                    <td>
                      <span
                        className={`alert-status ${alert.status.toLowerCase()}`}
                      >
                        {alert.status}
                      </span>
                    </td>

                    <td>
                      {alert.createdAt}
                    </td>

                    <td>
                      {alert.acknowledgedBy || "—"}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AlertsPage;