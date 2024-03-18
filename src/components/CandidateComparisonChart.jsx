import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const CandidateComparisonChart = () => {
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [inputState, setInputState] = useState([]);
  const [year, setYear] = useState(0);
  const [inputYear, setInputYear] = useState(0);
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
    setState((prevState) => {
      if (prevState !== inputState) {
        return inputState;
      } else {
        return prevState;
      }
    });
  };
  useEffect(() => {
  const fetchStates = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/nameofStates');
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStates();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/candidates/${state}/${year}`);
        const data = await response.json();
        console.log(data.general);
        
  
        setChartData({
          labels: ['General', 'SC', 'ST'],
          datasets: [
            {
              data: [data[0].general, data[0].sc, data[0].st],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(192, 75, 75, 0.6)', 'rgba(75, 75, 192, 0.6)'],
              hoverBackgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(192, 75, 75, 0.4)', 'rgba(75, 75, 192, 0.4)'],
            }
          ]
        });
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [state, year]);
  console.log(year);
  console.log(state);
  return (
    <div>
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
          Select State:
          <select
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
            style={{
              fontSize: "18px",
              padding: "5px",
              borderRadius: "5px",
              border: "2px solid #4CAF50",
              marginLeft: "10px",
            }}
          >
            <option value="">Select a year</option>
            {states.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
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
      {!isLoading &&state === inputState && state &&year ===inputYear && year!==0?  (
        <>
    <Pie
      data={chartData}
      options={{
        responsive: true,
        title: { text: `Candidate Comparison for ${state} in ${year}`, display: true },
      }}
    />
    
    </>
    ):<>
    Loading...
    </>}
    </div>
  );
};

export default CandidateComparisonChart;