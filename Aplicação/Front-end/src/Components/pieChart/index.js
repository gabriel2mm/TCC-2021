import React, { useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { API } from "../../Services";
import { message } from 'antd';

function PieChart() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getData();
  },[]);

  async function getData() {
    try{  
      const response = await API().get('/api/activities/category-count');
      if(response.status >= 200 && response.status < 300){
        setData(response.data);
      }

    }catch(err){
      message.error("Não foi possível carregar dados de categoria!");
    }
  }

  function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

  return (
    <>
      <div className="mt-8">
        <Pie
          height={400}
          width={400}
          data={{
            labels: data.map(item => item[0]),
            datasets: [
              {
                label: 'Categorias',
                data: data.map(item => item[1]),
                backgroundColor: data.map(item => dynamicColors()),
              }]
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
                text: 'Categorias'
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default PieChart;