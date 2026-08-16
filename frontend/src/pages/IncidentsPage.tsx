import {
  ShieldAlert,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Header from "../components/Header";

import { useEffect, useState } from "react";

import { resolveIncident, assignIncident, getIncidentById, getIncidents } from "../services/incidents.service";

import type { Incident } from "../types/incidents.types";


function IncidentsPage() {

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [resolution, setResolution] = useState("");

  // LOAD INCIDENTS WHEN THE COMPONENT MOUNTS
  useEffect(() => {
    async function loadIncidents() {
      try {
        const data = await getIncidents();

        setIncidents(data);
      } catch (error) {
        console.error(error);

        setError("Failed to load incidents");
      } finally {
        setLoading(false);
      }
    }

    loadIncidents();
  }, []);

  
  // FILTER INCIDENTS BASED ON SEARCH QUERY
  const filteredIncidents = incidents.filter((incident) => {
  const matchesSearch =
    incident.title.toLowerCase().includes(search.toLowerCase()) ||
    incident.description.toLowerCase().includes(search.toLowerCase()) ||
    incident.hostname.toLowerCase().includes(search.toLowerCase());

  const matchesSeverity =
    selectedSeverity === "all" ||
    incident.severity === selectedSeverity;

  const matchesStatus =
    selectedStatus === "all" ||
    incident.status === selectedStatus;

  return matchesSearch && matchesSeverity && matchesStatus;
});


// GET INCIDENT DETAILS WHEN AN INCIDENT IS SELECTED
async function handleViewIncident(id: number) {
  try {
    setDetailsLoading(true);

    const incident = await getIncidentById(id);

    setSelectedIncident(incident);
  } catch (error) {
    console.error(error);
    setError("Failed to load incident");
  } finally {
    setDetailsLoading(false);
  }
}


// ASSIGN INCIDENT TO A USER
  async function handleAssignIncident() {
    if (!selectedIncident || !selectedUser) {
      return;
    }

    try {
      const updatedIncident = await assignIncident(
        selectedIncident.id,
        Number(selectedUser)
      );

      setIncidents((currentIncidents) =>
        currentIncidents.map((incident) =>
          incident.id === updatedIncident.id
            ? {
                ...incident,
                ...updatedIncident,
              }
            : incident
        )
      );

      setSelectedIncident(updatedIncident);

      setShowAssignForm(false);
      setSelectedUser("");
    } catch (error) {
      console.error(error);
      setError("Failed to assign incident");
    }
  }


  // RESOLVE INCIDENT
  async function handleResolveIncident() {
    if (!selectedIncident || !resolution.trim()) {
      return;
    }

    try {
      const updatedIncident = await resolveIncident(
        selectedIncident.id,
        resolution
      );

      setIncidents((currentIncidents) =>
        currentIncidents.map((incident) =>
          incident.id === updatedIncident.id
            ? updatedIncident
            : incident
        )
      );

      setSelectedIncident(updatedIncident);

      setShowResolveForm(false);
      setResolution("");
    } catch (error) {
      console.error(error);
      setError("Failed to resolve incident");
    }
  }


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
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

              </div>


              <select
                value={selectedSeverity}
                onChange={(event) => setSelectedSeverity(event.target.value)}
              >
                <option value="all">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="WARNING">Warning</option>
              </select>


              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
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

                {loading && (
                  <tr>
                    <td colSpan={7}>
                      Loading incidents...
                    </td>
                  </tr>
                )}

                {error && !loading && (
                  <tr>
                    <td colSpan={7}>
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan={7}>
                      No incidents found.
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  filteredIncidents.map((incident) => (

                  <tr
                    key={incident.id}
                    onClick={() => handleViewIncident(incident.id)}
                    className="incident-row"
                  >

                    <td className="incident-id">
                      {incident.id}
                    </td>


                    <td className="incident-title">
                      {incident.title}
                    </td>


                    <td>
                      {incident.hostname}
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
                      {incident.assigned_to || "Unassigned"}
                    </td>


                    <td>
                      {incident.created_at}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {selectedIncident && (
          <div className="incident-modal-overlay">

            <div className="incident-modal">

              <div className="incident-modal-header">

                <div>
                  <h2>{selectedIncident.title}</h2>
                  <span>Incident #{selectedIncident.id}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedIncident(null);
                    setShowAssignForm(false);
                    setShowResolveForm(false);
                    setSelectedUser("");
                    setResolution("");
                  }}
                >
                  ×
                </button>

              </div>


              <div className="incident-details">

                <div>
                  <span>Device</span>
                  <strong>{selectedIncident.hostname}</strong>
                </div>

                <div>
                  <span>Severity</span>
                  <strong>{selectedIncident.severity}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{selectedIncident.status}</strong>
                </div>

                <div>
                  <span>Assigned To</span>
                  <strong>
                    {selectedIncident.assigned_to ?? "Unassigned"}
                  </strong>
                </div>

                <div>
                  <span>Created</span>
                  <strong>
                    {new Date(
                      selectedIncident.created_at
                    ).toLocaleString()}
                  </strong>
                </div>

              </div>


              <div className="incident-description">

                <h3>Description</h3>

                <p>
                  {selectedIncident.description}
                </p>

              </div>

              <div className="incident-actions">

                {selectedIncident.status !== "RESOLVED" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowAssignForm(true)}
                    >
                      Assign Incident
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowResolveForm(true)}
                    >
                      Resolve Incident
                    </button>
                  </>
                )}

              </div>

              {/* ASSIGN FORM */}

              {showAssignForm && (
                <div className="incident-form">

                  <h3>Assign Incident</h3>

                  <select
                    className="incident-form-select"
                    value={selectedUser}
                    onChange={(event) =>
                      setSelectedUser(event.target.value)
                    }
                  >
                    <option value="">Select user</option>
                    <option value="2">User 2</option>
                  </select>

                  <div className="incident-form-actions">

                    <button
                      type="button"
                      className="incident-primary-button"
                      onClick={handleAssignIncident}
                      disabled={!selectedUser}
                    >
                      Assign
                    </button>

                    <button
                      type="button"
                      className="incident-secondary-button"
                      onClick={() => {
                        setShowAssignForm(false);
                        setSelectedUser("");
                      }}
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}


              {/* RESOLVE FORM */}

              {showResolveForm && (
              <div className="incident-form">

                <h3>Resolve Incident</h3>

                <textarea
                  className="incident-form-textarea"
                  value={resolution}
                  onChange={(event) =>
                    setResolution(event.target.value)
                  }
                  placeholder="Describe how the incident was resolved..."
                  rows={4}
                />

                <div className="incident-form-actions">

                  <button
                    type="button"
                    className="incident-primary-button"
                    onClick={handleResolveIncident}
                    disabled={!resolution.trim()}
                  >
                    Resolve
                  </button>

                  <button
                    type="button"
                    className="incident-secondary-button"
                    onClick={() => {
                      setShowResolveForm(false);
                      setResolution("");
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

            </div>

          </div>
        )}

      </main>

    </div>
  );
}

export default IncidentsPage;