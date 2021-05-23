import React from "react";
import { Card } from 'antd';

function ActivitiesReports() {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <Card title="Atividades abertas" className="bg-blue-500">
            <p className="flex justify-center text-5xl">50</p>
          </Card>
        </div>
        <div>
          <Card title="Atividades em andamento" className="bg-green-500">
            <p className="flex justify-center text-5xl">60</p>
          </Card>
        </div>
        <div>
          <Card title="Atividades finalizadas no dia" className="bg-yellow-500">
            <p className="flex justify-center text-5xl">70</p>
          </Card>
        </div>
        <div>
          <Card title="Atividades SLA extourado" className="bg-red-500">
            <p className="flex justify-center text-5xl">15</p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ActivitiesReports;