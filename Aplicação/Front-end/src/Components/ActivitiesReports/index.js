import React, { useEffect } from "react";
import { Card, message } from 'antd';
import './styles.css';
import { API } from "../../Services";

function ActivitiesReports() {

  const [data, setData] = React.useState([]);

  useEffect(() => {loadData()}, []);

  async function loadData() {
    try{
      const response = await API().get('/api/activities/status');
      if(response.status >= 200 && response.status < 300){
        setData(response.data);
      }
    }catch(e){
      console.log(e);
      message.error("Não foi possível carregar dados do dashboard!");
    }
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Card title="Abertas" className="bg-blue-500 rounded-lg shadow-lg mx-2 w-full text-white">
            <p className="flex justify-center text-5xl text-white">{data[0] || '0'}</p>
          </Card>
        </div>
        <div>
          <Card title="Andamento" className="bg-green-500 rounded-lg shadow-lg mx-2 w-full">
            <p className="flex justify-center text-5xl text-white">{data[1] || '0'}</p>
          </Card>
        </div>
        <div>
          <Card title="Finalizadas no dia" className="bg-yellow-500 rounded-lg  shadow-lg mx-2 w-full">
            <p className="flex justify-center text-5xl text-white">{data[2] || '0'}</p>
          </Card>
        </div>
        <div>
          <Card title="Vencidas" className="bg-red-500 rounded-lg shadow-lg mx-2 w-full">
            <p className="flex justify-center text-5xl text-white">{data[3] || '0'}</p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ActivitiesReports;