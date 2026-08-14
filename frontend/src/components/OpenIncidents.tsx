const incidents = [
  {
    id: "INC-1003",
    title: "Router connectivity issue",
    severity: "CRITICAL",
    status: "IN_PROGRESS",
    assigned: "John Doe",
  },
  {
    id: "INC-1002",
    title: "High latency in network",
    severity: "WARNING",
    status: "IN_PROGRESS",
    assigned: "Jane Smith",
  },
  {
    id: "INC-1001",
    title: "Switch port down",
    severity: "WARNING",
    status: "OPEN",
    assigned: "Unassigned",
  },
];

function OpenIncidents() {
  return (
    <div className="panel table-panel">
      <div className="panel-header">
        <h2>Open Incidents</h2>

        <button className="view-all">
          View all
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {incidents.slice(0, 3).map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.title}</td>

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

                <td>{incident.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OpenIncidents;