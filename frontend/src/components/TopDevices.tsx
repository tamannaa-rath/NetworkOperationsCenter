const devices = [
  {
    name: "router-03",
    cpu: 95,
  },
  {
    name: "server-02",
    cpu: 82,
  },
  {
    name: "firewall-01",
    cpu: 68,
  },
  {
    name: "switch-04",
    cpu: 55,
  },
  {
    name: "router-01",
    cpu: 35,
  },
];

function TopDevices() {
  return (
    <div className="panel table-panel">
      <div className="panel-header">
        <h2>Top Devices by CPU Usage</h2>

        <button className="view-all">
          View all
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Device</th>
              <th>CPU Usage</th>
            </tr>
          </thead>

          <tbody>
            {devices.slice(0, 3).map((device) => (
              <tr key={device.name}>
                <td>{device.name}</td>

                <td>
                  <div className="cpu-cell">
                    <span>{device.cpu}%</span>

                    <div className="mini-bar">
                      <div
                        style={{
                          width: `${device.cpu}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopDevices;