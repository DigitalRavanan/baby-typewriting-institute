app.delete("/admission/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM admissions WHERE id = $1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Admission deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});