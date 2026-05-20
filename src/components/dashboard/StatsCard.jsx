function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h3 className="text-gray-500 text-lg">
        {title}
      </h3>

      <h1 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h1>

      <p className="text-green-500 mt-2">
        +12% from last month
      </p>
    </div>
  );
}

export default StatsCard;