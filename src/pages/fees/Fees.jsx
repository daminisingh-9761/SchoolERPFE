import Layout from "/src/components/layouts/Layout";
import { useMemo, useState } from "react";
import Table from "/src/components/common/Table";
import { feesRecords } from "../../utils/constants";

function Fees() {
  const [search, setSearch] = useState("");

  const filteredFees = useMemo(() => {
    return feesRecords.filter((record) =>
      [record.studentName, record.class, record.paymentStatus, record.paymentHistory]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const totalRecords = filteredFees.length;
  const paidCount = filteredFees.filter((record) => record.paymentStatus === "Paid").length;
  const pendingCount = filteredFees.filter((record) => record.paymentStatus === "Pending").length;

  return (

    <Layout>

      <div className="p-8 bg-slate-100 min-h-screen">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Fees Management</h1>
          <p className="text-gray-500 mt-2">View and manage student fee records, payment status, due dates, and payment history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-gray-500 text-lg">Total Records</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalRecords}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-gray-500 text-lg">Paid</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{paidCount}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-gray-500 text-lg">Pending</h3>
            <p className="text-3xl font-bold text-red-500 mt-2">{pendingCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <input
            type="text"
            placeholder="Search student, class, status, or history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Table
          columns={["Student Name", "Class", "Fee Amount", "Due Date", "Payment Status", "Payment History"]}
          data={filteredFees}
        />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-slate-800">Recent Payment History</h2>
            <p className="text-sm text-gray-500">Showing {filteredFees.length} record{filteredFees.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredFees.map((record, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-5">
                <h3 className="text-lg font-semibold text-slate-900">{record.studentName}</h3>
                <p className="text-sm text-gray-500">{record.class}</p>
                <div className="mt-4 text-sm text-slate-700">
                  <p>
                    <span className="font-medium">Status: </span>
                    <span className={record.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}>
                      {record.paymentStatus}
                    </span>
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Amount: </span>{record.feeAmount}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Due Date: </span>{record.dueDate}
                  </p>
                  <p className="mt-2 text-gray-600">{record.paymentHistory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Fees;