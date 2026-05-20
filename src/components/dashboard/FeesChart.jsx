import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function FeesChart() {
  const data = [
    { month: "Jan", fees: 4000 },
    { month: "Feb", fees: 3000 },
    { month: "Mar", fees: 5000 },
    { month: "Apr", fees: 4500 },
    { month: "May", fees: 6000 },
  ];
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-5">
        Fees Collection
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="fees"
            fill="#16a34a"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FeesChart;