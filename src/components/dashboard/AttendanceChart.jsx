import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AttendanceChart() {
  const data = [
    { month: "Jan", attendance: 90 },
    { month: "Feb", attendance: 92 },
    { month: "Mar", attendance: 88 },
    { month: "Apr", attendance: 95 },
    { month: "May", attendance: 94 },
  ];
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-5">
        Attendance Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;