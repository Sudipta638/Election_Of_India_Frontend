import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, DoughnutController } from 'chart.js';

Chart.register(ArcElement, CategoryScale, DoughnutController);

const PieChart = () => {
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/votes');
        const data = await response.json();
        if (data) {
          setChartData({
            labels: data.map(item => item.partyname),
            datasets: [
              {
                label: 'Votes',
                data: data.map(item => item.totvotpoll),
                backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                borderWidth: 4
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
      <Pie
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Pie Chart", display: true },
        }}
      />  
    </div>
  );
};

export default PieChart;