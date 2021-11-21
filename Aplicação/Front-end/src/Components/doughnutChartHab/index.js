import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { API } from '../../Services'

function DoughnutChartHab() {
  const [data, setData] = useState();
  useEffect(() => {
    async function loadAcitivities() {
      try {
        const response = await API().get('/api/activities/dashboards/habilidades');
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
        }
      } catch (e) {
        console.log("ERROR! ", e);
      }
    }
    loadAcitivities();
  }, [data]);

  console.log("Dados EndPoit de Habilidades", data);

  const dataChart = {
    labels: ['Mobile', 'Front-end', 'Back-end', 'AWS'],
    datasets: [
      {
        label: 'Categorias',
        data: [3, 10, 8, 15],
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
                text: 'GRÁFICO - HABILIDADES'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default DoughnutChartHab;