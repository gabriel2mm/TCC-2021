import React from 'react';
import { AuthenticatedLayoutComponent } from '../../Components';

function AboutPage() {
  return (
    <AuthenticatedLayoutComponent>
      <div className="w-full lg:w-1/2 mx-auto p-10 bg-white rounded-2xl shadow-md flex flex-col justify-items-center">

        <h2 className="text-2xl font-bold text-gray-800 my-5 ">Sobre</h2>
        <h3 className="text-2xl font-bold text-center text-gray-800">Field Service Cloud</h3>
        <span className="text-gray-600 text-center">Versão 1.0.0</span>
        <span className="text-gray-600 text-center">Lançamento 2021</span>
      </div>
    </AuthenticatedLayoutComponent>
  );
}

export default AboutPage;