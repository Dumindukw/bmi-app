import React, { useEffect, useState } from "react";
import axios from "axios";

const BMIReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get("http://localhost:5000/report");
      setReports(response.data);
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h1>BMI Analysis Report</h1>
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
          {reports.map((report) => (
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
  );
};

export default BMIReport;
