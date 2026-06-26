import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";
import api from "../../services/api";

function AttendanceChart() {
  const [data, setData] = useState([]);
  useEffect(() => {

    fetchAttendance();

  }, []);
  const fetchAttendance = async () => {

    try {

      const response = await api.get("/dashboard/admin");

      setData(response.data.weekly_attendance);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="mt-1 text-xl titlecase text-slate-700">
            Weekly Attendance
          </h2>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="day"
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
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar
            dataKey="present"
            name="Present"
            fill="#27977b"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="absent"
            name="Absent"
            fill="#f65e64"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
