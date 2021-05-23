import React from "react";
import { AuthenticatedLayoutComponent } from '../../Components';
import ActivitiesReports from '../../Components/ActivitiesReports'

function DashboardPage() {
  return (
    <AuthenticatedLayoutComponent>
      <h2 className="text-2xl font-bold text-gray-800 my-5">Relatórios</h2>
      <ActivitiesReports/>
    </AuthenticatedLayoutComponent>
  );
}

export default DashboardPage;