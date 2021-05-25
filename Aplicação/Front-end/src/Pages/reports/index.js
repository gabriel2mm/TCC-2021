import React from "react";
import { AuthenticatedLayoutComponent } from '../../Components';
import ActivitiesReports from '../../Components/ActivitiesReports';
import LineChart from '../../Components/LineChart';

function DashboardPage() {
  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Relatórios</h2>
        <ActivitiesReports />
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start lg:flex-row ">
          <div className="w-full md:w-1/2">
            <LineChart />
          </div>
          <div className="w-full md:w-1/2">
            <LineChart />
          </div>
        </div>
      </div>
    </AuthenticatedLayoutComponent>
  );
}

export default DashboardPage;