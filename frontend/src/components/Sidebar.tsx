import {
  Activity,
  AlertTriangle,
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Server,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Devices",
    path: "/devices",
    icon: Server,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: AlertTriangle,
  },
  {
    name: "Incidents",
    path: "/incidents",
    icon: Activity,
  },
  {
    name: "Metrics",
    path: "/metrics",
    icon: BarChart3,
  },
  {
    name: "Audit Logs",
    path: "/audit-logs",
    icon: ClipboardList,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Shield size={22} />
        </div>

        <div>
          <div className="brand-title">NOC Dashboard</div>
          <div className="brand-subtitle">
            Network Operations Center
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>

              {item.name === "Alerts" && (
                <span className="nav-badge danger">7</span>
              )}

              {item.name === "Incidents" && (
                <span className="nav-badge warning">3</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="system-status">
          <div className="status-heading">
            System Status
          </div>

          <div className="operational">
            <span className="status-dot green" />
            Operational
          </div>

          <div className="system-stat">
            <span>Uptime</span>
            <strong>99.92%</strong>
          </div>

          <div className="system-stat">
            <span>Response Time</span>
            <strong>120 ms</strong>
          </div>

          <div className="system-stat">
            <span>Version</span>
            <strong>1.0.0</strong>
          </div>
        </div>

        <button className="logout-button">
          <Users size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;