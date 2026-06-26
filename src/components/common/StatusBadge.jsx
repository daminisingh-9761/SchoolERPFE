function StatusBadge({ status }) {
  const positiveStatuses = ["Active", "Present", "Paid"];
  const isPositive = positiveStatuses.includes(status);

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium
      ${
        isPositive
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
