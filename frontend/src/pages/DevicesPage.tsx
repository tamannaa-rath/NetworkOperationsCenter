import {
  Server,
  Search,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import Header from "../components/Header";

const devices = [
  {
    hostname: "router-03",
    ipAddress: "192.168.1.13",
    type: "Router",
    status: "ACTIVE",
    cpu: "95%",
    memory: "72%",
  },
  {
    hostname: "server-02",
    ipAddress: "192.168.1.22",
    type: "Server",
    status: "ACTIVE",
    cpu: "82%",
    memory: "68%",
  },
  {
    hostname: "firewall-01",
    ipAddress: "192.168.1.1",
    type: "Firewall",
    status: "ACTIVE",
    cpu: "68%",
    memory: "54%",
  },
  {
    hostname: "switch-04",
    ipAddress: "192.168.1.40",
    type: "Switch",
    status: "MAINTENANCE",
    cpu: "55%",
    memory: "48%",
  },
  {
    hostname: "router-01",
    ipAddress: "192.168.1.11",
    type: "Router",
    status: "INACTIVE",
    cpu: "35%",
    memory: "41%",
  },
];

function DevicesPage() {
  return (
    <div className="noc-app">

      <Header />

      <main className="dashboard">

        {/* PAGE HEADER */}

        <div className="page-section-header">

          <div>
            <div className="page-title">
              Devices
            </div>

            <div className="page-subtitle">
              Monitor and manage network devices
            </div>
          </div>

          <button className="primary-button">
            <Plus size={15} />
            Add Device
          </button>

        </div>


        {/* DEVICE TABLE */}

        <section className="widget devices-widget">

          <div className="widget-header">

            <div className="widget-title">
              <Server size={15} />
              Device Inventory
            </div>

            <div className="device-controls">

              <div className="search-box">
                <Search size={14} />

                <input
                  type="text"
                  placeholder="Search devices..."
                />
              </div>

              <select>
                <option>All Statuses</option>
                <option>Active</option>
                <option>Maintenance</option>
                <option>Inactive</option>
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
                  <th>Hostname</th>
                  <th>IP Address</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>CPU Usage</th>
                  <th>Memory Usage</th>
                </tr>
              </thead>

              <tbody>

                {devices.map((device) => (
                  <tr key={device.hostname}>

                    <td className="device-name">
                      {device.hostname}
                    </td>

                    <td>
                      {device.ipAddress}
                    </td>

                    <td>
                      {device.type}
                    </td>

                    <td>
                      <span
                        className={`device-status ${device.status.toLowerCase()}`}
                      >
                        {device.status}
                      </span>
                    </td>

                    <td>
                      {device.cpu}
                    </td>

                    <td>
                      {device.memory}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default DevicesPage;