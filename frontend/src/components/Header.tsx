import {
  Activity,
  Bell,
  ChevronDown,
  Settings,
  RefreshCw,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const tabs = [
  {
    name: "Overview",
    path: "/",
  },
  {
    name: "Devices",
    path: "/devices",
  },
  {
    name: "Alerts",
    path: "/alerts",
  },
  {
    name: "Incidents",
    path: "/incidents",
  },
  {
    name: "Metrics",
    path: "/metrics",
  },
  {
    name: "Audit Logs",
    path: "/audit-logs",
  },
];

function Header() {
  return (
    <header className="topbar">

      {/* Brand */}
      <div className="topbar-brand">
        <div className="brand-mark">
          <Activity size={18} />
        </div>

        <div className="brand-name">
          NOC
        </div>
      </div>


      {/* Navigation */}
      <nav className="top-navigation">

        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === "/"}
            className={({ isActive }) =>
              `top-tab ${isActive ? "active" : ""}`
            }
          >
            {tab.name}

            {tab.name === "Alerts" && (
              <span className="tab-badge alert">
                7
              </span>
            )}

            {tab.name === "Incidents" && (
              <span className="tab-badge incident">
                3
              </span>
            )}
          </NavLink>
        ))}

      </nav>


      {/* Right side */}
      <div className="topbar-actions">

        {/* Last updated */}
        <div className="system-indicator">
          <span className="system-dot" />
          Updated just now
        </div>


        {/* Time range */}
        <select className="header-time-select">
          <option>Last 15 minutes</option>
          <option>Last hour</option>
          <option>Last 24 hours</option>
        </select>


        {/* Refresh */}
        <button className="header-refresh">
          <RefreshCw size={14} />
          Refresh
        </button>


        {/* Notifications */}
        <button className="topbar-icon">
          <Bell size={17} />

          <span className="notification-count">
            7
          </span>
        </button>


        {/* Settings */}
        <button className="topbar-icon">
          <Settings size={17} />
        </button>


        {/* User */}
        <div className="topbar-user">

          <div className="user-avatar">
            A
          </div>

          <ChevronDown size={14} />

        </div>

      </div>

    </header>
  );
}

export default Header;