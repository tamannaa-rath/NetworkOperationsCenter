import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Metric } from "../types/metrics.types";

function NetworkPerformance({
  metrics = [],
  selectedMetric = "all",
}: {
  metrics: Metric[];
  selectedMetric?: string;
}) {
  return (
    <div className="network-performance">

      <div className="network-legend">

        <span className="network-legend-item">
          <span className="network-legend-dot cpu-dot" />
          CPU Usage (%)
        </span>

        <span className="network-legend-item">
          <span className="network-legend-dot memory-dot" />
          Memory Usage (%)
        </span>

        <span className="network-legend-item">
          <span className="network-legend-dot throughput-dot" />
          Network Throughput (Mbps)
        </span>

      </div>

      <div className="network-chart">

        <ResponsiveContainer width="100%" height="100%">
        <LineChart
        data={metrics.map((metric) => ({
            time: new Date(metric.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }),
            cpu: Number(metric.cpu_usage),
            memory: Number(metric.memory_usage),
            throughput: Number(metric.network_throughput),
        }))}
        margin={{
            top: 5,
            right: 12,
            left: 0,
            bottom: 35,
        }}
        >
        <CartesianGrid
            stroke="#263247"
            strokeDasharray="0"
            vertical={false}
        />

                <XAxis
        dataKey="time"
        stroke="#64748b"
        tickLine={false}
        axisLine={false}
        height={25}
        tickMargin={5}
        tick={{
            fontSize: 10,
            fill: "#64748b",
        }}
        />

        <YAxis
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            width={32}
            tick={{
            fontSize: 10,
            fill: "#64748b",
            }}
        />

            <Tooltip
              contentStyle={{
                background: "#111a29",
                border: "1px solid #334155",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "11px",
              }}
            />

            {(selectedMetric === "all" || selectedMetric === "cpu") && (
              <Line
                type="monotone"
                dataKey="cpu"
                stroke="#2d8cff"
                strokeWidth={2}
                dot={false}
                name="CPU Usage"
              />
            )}

            {(selectedMetric === "all" || selectedMetric === "memory") && (
              <Line
                type="monotone"
                dataKey="memory"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="Memory Usage"
              />
            )}

            {(selectedMetric === "all" || selectedMetric === "throughput") && (
              <Line
                type="monotone"
                dataKey="throughput"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                name="Network Throughput"
              />
            )}
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default NetworkPerformance;