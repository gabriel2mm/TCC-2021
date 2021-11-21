import React from "react";
import { Radar } from 'react-chartjs-2';

function RadarChart() {
  const dataChart = {
    labels: ['DEVELOPER', 'HARDWARE', 'CLOUD', 'INFRA', 'OUTROS'],
    datasets: [{
      label: 'Período diurno',
      data: [60, 59, 90, 81, 56],
      fill: true,
      backgroundColor: 'rgba(102, 255, 102, 0.2)',
      borderColor: 'rgb(102, 255, 102)',
      pointBackgroundColor: 'rgb(102, 255, 102)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(102, 255, 102)'
    }, {
      label: 'Período noturno',
      data: [28, 48, 40, 19, 96],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };
  return (
    <>
      <div className="mt-8">
        <Radar
          height={400}
          width={400}
          data={dataChart}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'GRÁFICO RADAR - GRUPOS'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default RadarChart;