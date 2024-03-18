import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import { Chart, LinearScale, BarController, CategoryScale, BarElement } from 'chart.js';

Chart.register(LinearScale, BarController, CategoryScale, BarElement);





const HorizontalBarChart = ({year}) => {
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log("yser:"+year);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if(year === undefined){
          response = await fetch('http://localhost:8000/api/votes');
        } else {
          response = await fetch(`http://localhost:8000/api/votes/${year}`);
        }
        const data = await response.json();
        if (data) {
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
        } else {
          console.error('Data is undefined');
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y',
          responsive: true,
          title: { text: "Horizontal Bar Chart", display: true },
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
    </div>
  );
};

export default HorizontalBarChart;
