function Table({
  columns,
  data,
  renderActions,
}) {
  const getFieldKey = (column) =>
    column
      .trim()
      .split(" ")
      .map((word, idx) =>
        idx === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px]">
        {/* Table Head */}
        <thead className="bg-blue-100">
          <tr className="border-b border-slate-200 text-left">
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                {column}
              </th>
            ))}

            {renderActions && (
              <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Actions</th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-100">
          {data.map((item, index) => (
            <tr key={index} className="transition hover:bg-blue-50">
              {columns.map((column, colIndex) => {
                const fieldKey = getFieldKey(column);
                return (
                  <td key={colIndex} className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {item[fieldKey]}
                  </td>
                );
              })}

              {renderActions && (
                <td className="space-x-3 px-6 py-4">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
