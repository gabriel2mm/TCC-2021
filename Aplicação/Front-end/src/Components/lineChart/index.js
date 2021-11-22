import React, { useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { API } from "../../Services";
import { message, Spin } from 'antd';

function LineChart() {
  const [data, setData] = React.useState({});
  const mouths = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const [labels, setLabels] = React.useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      data.map(item => {
        item.map(subItem => {
          const mouth = subItem[1];
          const year = subItem[2];
          if (!labels.includes(`${mouths[mouth - 1]}/${year}`)) {
            setLabels(labels => [...labels, `${mouths[mouth - 1]}/${year}`]);
          }
        })
      })
    }

  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await API().get('/api/activities/history-activities');
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
      }

    } catch (err) {
      message.error("Não foi possível carregar dados de categoria!");
    }
  }

  return (
    data && data.length > 0 ? (
      <>
        <div className="mt-8">
          <Line
            height={400}
            width={400}
            data={{
              labels: labels,
              datasets: [
                {
                  label: '# atividades finalizadas',
                  data: data[0].map(item => item[0]),
                  borderColor: ['orange'],
                  backgroundColor: ['orange'],
                },
                {
                  label: '# atividades finalizadas com atraso',
                  data: data[1].map(item => item[0]),
                  borderColor: ['red'],
                  backgroundColor: ['red'],
                },
              ]
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Histórico atividades'
                }
              }
            }}
          />
        </div>
      </>
    ) : (<Spin />)

  );
}

export default LineChart;