import {
  ClipboardList,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Header from "../components/Header";

const auditLogs = [
  {
    id: 1,
    user: "Admin User",
    action: "CREATE",
    resource: "Incident",
    resourceId: "INC-1003",
    description: "Created a new incident",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    user: "John Doe",
    action: "ASSIGN",
    resource: "Incident",
    resourceId: "INC-1002",
    description: "Assigned incident to John Doe",
    timestamp: "10:25 AM",
  },
  {
    id: 3,
    user: "Admin User",
    action: "ACKNOWLEDGE",
    resource: "Alert",
    resourceId: "ALT-0042",
    description: "Acknowledged critical alert",
    timestamp: "10:20 AM",
  },
  {
    id: 4,
    user: "Jane Smith",
    action: "UPDATE",
    resource: "Device",
    resourceId: "router-03",
    description: "Updated device configuration",
    timestamp: "10:15 AM",
  },
  {
    id: 5,
    user: "Admin User",
    action: "DELETE",
    resource: "Device",
    resourceId: "switch-07",
    description: "Removed device from inventory",
    timestamp: "10:08 AM",
  },
];

function AuditLogsPage() {
  return (
    <div className="noc-app">

      <Header />

      <main className="dashboard">

        {/* PAGE HEADER */}

        <div className="page-section-header">

          <div>
            <div className="page-title">
              Audit Logs
            </div>

            <div className="page-subtitle">
              Track system activity and user actions
            </div>
          </div>

        </div>


        {/* AUDIT LOG TABLE */}

        <section className="widget">

          <div className="widget-header">

            <div className="widget-title">
              <ClipboardList size={15} />
              Activity History
            </div>


            <div className="device-controls">

              <div className="search-box">

                <Search size={14} />

                <input
                  type="text"
                  placeholder="Search audit logs..."
                />

              </div>


              <select>
                <option>All Actions</option>
                <option>CREATE</option>
                <option>UPDATE</option>
                <option>DELETE</option>
                <option>ASSIGN</option>
                <option>ACKNOWLEDGE</option>
              </select>


              <select>
                <option>All Resources</option>
                <option>Device</option>
                <option>Alert</option>
                <option>Incident</option>
                <option>User</option>
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
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Resource</th>
                  <th>Resource ID</th>
                  <th>Description</th>
                </tr>

              </thead>


              <tbody>

                {auditLogs.map((log) => (

                  <tr key={log.id}>

                    <td className="audit-time">
                      {log.timestamp}
                    </td>

                    <td className="audit-user">
                      {log.user}
                    </td>

                    <td>

                      <span
                        className={`audit-action ${log.action.toLowerCase()}`}
                      >
                        {log.action}
                      </span>

                    </td>

                    <td>
                      {log.resource}
                    </td>

                    <td className="audit-resource-id">
                      {log.resourceId}
                    </td>

                    <td>
                      {log.description}
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

export default AuditLogsPage;