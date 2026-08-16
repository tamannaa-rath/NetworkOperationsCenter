import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
} from "lucide-react";

import Header from "../components/Header";
import { useState, useEffect } from "react";
import NetworkPerformance from "../components/NetworkPerformance";

import { 
  getMetrics,
} from "../services/metrics.service";

import { getDevices } from "../services/device.service";

import type { 
  Metric,
 } from "../types/metrics.types";

 import type { Device } from "../types/device.types";


function MetricsPage() {

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("all");


  // FETCH METRICS DATA WHEN PAGE LOADS ie COMPONENT MOUNTS
  useEffect(() => {
    async function loadMetrics() {
      try { 
        const data = await getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load metrics");
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);


  // FETCH DEVICES DATA WHEN PAGE LOADS ie COMPONENT MOUNTS
  useEffect(() => {
    async function loadDevices() {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDevices();
  }, []);


  // FILTER METRICS BASED ON SELECTED DEVICE
  const filteredMetrics =
  selectedDevice === "all"
    ? metrics
    : metrics.filter(
        (metric) => String(metric.device_id) === selectedDevice
      );



  // CALCULATE AVERAGE METRICS
  const average_cpu =
  filteredMetrics.length > 0
    ? filteredMetrics.reduce((sum, metric) => sum + Number(metric.cpu_usage), 0) / filteredMetrics.length
    : 0;

  const average_memory =
    filteredMetrics.length > 0
      ? filteredMetrics.reduce((sum, metric) => sum + Number(metric.memory_usage), 0) / filteredMetrics.length
      : 0;

  const average_network_throughput =
    filteredMetrics.length > 0
      ? filteredMetrics.reduce(
          (sum, metric) => sum + Number(metric.network_throughput),
          0
        ) / filteredMetrics.length
      : 0;

  const average_latency =
    filteredMetrics.length > 0
      ? filteredMetrics.reduce(
          (sum, metric) => sum + Number(metric.latency),
          0
        ) / filteredMetrics.length
      : 0;



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

            <select
              className="header-time-select"
              value={selectedDevice}
              onChange={(event) => setSelectedDevice(event.target.value)}
            >
              <option value="all">All Devices</option>

              {devices.map((device) => (
                <option
                  key={device.id}
                  value={device.id}
                >
                  {device.hostname}
                </option>
              ))}
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

            <strong>{average_cpu.toFixed(1)}%</strong>

            <span className="metric-change">
              Based on {filteredMetrics.length} metric{filteredMetrics.length !== 1 ? "s" : ""}
            </span>

          </div>


          <div className="widget metric-card">

            <div className="metric-card-label">
              <MemoryStick size={14} />
              Average Memory
            </div>

            <strong>{average_memory.toFixed(1)}%</strong>

            <span className="metric-change">
              Based on {filteredMetrics.length} metric{filteredMetrics.length !== 1 ? "s" : ""}
            </span>

          </div>


          <div className="widget metric-card">

            <div className="metric-card-label">
              <Network size={14} />
              Network Throughput
            </div>

            <strong>{average_network_throughput.toFixed(1)} Mbps</strong>

            <span className="metric-change">
              Based on {filteredMetrics.length} metric{filteredMetrics.length !== 1 ? "s" : ""}
            </span>

          </div>


          <div className="widget metric-card">

            <div className="metric-card-label">
              <Activity size={14} />
              Average Latency
            </div>

            <strong>{average_latency.toFixed(1)} ms</strong>

            <span className="metric-change">
              Based on {filteredMetrics.length} metric{filteredMetrics.length !== 1 ? "s" : ""}
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

              <select
                value={selectedMetric}
                onChange={(event) => setSelectedMetric(event.target.value)}
              >
                <option value="all">All Metrics</option>
                <option value="cpu">CPU Usage</option>
                <option value="memory">Memory Usage</option>
                <option value="throughput">Network Throughput</option>
              </select>

              <select>
                <option>Last 15 minutes</option>
                <option>Last hour</option>
                <option>Last 24 hours</option>
              </select>

            </div>

          </div>

          <NetworkPerformance
            metrics={filteredMetrics}
            selectedMetric={selectedMetric}
          />

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

            {loading && (
              <p>Loading metrics...</p>
            )}

            {error && (
              <p>{error}</p>
            )}

            {!loading && !error && (
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
                  {filteredMetrics.map((metric) => (
                    <tr key={metric.id}>

                      <td className="device-name">Device {metric.hostname}</td>
                      <td>{metric.cpu_usage}%</td>
                      <td>{metric.memory_usage}%</td>
                      <td>{metric.disk_usage}%</td>
                      <td>{metric.latency} ms</td>
                      <td>{metric.packet_loss}%</td>

                    </tr>

                  ))}

                </tbody>

              </table>
            )}

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