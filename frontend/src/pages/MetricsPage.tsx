import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
} from "lucide-react";

import Header from "../components/Header";

import NetworkPerformance from "../components/NetworkPerformance";

const devices = [
  {
    hostname: "router-03",
    cpu: "95%",
    memory: "72%",
    disk: "61%",
    latency: "24 ms",
    packetLoss: "0.8%",
  },
  {
    hostname: "server-02",
    cpu: "82%",
    memory: "68%",
    disk: "74%",
    latency: "18 ms",
    packetLoss: "0.2%",
  },
  {
    hostname: "firewall-01",
    cpu: "68%",
    memory: "54%",
    disk: "48%",
    latency: "12 ms",
    packetLoss: "0.1%",
  },
  {
    hostname: "switch-04",
    cpu: "55%",
    memory: "48%",
    disk: "43%",
    latency: "9 ms",
    packetLoss: "0.0%",
  },
];

function MetricsPage() {
  return (
    <div className="noc-app">

      <Header />

      <main className="dashboard">

        {/* PAGE HEADER */}

        <div className="page-section-header">

          <div>
            <div className="page-title">
              Metrics
            </div>

            <div className="page-subtitle">
              Monitor network and device performance
            </div>
          </div>

          <div className="metrics-controls">

            <select className="header-time-select">
              <option>Last 15 minutes</option>
              <option>Last hour</option>
              <option>Last 24 hours</option>
            </select>

            <select className="header-time-select">
              <option>All Devices</option>
              <option>router-03</option>
              <option>server-02</option>
              <option>firewall-01</option>
            </select>

          </div>

        </div>


        {/* =========================
            METRIC SUMMARY
        ========================= */}

        <section className="metrics-summary">

          <div className="widget metric-card">

            <div className="metric-card-label">
              <Cpu size={14} />
              Average CPU
            </div>

            <strong>42.6%</strong>

            <span className="metric-change positive">
              ↓ 5.2% from previous period
            </span>

          </div>


          <div className="widget metric-card">

            <div className="metric-card-label">
              <MemoryStick size={14} />
              Average Memory
            </div>

            <strong>51.8%</strong>

            <span className="metric-change positive">
              ↓ 2.1% from previous period
            </span>

          </div>


          <div className="widget metric-card">

            <div className="metric-card-label">
              <Network size={14} />
              Network Throughput
            </div>

            <strong>67.4 Mbps</strong>

            <span className="metric-change positive">
              ↑ 4.8% from previous period
            </span>

          </div>


          <div className="widget metric-card">

            <div className="metric-card-label">
              <Activity size={14} />
              Average Latency
            </div>

            <strong>18.4 ms</strong>

            <span className="metric-change positive">
              ↓ 1.8 ms from previous period
            </span>

          </div>

        </section>


        {/* =========================
            PERFORMANCE CHART
        ========================= */}

        <section className="widget metrics-chart-widget">

          <div className="widget-header">

            <div className="widget-title">
              <Activity size={15} />
              Network Performance
            </div>

            <div className="metrics-chart-controls">

              <select>
                <option>All Metrics</option>
                <option>CPU Usage</option>
                <option>Memory Usage</option>
                <option>Network Throughput</option>
              </select>

              <select>
                <option>Last 15 minutes</option>
                <option>Last hour</option>
                <option>Last 24 hours</option>
              </select>

            </div>

          </div>

          <NetworkPerformance />

        </section>


        {/* =========================
            DEVICE METRICS
        ========================= */}

        <section className="widget">

          <div className="widget-header">

            <div className="widget-title">
              <ServerIcon />
              Device Metrics
            </div>

          </div>

          <div className="table-container">

            <table className="data-table">

              <thead>

                <tr>
                  <th>Device</th>
                  <th>CPU</th>
                  <th>Memory</th>
                  <th>Disk</th>
                  <th>Latency</th>
                  <th>Packet Loss</th>
                </tr>

              </thead>

              <tbody>

                {devices.map((device) => (

                  <tr key={device.hostname}>

                    <td className="device-name">
                      {device.hostname}
                    </td>

                    <td>{device.cpu}</td>

                    <td>{device.memory}</td>

                    <td>{device.disk}</td>

                    <td>{device.latency}</td>

                    <td>{device.packetLoss}</td>

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

function ServerIcon() {
  return <Cpu size={15} />;
}

export default MetricsPage;