import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/admissions"
      );

      setAdmissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-10 px-6">
      <h2 className="text-4xl font-bold mb-8 text-blue-900">
        Student Admissions
      </h2>

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
            {admissions.map((student) => (
              <tr
                key={student.id}
                className="border-b"
              >
                <td className="p-3">{student.id}</td>
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
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </section>
  );
}

export default Admin;