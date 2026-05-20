function StatusBadge({ status }) {

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium
      ${
        status === "Active"
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;