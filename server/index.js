const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Baby Typewriting API Running");
});

app.post("/admission", async (req, res) => {
  try {
    const {
      student_name,
      mobile,
      email,
      course,
      address,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO admissions
      (student_name, mobile, email, course, address)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        student_name,
        mobile,
        email,
        course,
        address,
      ]
    );

    res.json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/admissions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM admissions ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});