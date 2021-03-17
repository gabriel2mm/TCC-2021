import React from 'react';
import { HeaderComponent, NavMenuComponent, FooterComponent, BreadCrumbComponent } from '../Components';
function LoginPage() {
  return (
    <>
      <HeaderComponent>
        <NavMenuComponent />
      </HeaderComponent>
      <BreadCrumbComponent />
      <FooterComponent />
    </>
  );
}

export default LoginPage;