import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const StatewiseBarChart = () => {
  const [chartData, setChartData] = useState({});
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [inputState, setInputState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    if (state) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/votesforState/${state}`);
          const data = await response.json();
          setChartData({
            labels: data.map(item => item.partyname),
            datasets: [
              {
                label: 'Votes',
                data: data.map(item => item.totvotpoll),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
              }
            ]
          });
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      };

      fetchData();
    }
  }, [state]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setState((prevState) => {
      if (prevState !== inputState) {
        return inputState;
      } else {
        return prevState;
      }
    });
  };



  return (
    <div>
        <h2 style={{ textAlign: "center", color: "#4CAF50", marginTop: "100px" }}>
        State Wise Vote
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
      
      {!isLoading &&state === inputState && state ?  (
        <Bar
          data={chartData}
          options={{
            indexAxis: 'y',
            responsive: true,
            title: { text: `Votes Bar Chart for ${state}`, display: true },
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      ):<>
      Loading..      </>}
    </div>
  );
};

export default StatewiseBarChart;