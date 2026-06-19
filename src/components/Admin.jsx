import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const filteredAdmissions = admissions.filter(
  (student) =>
    student.student_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    student.mobile.includes(searchTerm)
);
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

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <section className="max-w-7xl mx-auto py-10 px-6">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-blue-900">
          Student Admissions
        </h2>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

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

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">

          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Email</th>
              <th className="p-3">Course</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmissions.map((student) => (
              <tr
                key={student.id}
                className="border-b"
              >
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.student_name}</td>
                <td className="p-3">{student.mobile}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.course}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </section>
  );
}

export default Admin;