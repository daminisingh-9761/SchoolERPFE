import { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaIdCard, FaTimes } from "react-icons/fa";
import api from "../../services/api";

function ProfileModal({ isOpen, onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const studentId = user?.student_id;

  const [studentProfile, setStudentProfile] = useState(null);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [studentFee, setStudentFee] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchStudentProfile = async () => {
      try {
        const response = await api.get(`/students/${studentId}`);
        setStudentProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAttendanceSummary = async () => {
      try {
        const response = await api.get(
          `/attendance/student/${studentId}/summary`
        );
        setAttendanceSummary(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchStudentFee = async () => {
      try {
        const response = await api.get("/fees");
        const fee = response.data.find(
          item => item.student_id === studentId
        );
        setStudentFee(fee);
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchTeacherProfile = async () => {
      try {
        const response = await api.get("/teachers/");
        const teacher = response.data.find(t => t.email === user.email) || user;
        setTeacherProfile(teacher);
      } catch (error) {
        console.log(error);
        setTeacherProfile(user);
      }
    };

    if (role === "student" && studentId) {
      fetchStudentProfile();
      fetchAttendanceSummary();
      fetchStudentFee();
    } else if (role === "teacher") {
      fetchTeacherProfile();
    }
  }, [role, studentId, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Photo / Header Gradient */}
        <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm rounded-full transition-all"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="px-6 pb-8 md:px-10 md:pb-10">
          {role === "student" && studentProfile ? (
            <div className="flex flex-col">
              {/* Profile Photo & Basic Info (Centered) */}
              <div className="flex flex-col items-center -mt-20 relative z-10">
                <div className="relative">
                  <div
                    className="
                    w-36 h-36
                    md:w-40 md:h-40
                    rounded-full
                    border-4 border-white
                    shadow-lg
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-5xl
                    font-bold
                  "
                  >
                    {studentProfile.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 border-2 border-white h-5 w-5 rounded-full shadow-sm" title="Active"></div>
                </div>

                <div className="mt-4 text-center">
                  <h2 className="text-3xl font-bold text-slate-800">{studentProfile.name}</h2>
                  <p className="text-lg text-blue-600 font-medium mt-1">
                    Class {studentProfile.class_name} | Student
                  </p>
                  <span className="inline-block mt-2 bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                    Status: {studentProfile.status}
                  </span>
                </div>

                {/* Quick Stats (Attendance, Fee Status) */}
                <div className="mt-8 flex justify-center gap-10 md:gap-16 border-y border-slate-100 py-5 w-full max-w-xl">
                  <div className="text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Attendance</p>
                    <p className="text-2xl font-black text-slate-800">{
                      attendanceSummary
                        ? `${attendanceSummary.attendance_percentage}%`
                        : "0%"
                    }</p>
                  </div>
                  <div className="w-px bg-slate-200"></div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Fee Status</p>
                    <span
                      className={`inline-block text-sm font-bold px-3 py-1 rounded-full ${studentFee?.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {studentFee?.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Contact Details */}
              <div className="mt-8 flex justify-center">
                <div className="w-full max-w-2xl">
                  {/* Contact Details */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                    <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 group-hover:bg-blue-50/30 transition-colors">
                      <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <FaIdCard className="text-blue-500" /> Contact Details
                      </h3>
                    </div>

                    <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 h-full">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-full shadow-inner">
                          <FaEnvelope size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Email Address</p>
                          <p className="text-sm font-semibold text-slate-800 break-all">{studentProfile.email}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-full shadow-inner">
                          <FaPhoneAlt size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Phone Number</p>
                          <p className="text-sm font-semibold text-slate-800">{studentProfile.phone}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-full shadow-inner">
                          <FaMapMarkerAlt size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Residential Address</p>
                          <p className="text-sm font-semibold text-slate-800 leading-relaxed">{studentProfile.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : role === "teacher" && teacherProfile ? (
            <div className="flex flex-col">
              {/* Profile Photo & Basic Info (Centered) */}
              <div className="flex flex-col items-center -mt-20 relative z-10">
                <div className="relative">
                  <div
                    className="
                    w-36 h-36
                    md:w-40 md:h-40
                    rounded-full
                    border-4 border-white
                    shadow-lg
                    bg-gradient-to-br
                    from-purple-600
                    to-pink-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-5xl
                    font-bold
                  "
                  >
                    {teacherProfile.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 border-2 border-white h-5 w-5 rounded-full shadow-sm" title={teacherProfile.status}></div>
                </div>

                <div className="mt-4 text-center">
                  <h2 className="text-3xl font-bold text-slate-800">{teacherProfile.name}</h2>
                  <p className="text-lg text-purple-600 font-medium mt-1 uppercase">
                    {teacherProfile.role || "Teacher"}
                  </p>
                  <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full border ${
                    teacherProfile.status === "Active" || !teacherProfile.status ? "bg-green-100 text-green-700 border-green-200" : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    Status: {teacherProfile.status || "Active"}
                  </span>
                </div>
              </div>

              {/* Bottom Section: Contact Details */}
              <div className="mt-8 flex justify-center">
                <div className="w-full max-w-2xl">
                  {/* Contact Details */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                    <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 group-hover:bg-purple-50/30 transition-colors">
                      <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <FaIdCard className="text-purple-500" /> Contact Details
                      </h3>
                    </div>

                    <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 h-full">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="bg-purple-50 text-purple-600 p-4 rounded-full shadow-inner">
                          <FaEnvelope size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Email Address</p>
                          <p className="text-sm font-semibold text-slate-800 break-all">{teacherProfile.email}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="bg-purple-50 text-purple-600 p-4 rounded-full shadow-inner">
                          <FaPhoneAlt size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Phone Number</p>
                          <p className="text-sm font-semibold text-slate-800">{teacherProfile.phone || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="bg-purple-50 text-purple-600 p-4 rounded-full shadow-inner">
                          <FaMapMarkerAlt size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Residential Address</p>
                          <p className="text-sm font-semibold text-slate-800 leading-relaxed">{teacherProfile.address || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : role === "superadmin" ? (
            <div className="flex flex-col">
              {/* Profile Photo & Basic Info (Centered) */}
              <div className="flex flex-col items-center -mt-20 relative z-10">
                <div className="relative">
                  <div
                    className="
                    w-36 h-36
                    md:w-40 md:h-40
                    rounded-full
                    border-4 border-white
                    shadow-lg
                    bg-gradient-to-br
                    from-amber-500
                    to-orange-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-5xl
                    font-bold
                  "
                  >
                    {user?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 border-2 border-white h-5 w-5 rounded-full shadow-sm" title="Active"></div>
                </div>

                <div className="mt-4 text-center">
                  <h2 className="text-3xl font-bold text-slate-800">{user?.name}</h2>
                  <p className="text-lg text-amber-600 font-medium mt-1 uppercase">
                    {user?.role || "Superadmin"}
                  </p>
                  <span className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full border bg-green-100 text-green-700 border-green-200">
                    Status: {user?.status || "Active"}
                  </span>
                </div>
              </div>

              {/* Bottom Section: Contact Details */}
              <div className="mt-8 flex justify-center">
                <div className="w-full max-w-sm">
                  {/* Contact Details */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                    <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 group-hover:bg-amber-50/30 transition-colors">
                      <h3 className="text-sm font-bold text-slate-700 flex items-center justify-center gap-2">
                        <FaIdCard className="text-amber-500" /> Contact Details
                      </h3>
                    </div>

                    <div className="p-6 md:p-8 flex justify-center h-full">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="bg-amber-50 text-amber-600 p-4 rounded-full shadow-inner">
                          <FaEnvelope size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Email Address</p>
                          <p className="text-sm font-semibold text-slate-800 break-all">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
              {role !== "student" && role !== "teacher" && role !== "superadmin" ? "Profile available for registered users only." : "Loading profile..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
