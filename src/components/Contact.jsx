import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    student_name: "",
    mobile: "",
    email: "",
    course: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://baby-typewriting-api.onrender.com/admission",
        formData
      );

      alert("Admission Enquiry Submitted Successfully!");

      setFormData({
        student_name: "",
        mobile: "",
        email: "",
        course: "",
        address: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Online Admission Enquiry
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="student_name"
            placeholder="Student Name"
            value={formData.student_name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Course</option>
            <option>Tamil Typewriting</option>
            <option>English Typewriting</option>
            <option>Combined Course</option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg w-full"
          >
            Submit Enquiry
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;