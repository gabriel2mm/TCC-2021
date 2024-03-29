import React from "react";
import { Bar } from 'react-chartjs-2';

function BarChart() {
  const dataChart = {
    labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
    datasets: [
      {
        label: '# atividades abertas',
        data: [1, 5, 10, 15, 20, 25, 28, 22, 17, 12, 7, 3],
        borderColor: ['blue'],
        backgroundColor: ['blue'],
      },
      {
        label: '# atividades em andamento',
        data: [3, 8, 13, 18, 23, 28, 31, 25, 20, 15, 10, 6],
        borderColor: ['green'],
        backgroundColor: ['green'],
      },
      {
        label: '# atividades finalizadas no dia',
        data: [1, 10, 8, 5, 2, 15, 28, 30, 10, 12, 10, 8],
        borderColor: ['orange'],
        backgroundColor: ['orange'],
      },
      {
        label: '# atividades SLA extourado',
        data: [1, 2, 3, 4, 5, 10, 9, 8, 7, 6, 15, 2],
        borderColor: ['red'],
        backgroundColor: ['red'],
      },
    ]
  };
  return (
    <>
      <div className="mt-8">
        <Bar
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
                text: 'GRÁFICO DE BARRAS'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default BarChart;