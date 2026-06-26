import Layout from "/src/components/layouts/Layout";
import Table from "/src/components/common/Table";
import { useState, useEffect, useMemo, useRef } from "react";
import api from "../../services/api";
import Button from "/src/components/common/Button";
import { FaEye } from "react-icons/fa";
function Fees() {
  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] =
    useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [fees, setFees] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const filteredFees = useMemo(() => {

    let data = fees;

    if (activeCard !== "All") {
      data = data.filter(
        (record) =>
          record.status === activeCard
      );
    }

    return data.filter((record) =>
      record.student_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [fees, search, activeCard]);
  const modalRef = useRef(null);
  const historyModalRef = useRef(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [selectedHistory, setSelectedHistory] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const resetForm = () => {
    setSelectedStudent("");
    setFeeAmount("");
    setDueDate("");
  };

  const closeModal = () => {
    resetForm();
    setShowAssignModal(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAssignModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [showAssignModal]);

  useEffect(() => {

    const handleHistoryOutside = (
      event
    ) => {

      if (
        showHistoryModal &&
        historyModalRef.current &&
        !historyModalRef.current.contains(
          event.target
        )
      ) {
        setShowHistoryModal(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleHistoryOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleHistoryOutside
      );

    };

  }, [showHistoryModal]);

  const fetchFees = async () => {
    try {
      const response = await api.get("/fees");

      console.log(response.data);

      setFees(response.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFees();
  }, []);
  const totalRecords = filteredFees.length;

  const paidCount = filteredFees.filter(
    (record) => record.status === "Paid"
  ).length;

  const pendingCount = filteredFees.filter(
    (record) => record.status === "Pending"
  ).length;
  const overdueCount = filteredFees.filter(
    (record) => record.status === "Overdue"
  ).length;

  const tableData = filteredFees.map((record) => ({
    id: record._id,

    studentId: record.student_id,

    studentName: record.student_name,

    class: record.class_name,

    feeAmount: record.fee_amount,

    paidAmount: record.paid_amount,

    remainingAmount: record.remaining_amount,

    dueDate: record.due_date,

    status: record.status,
  }));

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students/");

      setStudents(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignFee = async () => {
    try {

      const student = students.find(
        (s) => s._id === selectedStudent
      );

      await api.post("/fees/", {
        student_id: student._id,
        student_name: student.name,
        class_name: student.class_name,
        fee_amount: Number(feeAmount),
        due_date: dueDate,
      });

      alert("Fee Assigned Successfully");
      closeModal();
      fetchFees();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCollectPayment = async () => {
    if (!paymentAmount) {
      alert("Enter Payment Amount");
      return;
    }
    if (
      Number(paymentAmount) >
      selectedFee.remainingAmount
    ) {
      alert(
        "Payment cannot exceed remaining amount"
      );
      return;
    }
    try {

      await api.put(
        `/fees/payment/${selectedFee.id}`,
        {
          payment_amount: Number(paymentAmount)
        }
      );

      alert("Payment Collected Successfully");

      setPaymentAmount("");

      setShowPaymentModal(false);

      fetchFees();

    } catch (error) {

      console.log(error);

      alert("Payment Failed");

    }
  };

  const handleViewHistory = async (
    studentId,
    row
  ) => {
    try {

      const response = await api.get(
        `/fees/history/${studentId}`
      );

      setSelectedHistory({
        ...row,
        history: response.data
      });

      setShowHistoryModal(true);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <Layout>
      <div className="bg-slate-100 min-h-screen">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-600">
              Fees Management
            </h1>
          </div>

          <Button
            text="+ Assign Fee"
            variant="primary"
            className="px-5 py-3 rounded-xl shadow-md"
            onClick={() => {
              resetForm();
              setShowAssignModal(true);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div onClick={() => setActiveCard("All")}
            className={`cursor-pointer bg-white rounded-2xl shadow-md border-t-4 border-blue-400 p-5 ${activeCard === "All" ? "ring-2 ring-blue-100" : ""}`}>
            <div className="flex justify-between items-start">
              <h3 className="text-slate-600 font-medium">
                Total Records
              </h3>
              <div className="bg-blue-50 p-1 rounded-l">
                📋
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {totalRecords}
            </p>
          </div>
          <div onClick={() => setActiveCard("Paid")}
            className={`cursor-pointer bg-white rounded-2xl shadow-md border-t-4 border-green-500 p-5 ${activeCard === "Paid" ? "ring-2 ring-green-200" : ""} `}>
            <div className="flex justify-between">
              <h3 className="text-slate-600 font-medium">
                Paid
              </h3>
              <div className="bg-green-50 p-1 rounded-l">
                ✅
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {paidCount}
            </p>
          </div>
          <div onClick={() => setActiveCard("Pending")}
            className={`cursor-pointer bg-white rounded-2xl shadow-md border-t-4 border-yellow-500 p-5 ${activeCard === "Pending" ? "ring-2 ring-yellow-100" : ""}`}>
            <div className="flex justify-between">
              <h3 className="text-slate-600 font-medium">
                Pending
              </h3>
              <div className="bg-yellow-50 p-1 rounded-l">
                ⏳
              </div>
            </div>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {pendingCount}
            </p>
          </div>
          <div onClick={() => setActiveCard("Overdue")}
            className={`cursor-pointer bg-white rounded-2xl shadow-md border-t-4 border-red-500 p-5 ${activeCard === "Overdue" ? "ring-2 ring-red-200" : ""}`}>
            <div className="flex justify-between">
              <h3 className="text-slate-600 font-medium">
                Overdue
              </h3>
              <div className="bg-red-50 p-1 rounded-l">
                ⚠️
              </div>
            </div>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {overdueCount}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search Student Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" w-[45%] border border-slate-300  rounded-xl px-4 py-2 bg-white " />
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
           className=" w-[200px] border border-slate-300 rounded-xl px-4 py-2 bg-white">
            <option value="All">All Classes</option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
        </div>

        <Table
          columns={[
            "Student Name",
            "Class",
            "Fee Amount",
            "Paid Amount",
            "Remaining Amount",
            "Due Date",
            "Status"
          ]}
          data={tableData}
          renderActions={(row) => (
            <div className="flex items-center gap-2">

              <Button
                text="Collect Payment"
                className="bg-slate-500 text-white text-xs px-2 py-1 rounded-lg "
                onClick={() => {
                  setSelectedFee(row);
                  setPaymentAmount("");
                  setShowPaymentModal(true);
                }}
              />

              <button
                className="text-slate-600 hover:text-blue-600"
                onClick={() =>
                  handleViewHistory(
                    row.studentId,
                    row
                  )
                }
              >
                <FaEye size={18} />
              </button>

            </div>
          )}
        />
        {/* 
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
        </div> */}
      </div>
      {
        showAssignModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div
              ref={modalRef}
              className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-5">
                Assign Fee
              </h2>

              <div className="space-y-4">

                <select
                  value={selectedStudent}
                  onChange={(e) =>
                    setSelectedStudent(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (
                    <option
                      key={student._id}
                      value={student._id}
                    >
                      {student.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Fee Amount"
                  value={feeAmount}
                  onChange={(e) =>
                    setFeeAmount(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div className="flex justify-end gap-3">

                  <Button
                    text="Cancel"
                    variant="secondary"
                    onClick={closeModal}
                  />

                  <Button
                    text="Save"
                    variant="primary"
                    onClick={handleAssignFee}
                  />

                </div>

              </div>

            </div>

          </div>
        )
      }
      {
        showPaymentModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

              <h2 className="text-2xl font-bold mb-5">
                Collect Payment
              </h2>

              <div className="space-y-3">

                <p>
                  <strong>Student:</strong>{" "}
                  {selectedFee?.studentName}
                </p>

                <p>
                  <strong>Total Fee:</strong>{" "}
                  ₹{selectedFee?.feeAmount}
                </p>

                <p>
                  <strong>Paid:</strong>{" "}
                  ₹{selectedFee?.paidAmount}
                </p>

                <p>
                  <strong>Remaining:</strong>{" "}
                  ₹{selectedFee?.remainingAmount}
                </p>

                <input
                  type="number"
                  placeholder="Enter Payment Amount"
                  value={paymentAmount}
                  onChange={(e) =>
                    setPaymentAmount(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div className="flex justify-end gap-3">

                  <Button
                    text="Cancel"
                    variant="secondary"
                    onClick={() =>
                      setShowPaymentModal(false)
                    }
                  />

                  <Button
                    text="Save Payment"
                    variant="primary"
                    onClick={handleCollectPayment}
                  />

                </div>

              </div>

            </div>

          </div>
        )
      }

      {
        showHistoryModal &&
        selectedHistory && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div
              ref={historyModalRef}
              className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
            >

              <div className="flex justify-between mb-5">

                <h2 className="text-xl font-bold">
                  {selectedHistory.studentName}
                </h2>

                <button
                  onClick={() =>
                    setShowHistoryModal(false)
                  }
                >
                  ✕
                </button>

              </div>

              <div className="space-y-2 mb-5">

                <div className="flex justify-between">
                  <span>Total Fee</span>
                  <span>
                    ₹{selectedHistory.feeAmount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Paid Amount</span>
                  <span>
                    ₹{selectedHistory.paidAmount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Remaining</span>
                  <span>
                    ₹{selectedHistory.remainingAmount}
                  </span>
                </div>

              </div>

              <hr className="mb-4" />

              <h3 className="font-semibold mb-3">
                Payment History
              </h3>

              <div className="space-y-2">

                {
                  selectedHistory.history.map(
                    (payment, index) => (
                      <div
                        key={index}
                        className="flex justify-between"
                      >
                        <span>
                          {payment.payment_date}
                        </span>

                        <span>
                          ₹{payment.amount}
                        </span>
                      </div>
                    )
                  )
                }

              </div>

            </div>

          </div>
        )
      }

    </Layout>

  );
}

export default Fees;