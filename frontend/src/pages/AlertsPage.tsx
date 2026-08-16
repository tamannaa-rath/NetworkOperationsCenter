import Header from "../components/Header";
import { useEffect, useState } from "react";
import { 
  getAlerts,
  acknowledgeAlert,
  updateAlert,
} from "../services/alert.service";
import type { Alert } from "../types/alert.types";

function AlertsPage() {

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  // LOAD ALERTS ON COMPONENT MOUNT
  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await getAlerts();

        setAlerts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load alerts");
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, []);


  // HANDLE ACKNOWLEDGE ALERT
  async function handleAcknowledgeAlert(id: number) {

    try {

      const updatedAlert = await acknowledgeAlert(id, 2); // Temporary user_id, replace with actual user ID in production

      setAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === updatedAlert.id
            ? updatedAlert
            : alert
        )
      );

    } catch (error) {

      console.error(error);

      setError("Failed to acknowledge alert");

    }
  }


  // RESOLVE ALERT
  async function handleResolveAlert(id: number) {
      try {
        const updatedAlert = await updateAlert(id, {
          status: "RESOLVED",
        });

        setAlerts((currentAlerts) =>
          currentAlerts.map((alert) =>
            alert.id === updatedAlert.id
              ? updatedAlert
              : alert
          )
        );

      } catch (error) {
        console.error(error);
        setError("Failed to resolve alert");
      }
    }

  return (
    <div className="noc-app">
      <Header />

      <main className="dashboard">

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

        <section className="widget">

          <div className="widget-header">
            <div className="widget-title">
              Alerts
            </div>
          </div>

          {loading && (
            <div>
              Loading alerts...
            </div>
          )}

          {error && (
            <div>
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="table-container">

              {alerts.length === 0 ? (

                <div className="empty-state">
                  No alerts found
                </div>

              ) : (

                <table className="data-table">

                  <thead>
                    <tr>
                      <th>Severity</th>
                      <th>Message</th>
                      <th>Device</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {alerts.map((alert) => (

                      <tr key={alert.id}>

                        <td>
                          <span
                            className={`alert-severity ${alert.severity.toLowerCase()}`}
                          >
                            {alert.severity}
                          </span>
                        </td>

                        <td>
                          {alert.message}
                        </td>

                        <td>
                          {alert.device_id}
                        </td>

                        <td>
                          {alert.status}
                        </td>

                        <td>
                          {new Date(
                            alert.created_at
                          ).toLocaleString()}
                        </td>

                        <td>
                          {alert.status === "ACTIVE" && (
                            <button
                              className="device-action-button"
                              type="button"
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                            >
                              Acknowledge
                            </button>
                          )}
                          {alert.status === "ACKNOWLEDGED" && (
                            <button
                              className="device-action-button"
                              type="button"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              Resolve
                            </button>
                          )}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              )}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default AlertsPage;