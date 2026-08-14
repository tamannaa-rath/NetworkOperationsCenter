const alerts = [
  {
    severity: "CRITICAL",
    message: "High CPU usage detected (95%)",
    device: "router-03",
    time: "2m ago",
  },
  {
    severity: "CRITICAL",
    message: "Device unreachable",
    device: "switch-07",
    time: "5m ago",
  },
  {
    severity: "WARNING",
    message: "High memory usage (85%)",
    device: "server-02",
    time: "8m ago",
  },
  {
    severity: "WARNING",
    message: "Packet loss detected (12%)",
    device: "firewall-01",
    time: "10m ago",
  },
  {
    severity: "INFO",
    message: "Configuration backup completed",
    device: "router-01",
    time: "15m ago",
  },
];

function RecentAlerts() {
  return (
    <div className="panel table-panel">
      <div className="panel-header">
        <h2>Recent Alerts</h2>

        <button className="view-all">
          View all
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Severity</th>
              <th>Message</th>
              <th>Device</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {alerts.slice(0, 3).map((alert, index) => (
              <tr key={index}>
                <td>
                  <span
                    className={`severity ${alert.severity.toLowerCase()}`}
                  >
                    {alert.severity}
                  </span>
                </td>

                <td>{alert.message}</td>
                <td>{alert.device}</td>
                <td>{alert.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAlerts;