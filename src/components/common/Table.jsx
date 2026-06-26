import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Table({
  columns,
  data,
  renderActions,
  itemsPerPage: initialItemsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Reset to page 1 when data changes (e.g. from filtering) or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-full">
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
          {currentData.map((item, index) => (
            <tr key={index} className="transition hover:bg-blue-50">
              {columns.map((column, colIndex) => {
                const fieldKey = getFieldKey(column);
                return (
                  <td key={colIndex} className="px-6 py-4 text-m font-semibold text-slate-600">
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
          {currentData.length === 0 && (
            <tr>
              <td colSpan={columns.length + (renderActions ? 1 : 0)} className="px-6 py-8 text-center text-slate-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-auto flex items-center justify-between border-t border-slate-200 px-6 py-3 bg-slate-50">
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded px-2 py-1 bg-white outline-none focus:border-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          {/* <span>
            Showing <span className="font-semibold text-slate-700">{data.length === 0 ? 0 : startIndex + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="font-semibold text-slate-700">{data.length}</span> entries
          </span> */}
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
           <FaChevronLeft size={14} />
          </button>

          <span className="text-sm font-medium text-slate-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
          <FaChevronRight size={14} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default Table;
