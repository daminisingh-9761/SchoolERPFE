import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import api from "../../services/api";

function FeesChart() {
  const [data, setData] = useState([]);
  const fetchFeesChart = async () => {

    try {

      const response = await api.get(
        "/dashboard/admin"
      );

      const chartData =
        response.data.fees_chart.map(
          (item) => ({
            month: new Date(item.month + "-01")
              .toLocaleString("default", {
                month: "short",
              }),
            fees: item.fees,
          })
        );

      setData(chartData);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="mt-1 text-xl titlecase text-slate-700">
            Monthly Fees Revenue
          </h2>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Line
            type="monotone"
            dataKey="fees"
            stroke="#f5b849"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 3, fill: "#ffffff" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#f5b849" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FeesChart;
