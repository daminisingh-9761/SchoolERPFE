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
    <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
      <table className="w-full">
        {/* Table Head */}
        <thead>
          <tr className="border-b text-left">
            {columns.map((column, index) => (
              <th key={index} className="py-4 px-4">
                {column}
              </th>
            ))}

            {renderActions && (
              <th className="py-4 px-4">Actions</th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {columns.map((column, colIndex) => {
                const fieldKey = getFieldKey(column);
                return (
                  <td key={colIndex} className="py-4 px-4">
                    {item[fieldKey]}
                  </td>
                );
              })}

              {renderActions && (
                <td className="py-4 px-4 space-x-3">
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