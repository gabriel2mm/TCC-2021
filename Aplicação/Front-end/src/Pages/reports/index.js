import React from "react";
import {
  AuthenticatedLayoutComponent,
  ActivitiesReportsComponent,
  LineChartComponent,
  BarChart,
  PieChart,
  DoughnutChart,
  PolarArea,
  RadarChart
} from '../../Components';


function DashboardPage() {
  return (
    <AuthenticatedLayoutComponent>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Dashboard</h2>
        <div className="flex flex-row justify-center items-center content-center">
          <ActivitiesReportsComponent />
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start lg:flex-row ">
          <div className="w-full"> <LineChartComponent /></div>
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start lg:flex-row ">
          <div className="w-full md:w-1/2">
            <PieChart />
          </div>
          <div className="w-full md:w-1/2">
            <DoughnutChart />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start lg:flex-row ">
          <div className="w-full md:w-1/2">
            <PolarArea />
          </div>
        </div>
      </div>
    </AuthenticatedLayoutComponent>
  );
}

export default DashboardPage;