import React from "react";
import { Card } from 'antd';
import './styles.css';

function ActivitiesReportsComponent() {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Card title="Abertas" className="bg-blue-500 rounded-lg shadow-lg mx-2 w-full text-white">
            <p className="flex justify-center text-5xl text-white">50</p>
          </Card>
        </div>
        <div>
          <Card title="Andamento" className="bg-green-500 rounded-lg shadow-lg mx-2 w-full">
            <p className="flex justify-center text-5xl text-white">60</p>
          </Card>
        </div>
        <div>
          <Card title="Finalizadas no dia" className="bg-yellow-500 rounded-lg  shadow-lg mx-2 w-full">
            <p className="flex justify-center text-5xl text-white">70</p>
          </Card>
        </div>
        <div>
          <Card title="Vencidas" className="bg-red-500 rounded-lg shadow-lg mx-2 w-full">
            <p className="flex justify-center text-5xl text-white">15</p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ActivitiesReportsComponent;