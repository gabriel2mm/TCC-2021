import React from "react";
import { Pie } from 'react-chartjs-2';

function PieChart() {
  const dataChart = {
    labels: ['Software', 'Hardware', 'Infra', 'Apoio'],
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
        <Pie
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
                text: 'GRÁFICO DE PIZZA - CATEGORIAS'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default PieChart;