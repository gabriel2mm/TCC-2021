import React from "react";
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart() {
  const dataChart = {
    labels: ['Mobile', 'Front-end', 'Back-end', 'AWS'],
    datasets: [
      {
        label: 'Categorias',
        data: [10, 20, 30, 40],
        backgroundColor: ['blue', 'red', 'green', 'orange'],
      },
    ]
  };
  return (
    <>
      <div className="mt-8">
        <Doughnut
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
                text: 'GRÁFICO DE DOUGHNUT - HABILIDADES'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default DoughnutChart;