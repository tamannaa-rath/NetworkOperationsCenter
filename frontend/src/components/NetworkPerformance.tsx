import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "10:15", cpu: 32, memory: 11, throughput: 56 },
  { time: "10:18", cpu: 48, memory: 20, throughput: 72 },
  { time: "10:21", cpu: 37, memory: 15, throughput: 58 },
  { time: "10:24", cpu: 46, memory: 19, throughput: 75 },
  { time: "10:27", cpu: 41, memory: 23, throughput: 63 },
  { time: "10:30", cpu: 43, memory: 25, throughput: 67 },
];

function NetworkPerformance() {
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
        data={data}
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

            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#2d8cff"
              strokeWidth={2}
              dot={false}
              name="CPU Usage"
            />

            <Line
              type="monotone"
              dataKey="memory"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              name="Memory Usage"
            />

            <Line
              type="monotone"
              dataKey="throughput"
              stroke="#a855f7"
              strokeWidth={2}
              dot={false}
              name="Network Throughput"
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default NetworkPerformance;