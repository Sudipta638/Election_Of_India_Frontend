import React, { useEffect, useState } from "react";
import BarChart from "./components/Barchart";
import PieChart from "./components/PieChart";
import HorizontalBarChart from "./components/Barchart";
import StatewiseBarChart from "./components/StatewiseBarchart";
import CandidateComparisonChart from "./components/CandidateComparisonChart";

function App() {
  const [year, setYear] = useState(0);
  const [inputYear, setInputYear] = useState(0);
  const [Loading, setLoading] = useState(true);
  const years = [
    "1977",
    "1980",
    "1984",
    "1989",
    "1991",
    "1996",
    "1998",
    "1999",
    "2004",
    "2009",
    "2014",
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
    setYear((prevYear) => {
      if (prevYear !== inputYear) {
        return inputYear;
      } else {
        return prevYear;
      }
    });
  };


  //console.log("ii" + year);
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#4CAF50", marginTop: "20px" }}>
        Yearly Votes
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ fontSize: "20px", color: "#4CAF50" }}>
          Select Year:
          <select
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            style={{
              fontSize: "18px",
              padding: "5px",
              borderRadius: "5px",
              border: "2px solid #4CAF50",
              marginLeft: "10px",
            }}
          >
            <option value="">Select a year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
            borderRadius: "12px",
          }}
        >
          Submit
        </button>
      </form>
      
          {year !== inputYear || year === 0? (
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              Submit the year for  the chart
            </h2>
          ) : (
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              Year: {year}
              <HorizontalBarChart year={year} />
            </h2>
          )}
          
      

      <h2 style={{ textAlign: "center", color: "#4CAF50", marginTop: "20px" }}>
        Total Votes
      </h2>
      <HorizontalBarChart/>
      <StatewiseBarChart/>
      <CandidateComparisonChart/>
    </div>
  );
}

export default App;
