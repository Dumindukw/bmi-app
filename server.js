const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bmi",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// BMI Calculation Route
app.post("/bmi", (req, res) => {
  const { height, weight } = req.body;
  const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Normal weight";
  else if (bmi < 29.9) category = "Overweight";
  else category = "Obesity";

  const query = "INSERT INTO bmi_reports (height, weight, bmi, category) VALUES (?, ?, ?, ?)";
  db.query(query, [height, weight, bmi, category], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    res.json({ bmi, category });
  });
});

// BMI Reports Route
app.get("/report", (req, res) => {
  const query = "SELECT * FROM bmi_reports";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

// Fetch All BMI Data Route
app.get("/all-reports", (req, res) => {
    const query = "SELECT * FROM bmi_reports";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching reports:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  });
  