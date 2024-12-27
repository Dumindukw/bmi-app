import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BMIForm from "./components/BMIForm";
import BMIReport from "./components/BMIReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BMIForm />} />
        <Route path="/report" element={<BMIReport />} />
      </Routes>
    </Router>
  );
}

export default App;

