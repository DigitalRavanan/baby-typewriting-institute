const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "baby_typewriting",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Error:", err);
    return;
  }

  console.log("✅ MySQL Connected");
});

// Test Route
app.get("/", (req, res) => {
  res.send("Baby Typewriting API Running");
});

// Admission Form API
app.post("/admission", (req, res) => {
  console.log("Request received:", req.body);

  const {
    student_name,
    mobile,
    email,
    course,
    address,
  } = req.body;

  const sql = `
    INSERT INTO admissions
    (student_name, mobile, email, course, address)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [student_name, mobile, email, course, address],
    (err, result) => {
      if (err) {
        console.error("❌ SQL Error:", err);

        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      console.log("✅ Admission Saved Successfully");

      res.json({
        success: true,
        message: "Admission Saved Successfully",
      });
    }
  );
});

// Get All Admissions
app.get("/admissions", (req, res) => {
  const sql = "SELECT * FROM admissions ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});



// Start Server
app.listen(5001, () => {
  console.log("🚀 Server running on port 5001");
});