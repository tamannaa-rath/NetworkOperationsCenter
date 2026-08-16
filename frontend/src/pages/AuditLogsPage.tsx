import {
  ClipboardList,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Header from "../components/Header";

import { useEffect, useState } from "react";

import { getAuditLogs } from "../services/audit.service";

import type { AuditLog } from "../types/audit.types";

function AuditLogsPage() {

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedResource, setSelectedResource] = useState("all");

  // LOAD AUDIT LOGS WHEN COMPONENT MOUNTS
  useEffect(() => {
    async function loadAuditLogs() {
      try {
        const data = await getAuditLogs();

        setAuditLogs(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load audit logs");
      } finally {
        setLoading(false);
      }
    }

    loadAuditLogs();
  }, []);


  // FILTER AUDIT LOGS
  const filteredAuditLogs = auditLogs.filter((log) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      log.action.toLowerCase().includes(searchText) ||
      log.description.toLowerCase().includes(searchText) ||
      log.resource_type.toLowerCase().includes(searchText) ||
      String(log.user_id ?? "").includes(searchText);

    const matchesAction =
      selectedAction === "all" ||
      log.action === selectedAction;

    const matchesResource =
      selectedResource === "all" ||
      log.resource_type === selectedResource;

    return (
      matchesSearch &&
      matchesAction &&
      matchesResource
    );
  });
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
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                 />

              </div>


              <select
                value={selectedAction}
                onChange={(event) => setSelectedAction(event.target.value)}
              >
                <option value="all">All Actions</option>
                <option value="CREATE">CREATE</option>
                <option value="UPDATE">UPDATE</option>
                <option value="DELETE">DELETE</option>
                <option value="ASSIGN">ASSIGN</option>
                <option value="ACKNOWLEDGE">ACKNOWLEDGE</option>
                <option value="RESOLVE">RESOLVE</option>
              </select>


              <select
                value={selectedResource}
                onChange={(event) => setSelectedResource(event.target.value)}
              >
                <option value="all">All Resources</option>
                <option value="USER">User</option>
                <option value="DEVICE">Device</option>
                <option value="ALERT">Alert</option>
                <option value="INCIDENT">Incident</option>
                <option value="METRIC">Metric</option>
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

                {loading && (
                  <tr>
                    <td colSpan={6}>
                      Loading audit logs...
                    </td>
                  </tr>
                )}

                {error && (
                  <tr>
                    <td colSpan={6}>
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && filteredAuditLogs.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      No audit logs found.
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  filteredAuditLogs.map((log) => (

                    <tr key={log.id}>

                      <td className="audit-time">
                        {new Date(log.created_at).toLocaleString()}
                      </td>

                      <td className="audit-user">
                        {log.user_id ?? "System"}
                      </td>

                      <td>

                        <span
                          className={`audit-action ${log.action.toLowerCase()}`}
                        >
                          {log.action}
                        </span>

                      </td>

                      <td>
                        {log.resource_type}
                      </td>

                      <td className="audit-resource-id">
                        {log.resource_id ?? "-"}
                      </td>

                      <td>
                        {log.description}
                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AuditLogsPage;