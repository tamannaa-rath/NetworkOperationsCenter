const activities = [
  {
    time: "10:30 AM",
    title: "User admin created incident",
    description: "INC-1003",
    type: "green",
  },
  {
    time: "10:28 AM",
    title: "Critical alert on router-03",
    description: "High CPU usage detected",
    type: "red",
  },
  {
    time: "10:25 AM",
    title: "User jane.smith assigned incident",
    description: "INC-1002",
    type: "orange",
  },
  {
    time: "10:20 AM",
    title: "Device switch-07 went offline",
    description: "Unreachable",
    type: "blue",
  },
  {
    time: "10:15 AM",
    title: "System backup completed",
    description: "All configurations saved",
    type: "green",
  },
];

function RecentActivity() {
  return (
    <div className="panel activity-panel">
      <div className="panel-header">
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <div
            className="activity-item"
            key={index}
          >
            <div
              className={`activity-dot ${activity.type}`}
            />

            <div>
              <span className="activity-time">
                {activity.time}
              </span>

              <strong>
                {activity.title}
              </strong>

              <p>
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;