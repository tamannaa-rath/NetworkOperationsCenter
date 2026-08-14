import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Active", value: 18, color: "#22c55e" },
  { name: "Maintenance", value: 3, color: "#facc15" },
  { name: "Inactive", value: 3, color: "#64748b" },
];

function DevicesByStatus() {
  return (
    <div className="panel small-panel">
      <div className="panel-header">
        <h2>Devices by Status</h2>
      </div>

      <div className="donut-wrapper">
        <div className="donut-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="donut-legend">
          {data.map((item) => (
            <div key={item.name}>
              <span>
                <i
                  className="legend-dot"
                  style={{
                    background: item.color,
                  }}
                />
                {item.name}
              </span>

              <strong>
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-footer">
        Total: 24 devices
      </div>
    </div>
  );
}

export default DevicesByStatus;