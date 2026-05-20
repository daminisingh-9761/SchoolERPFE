
export const students = [
  {
    name: "Damini Singh",
    email: "damini@gmail.com",
    class: "10th",
    status: "Active",
  },

  {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    class: "9th",
    status: "Active",
  },

  {
    name: "Priya Verma",
    email: "priya@gmail.com",
    class: "8th",
    status: "Inactive",
  },
];

export const feesRecords = [
  {
    studentName: students[0].name,
    class: students[0].class,
    feeAmount: "$1,200",
    dueDate: "10 Jun 2026",
    paymentStatus: "Paid",
    paymentHistory: "Paid $1,200 on 15 May 2026",
  },
  {
    studentName: students[1].name,
    class: students[1].class,
    feeAmount: "$1,100",
    dueDate: "14 Jun 2026",
    paymentStatus: "Pending",
    paymentHistory: "Last payment: $500 on 20 Apr 2026",
  },
  {
    studentName: students[2].name,
    class: students[2].class,
    feeAmount: "$950",
    dueDate: "22 Jun 2026",
    paymentStatus: "Paid",
    paymentHistory: "Paid $950 on 08 May 2026",
  },
];
