import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { API } from '../../Services'

function DoughnutChartCap() {
  const [data, setData] = useState();
  useEffect(() => {
    async function loadAcitivities() {
      try {
        const response = await API().get('/api/activities/dashboards/capacidades');
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
        }
      } catch (e) {
        console.log("ERROR! ", e);
      }
    }
    loadAcitivities();
  }, [data]);

  console.log("Dados EndPoit Capacidades", data);

  const dataChart = {
    labels: ['Motorista', 'Desenvolvedor', 'Mecânico', 'Eletrônica'],
    datasets: [
      {
        label: 'Categorias',
        data: [40, 60, 10, 5],
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
                text: 'GRÁFICO - CAPACIDADES'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default DoughnutChartCap;