import React from "react";
import { AuthenticatedLayoutComponent } from '../../Components';
import ActivitiesReports from '../../Components/ActivitiesReports';
import LineChart from '../../Components/LineChart';

function DashboardPage() {
  return (
    <AuthenticatedLayoutComponent>
      <h2 className="text-2xl font-bold text-gray-800 my-5">Relatórios</h2>
      <ActivitiesReports/>
      <LineChart/>
    </AuthenticatedLayoutComponent>
  );
}

export default DashboardPage;