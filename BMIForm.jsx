import React, { useState } from "react";
import axios from "axios";

const BMIForm = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiData, setBmiData] = useState(null);
  const [allReports, setAllReports] = useState([]); // State for all reports

  const calculateBMI = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/bmi", { height, weight });
      setBmiData(response.data); // Save the BMI report data
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/all-reports");
      setAllReports(response.data); // Save all reports
    } catch (error) {
      console.error("Failed to fetch reports", error);
      alert("Error fetching reports. Please try again.");
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBmiData(null); // Reset the BMI report
  };

  return (
    <div>
      {!bmiData ? (
        <form onSubmit={calculateBMI}>
          <h1>BMI Calculator</h1>
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <button type="submit">Calculate BMI</button>
        </form>
      ) : (
        <div>
          <h2>Your BMI Report</h2>
          <p>Height: {bmiData.height} cm</p>
          <p>Weight: {bmiData.weight} kg</p>
          <p>BMI: {bmiData.bmi}</p>
          <p>Category: {bmiData.category}</p>

          <h3>Recalculate BMI</h3>
          <form onSubmit={calculateBMI}>
            <label>Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <label>Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <button type="submit">Calculate Again</button>
          </form>
          <button onClick={resetForm}>Reset</button>
        </div>
      )}

      <button onClick={fetchAllReports}>View All Reports</button>

      {allReports.length > 0 && (
        <div>
          <h2>All BMI Reports</h2>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Height</th>
                <th>Weight</th>
                <th>BMI</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {allReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.height}</td>
                  <td>{report.weight}</td>
                  <td>{report.bmi}</td>
                  <td>{report.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BMIForm;
