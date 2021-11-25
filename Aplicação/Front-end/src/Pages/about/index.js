import React from 'react';
import { AuthenticatedLayoutComponent } from '../../Components';
import { Divider, List } from 'antd';

function AboutPage() {
  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5 ">Sobre</h2>
        <Divider />
        <h3 className="text-2xl font-bold text-gray-800">Field Service Cloud</h3>
        <span className="text-gray-600 font-thin">Projeto desenvolvido para TCC da universidade positivo</span>
        <span className="text-gray-600 clearfix">Versão 1.0.0</span>
        <span className="text-gray-600 clearfix">Lançamento 2021</span>
        <Divider />
        <label className="font-semibold text-gray-600">Integrantes</label>
        <List>
          
          <List.Item>
            <label className="font-semibold text-gray-600">Adriano Carvalho • <a href="https:github.com/gabriel2mm/TCC-2021">Github</a></label>
            <label className="font-semibold text-gray-600">Alexssandre José • <a href="https:github.com/gabriel2mm/TCC-2021">Github</a></label>
            <label className="font-semibold text-gray-600">David Arcari • <a href="https:github.com/gabriel2mm/TCC-2021">Github</a></label>
            <label className="font-semibold text-gray-600">Gabriel Moré Maia • <a href="https:github.com/gabriel2mm/TCC-2021">Github</a></label>
            <label className="font-semibold text-gray-600">Juliano Henrrique • <a href="https:github.com/gabriel2mm/TCC-2021">Github</a></label>
          </List.Item>
        </List>
      </div>
    </AuthenticatedLayoutComponent>
  );
}

export default AboutPage;