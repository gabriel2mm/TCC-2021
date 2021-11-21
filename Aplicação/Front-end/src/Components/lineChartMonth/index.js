import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { API } from '../../Services'

function LineChartMonth() {
  const [data, setData] = useState();
  useEffect(() => {
    async function loadAcitivities() {
      try {
        const response = await API().get('/api/activities/dashboards/mes');
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
        }
      } catch (e) {
        console.log("ERROR! ", e);
      }
    }
    loadAcitivities();
  }, [data]);

  console.log("Dados do EndPoit", data);

  const dataChart = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
             '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
             '25', '26', '27', '28', '29', '30'],
    datasets: [
      {
        label: '# atividades abertas',
        data: [1, 5, 10, 15, 20, 25, 28, 22, 17, 12, 7, 3, 6, 10, 16, 1, 5, 10, 15,
            20, 25, 28, 22, 17, 0, 0, 0, 0, 0, 0],
        borderColor: ['blue'],
        backgroundColor: ['blue'],
      },
      {
        label: '# atividades em andamento',
        data: [3, 8, 13, 18, 23, 28, 31, 25, 20, 15, 10, 6, 10, 20, 22, 3, 8, 13, 18,
            23, 28, 31, 25, 20, 0, 0, 0, 0, 0, 0],
        borderColor: ['green'],
        backgroundColor: ['green'],
      },
      {
        label: '# atividades finalizadas no dia',
        data: [1, 10, 8, 5, 2, 15, 28, 30, 10, 12, 10, 8, 14, 19, 22, 1, 10, 8, 5, 2, 
            15, 28, 30, 10, 0, 0, 0, 0, 0, 0],
        borderColor: ['orange'],
        backgroundColor: ['orange'],
      },
      {
        label: '# atividades SLA extourado',
        data: [1, 2, 3, 4, 5, 10, 9, 8, 7, 6, 15, 2, 13, 14, 29, 1, 2, 3, 4, 5, 10, 9, 
            8, 7, 0, 0, 0, 0, 0, 0],
        borderColor: ['red'],
        backgroundColor: ['red'],
      },
    ]
  };
  return (
    <>
      <div className="mt-8">
        <Line
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
                text: 'ATIVIDADES NOVEMBRO 2021'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default LineChartMonth;