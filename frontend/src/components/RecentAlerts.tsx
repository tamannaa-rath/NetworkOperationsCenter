import { useEffect, useState } from "react";

import { getAlerts } from "../services/alert.service";
import socket from "../services/socket";

import type { Alert } from "../types/alert.types";

function RecentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);


    // LOAD EXISTING ALERTS
  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error(
          "Failed to load recent alerts:",
          error
        );
      }
    }
    loadAlerts();
  }, []);


  // LISTEN FOR NEW ALERTS
  useEffect(() => {
    function handleNewAlert(alert: Alert) {
      setAlerts((currentAlerts) => [
        alert,
        ...currentAlerts,
      ]);
    }
    socket.on("alert:created", handleNewAlert);
    return () => {
      socket.off("alert:created", handleNewAlert);
    };
  }, []);


  useEffect(() => {
    function handleAlertUpdated(updatedAlert: Alert) {
      setAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === updatedAlert.id
            ? updatedAlert
            : alert
        )
      );
    }
    socket.on("alert:updated", handleAlertUpdated);
    return () => {
      socket.off("alert:updated", handleAlertUpdated);
    };

  }, []);


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
            {alerts.slice(0, 3).map((alert) => (
              <tr key={alert.id}>
                <td>
                  <span
                    className={`severity ${alert.severity.toLowerCase()}`}
                  >
                    {alert.severity}
                  </span>
                </td>

                <td>{alert.message}</td>
                <td>{alert.device_id}</td>
                <td>
                  {new Date(alert.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAlerts;