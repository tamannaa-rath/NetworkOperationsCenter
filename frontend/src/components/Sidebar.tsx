function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>NOC Dashboard</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Dashboard</li>
        <li>Devices</li>
        <li>Alerts</li>
        <li>Incidents</li>
        <li>Audit Logs</li>
      </ul>
    </aside>
  );
}

export default Sidebar;