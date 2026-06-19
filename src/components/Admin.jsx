import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Admin() {
  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const res = await axios.get(
        "https://baby-typewriting-api.onrender.com/admissions"
      );

      setAdmissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAdmission = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admission?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://baby-typewriting-api.onrender.com/admission/${id}`
      );

      alert("Admission deleted successfully");
      fetchAdmissions();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  const exportToExcel = () => {
    const excelData = admissions.map((student, index) => ({
      "S.No": index + 1,
      Name: student.student_name,
      Mobile: student.mobile,
      Email: student.email,
      Course: student.course,
      Address: student.address,
      AdmissionDate: student.created_at
        ? new Date(student.created_at).toLocaleDateString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Admissions"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Admissions.xlsx");
  };

  // Dashboard Statistics
  const totalAdmissions = admissions.length;

  const today = new Date().toISOString().split("T")[0];

  const todayAdmissions = admissions.filter(
    (student) =>
      student.created_at &&
      student.created_at.startsWith(today)
  ).length;

  const englishAdmissions = admissions.filter(
    (student) =>
      student.course &&
      student.course.toLowerCase().includes("english")
  ).length;

  const tamilAdmissions = admissions.filter(
    (student) =>
      student.course &&
      student.course.toLowerCase().includes("tamil")
  ).length;

  const filteredAdmissions = admissions.filter(
    (student) =>
      student.student_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.mobile.includes(searchTerm)
  );

  return (
    <section className="max-w-7xl mx-auto py-10 px-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-blue-900">
          Student Admissions
        </h2>

        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export Excel
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-blue-900 text-white p-5 rounded-lg shadow">
          <h3 className="text-lg">Total Admissions</h3>
          <p className="text-3xl font-bold">
            {totalAdmissions}
          </p>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-lg shadow">
          <h3 className="text-lg">Today's Entries</h3>
          <p className="text-3xl font-bold">
            {todayAdmissions}
          </p>
        </div>

        <div className="bg-purple-600 text-white p-5 rounded-lg shadow">
          <h3 className="text-lg">English Course</h3>
          <p className="text-3xl font-bold">
            {englishAdmissions}
          </p>
        </div>

        <div className="bg-orange-600 text-white p-5 rounded-lg shadow">
          <h3 className="text-lg">Tamil Course</h3>
          <p className="text-3xl font-bold">
            {tamilAdmissions}
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by Name or Mobile"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full md:w-96 border p-3 rounded"
        />
      </div>

      <p className="mb-4 text-gray-600">
        Total Results: {filteredAdmissions.length}
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">

          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3">S.No</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Email</th>
              <th className="p-3">Course</th>
              <th className="p-3">Admission Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmissions.map((student, index) => (
              <tr
                key={student.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  {index + 1}
                </td>

                <td className="p-3">
                  {student.student_name}
                </td>

                <td className="p-3">
                  {student.mobile}
                </td>

                <td className="p-3">
                  {student.email}
                </td>

                <td className="p-3">
                  {student.course}
                </td>

                <td className="p-3">
                  {student.created_at
                    ? new Date(
                        student.created_at
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      deleteAdmission(student.id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </section>
  );
}

export default Admin;