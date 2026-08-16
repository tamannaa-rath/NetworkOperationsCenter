import {
  AlertTriangle,
  Activity,
  Cpu,
  Server,
  ShieldAlert,
} from "lucide-react";

import Header from "../components/Header";
import NetworkPerformance from "../components/NetworkPerformance";
import AlertsBySeverity from "../components/AlertsBySeverity";
import DevicesByStatus from "../components/DevicesByStatus";
import RecentAlerts from "../components/RecentAlerts";
import OpenIncidents from "../components/OpenIncidents";
import TopDevices from "../components/TopDevices";
import RecentActivity from "../components/RecentActivity";

function DashboardPage() {
  return (
    <div className="noc-app">

      <Header />

      <main className="dashboard">

        {/* =========================
            ROW 1 — OVERVIEW
        ========================= */}

        <section className="widget-grid three-column top-stats-row">

          {/* DEVICE STATISTICS */}

          <div className="widget">

            <div className="widget-title">
              <Server size={15} />
              Device Statistics
            </div>

            <div className="stat-row">

              <div className="mini-stat">
                <strong>24</strong>
                <span>Total</span>
              </div>

              <div className="mini-stat green">
                <strong>18</strong>
                <span>Active</span>
              </div>

              <div className="mini-stat yellow">
                <strong>3</strong>
                <span>Maintenance</span>
              </div>

              <div className="mini-stat red">
                <strong>3</strong>
                <span>Offline</span>
              </div>

            </div>

          </div>


          {/* ALERT OVERVIEW */}

          <div className="widget">

            <div className="widget-title">
              <AlertTriangle size={15} />
              Alert Overview
            </div>

            <div className="alert-summary">

              <div className="big-number">
                7
                <span>Active Alerts</span>
              </div>

              <div className="severity-list">

                <div>
                  <span className="severity-dot critical" />
                  Critical
                  <strong>3</strong>
                </div>

                <div>
                  <span className="severity-dot warning" />
                  Warning
                  <strong>3</strong>
                </div>

                <div>
                  <span className="severity-dot info" />
                  Info
                  <strong>1</strong>
                </div>

              </div>

            </div>

          </div>


          {/* INCIDENT OVERVIEW */}

          <div className="widget">

            <div className="widget-title">
              <ShieldAlert size={15} />
              Incident Overview
            </div>

            <div className="incident-overview">

              <div className="big-number">
                3
                <span>Open Incidents</span>
              </div>

              <div className="incident-stats">

                <div>
                  <strong>1</strong>
                  <span>Critical</span>
                </div>

                <div>
                  <strong>2</strong>
                  <span>Warning</span>
                </div>

                <div>
                  <strong>1</strong>
                  <span>Assigned</span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            ROW 2 — ACTIONABLE DATA
        ========================= */}

        <section className="widget-grid three-column">

          {/* TOP DEVICES */}

          <div className="widget">

            <div className="widget-header">

              <div className="widget-title">
                <Cpu size={15} />
                Top Devices by CPU
              </div>

              <button className="widget-link">
                View all
              </button>

            </div>

            <TopDevices />

          </div>


          {/* RECENT ALERTS */}

          <div className="widget">

            <div className="widget-header">

              <div className="widget-title">
                <AlertTriangle size={15} />
                Recent Alerts
              </div>

              <button className="widget-link">
                View all
              </button>

            </div>

            <RecentAlerts />

          </div>


          {/* OPEN INCIDENTS */}

          <div className="widget">

            <div className="widget-header">

              <div className="widget-title">
                <ShieldAlert size={15} />
                Open Incidents
              </div>

              <button className="widget-link">
                View all
              </button>

            </div>

            <OpenIncidents />

          </div>

        </section>


        {/* =========================
            ROW 3 — PERFORMANCE + ACTIVITY
        ========================= */}

        <section className="widget-grid two-column bottom-row">

          {/* NETWORK PERFORMANCE */}

          <div className="widget chart-widget">

            <div className="widget-header">

              <div className="widget-title">
                <Activity size={15} />
                Network Performance
              </div>

              <select>
                <option>Last 15 minutes</option>
                <option>Last hour</option>
                <option>Last 24 hours</option>
              </select>

            </div>

            <NetworkPerformance metrics={[]} />

          </div>


          {/* RECENT ACTIVITY */}

          <div className="widget">

            <div className="widget-header">

              <div className="widget-title">
                <Activity size={15} />
                Recent Activity
              </div>

            </div>

            <RecentActivity />

          </div>

        </section>

      </main>

    </div>
  );
}

export default DashboardPage;