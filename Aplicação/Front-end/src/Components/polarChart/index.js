import React from "react";
import { PolarArea } from 'react-chartjs-2';

function PolarChart() {
  const dataChart = {
    labels: ['Motorista', 'Desenvolvedor', 'Mecânico', 'Eletrônica'],
    datasets: [
      {
        label: 'Capacidades',
        data: [10, 20, 30, 40],
        backgroundColor: ['blue', 'red', 'green', 'orange'],
      },
    ]
  };
  return (
    <>
      <div className="mt-8">
        <PolarArea
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
                text: 'GRÁFICO POLAR - CAPACIDADES'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default PolarChart;