import {
  ShieldAlert,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Header from "../components/Header";

const incidents = [
  {
    id: "INC-1003",
    title: "Router connectivity issue",
    description: "Router is experiencing intermittent connectivity.",
    severity: "CRITICAL",
    status: "IN_PROGRESS",
    deviceId: "router-03",
    assignedTo: "John Doe",
    createdAt: "10:30 AM",
    resolvedAt: null,
  },
  {
    id: "INC-1002",
    title: "High latency in network",
    description: "Network latency has exceeded the configured threshold.",
    severity: "WARNING",
    status: "IN_PROGRESS",
    deviceId: "firewall-01",
    assignedTo: "Jane Smith",
    createdAt: "10:25 AM",
    resolvedAt: null,
  },
  {
    id: "INC-1001",
    title: "Switch port down",
    description: "Switch port is currently unreachable.",
    severity: "WARNING",
    status: "OPEN",
    deviceId: "switch-07",
    assignedTo: null,
    createdAt: "10:20 AM",
    resolvedAt: null,
  },
  {
    id: "INC-1000",
    title: "High memory usage",
    description: "Server memory usage exceeded the warning threshold.",
    severity: "WARNING",
    status: "RESOLVED",
    deviceId: "server-02",
    assignedTo: "John Doe",
    createdAt: "09:50 AM",
    resolvedAt: "10:05 AM",
  },
];

function IncidentsPage() {
  return (
    <div className="noc-app">

      <Header />

      <main className="dashboard">

        {/* PAGE HEADER */}

        <div className="page-section-header">

          <div>
            <div className="page-title">
              Incidents
            </div>

            <div className="page-subtitle">
              Track and manage network incidents
            </div>
          </div>

        </div>


        {/* INCIDENT TABLE */}

        <section className="widget">

          <div className="widget-header">

            <div className="widget-title">
              <ShieldAlert size={15} />
              Incident Management
            </div>

            <div className="device-controls">

              <div className="search-box">

                <Search size={14} />

                <input
                  type="text"
                  placeholder="Search incidents..."
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
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
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
                  <th>ID</th>
                  <th>Title</th>
                  <th>Device</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Created</th>
                </tr>

              </thead>


              <tbody>

                {incidents.map((incident) => (

                  <tr key={incident.id}>

                    <td className="incident-id">
                      {incident.id}
                    </td>


                    <td className="incident-title">
                      {incident.title}
                    </td>


                    <td>
                      {incident.deviceId}
                    </td>


                    <td>

                      <span
                        className={`severity ${incident.severity.toLowerCase()}`}
                      >
                        {incident.severity}
                      </span>

                    </td>


                    <td>

                      <span
                        className={`incident-status ${incident.status.toLowerCase()}`}
                      >
                        {incident.status}
                      </span>

                    </td>


                    <td>
                      {incident.assignedTo || "Unassigned"}
                    </td>


                    <td>
                      {incident.createdAt}
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

export default IncidentsPage;