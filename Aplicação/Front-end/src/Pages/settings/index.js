import React from 'react';
import {AuthenticatedLayoutComponent} from '../../Components';
import {SettingsComponent} from '../../Components';
import { dataSource } from '../../Components/Settings/dataSource';



function SettingsPage() {

  return (
      <AuthenticatedLayoutComponent>
          <SettingsComponent dataSource={dataSource}/>
      </AuthenticatedLayoutComponent>
  );
}

export default SettingsPage;