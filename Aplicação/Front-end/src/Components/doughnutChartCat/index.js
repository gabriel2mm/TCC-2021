import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { API } from '../../Services'

function DoughnutChartCat() {
  const [data, setData] = useState();
  useEffect(() => {
    async function loadAcitivities() {
      try {
        const response = await API().get('/api/activities/dashboards/categorias');
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
        }
      } catch (e) {
        console.log("ERROR! ", e);
      }
    }
    loadAcitivities();
  }, [data]);

  console.log("Dados EndPoit Categorias", data);

  const dataChart = {
    labels: ['Software', 'Hardware', 'Infra', 'Apoio'],
    datasets: [
      {
        label: 'Categorias',
        data: [30, 5, 15, 10],
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
                text: 'GRÁFICO - CATEGORIAS'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default DoughnutChartCat;