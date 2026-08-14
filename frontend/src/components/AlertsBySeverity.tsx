import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Critical",
    value: 3,
    color: "#ef4444",
  },
  {
    name: "Warning",
    value: 3,
    color: "#f59e0b",
  },
  {
    name: "Info",
    value: 1,
    color: "#2d8cff",
  },
];

function AlertsBySeverity() {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="alerts-severity">

      {/* Donut chart */}
      <div className="severity-chart">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="78%"
              paddingAngle={2}
              stroke="#172335"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#111a29",
                border: "1px solid #334155",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "11px",
              }}
            />

          </PieChart>
        </ResponsiveContainer>

        <div className="severity-total">
          <strong>{total}</strong>
          <span>Total</span>
        </div>

      </div>


      {/* Legend */}
      <div className="severity-legend">

        {data.map((item) => (
          <div
            className="severity-item"
            key={item.name}
          >

            <div className="severity-label">
              <span
                className="severity-dot"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span>{item.name}</span>
            </div>

            <strong>{item.value}</strong>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AlertsBySeverity;