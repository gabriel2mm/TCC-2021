import React, { useState, useEffect, useMemo } from 'react';
import { AuthenticatedLayoutComponent, ButtonComponent } from '../../Components';
import { Table, Tag, Popconfirm, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import {Link} from 'react-router-dom';


function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [deletedFilter, setDeletedFilter] = useState([]);

  const data = useMemo(() => {
    const response = fetchProfiles();
    return response;
  }, []);

  async function fetchProfiles() {
    setLoading(true);
    const response = await axios.get('https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/profiles');
    if (response.status >= 200 && response.status < 300) {
      setDataSource(response.data || []);
      setLoading(false);
    }

    return response.data;
  }

  const cols = [
    {
      title: 'Perfil',
      dataIndex: 'profile',
      key: 'perfil',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: tag => {
        if (tag === "suspended") {
          return (<Tag className={"text-red-700 bg-red-100 border-0 font-bold rounded-full"}>Suspenso</Tag>)
        }

        return (<Tag className={"text-green-900 bg-green-200 border-0 font-bold rounded-full"}>Ativo</Tag>)
      },
    },
    {
      title: 'Ações',
      dataIndex: 'acoes',
      render: (text, record, i) =>
        <div className="flex flex-row justify-center items-center">
          <div className="mx-1">
            <Link to={`/settings/profiles/${record.id}`}>
              Visualizar
            </Link>
          </div>
          <div className="mx-1">
            <Popconfirm icon={<CloseOutlined />} key={`Delete-${i}`} title={`Deseja excluír o perfil ${record.profile}?`} onConfirm={() => handleDelete(record)}>
              <a href="!#">Deletar</a>
            </Popconfirm>
          </div>
        </div>
    },
  ]

  async function handleDelete(record) {
    try {
      const response = await axios.delete(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/profiles/${record.id}`);
      if (response.status >= 200 && response.status < 300) {
        message.success(`Perfil "${record.profile}" deletado com sucesso!`);
        setDeletedFilter([...deletedFilter, record.profile]);
        fetchProfiles();
      }
    } catch (e) {
      console.log(e);
      message.error(`Não foi possível deletar o perfil "${record.profile}"!`);
    }
  }

  async function handleSearch(event) {
    const text = event.target.value;
    data.then(item => {
      if (text && item) {
        const filteredData = item.filter(entry => entry.profile.toLowerCase().includes(text.toLowerCase()) && !deletedFilter.includes(entry.profile));
        setDataSource(filteredData);
      } else {
        setDataSource(item.filter(entry => !deletedFilter.includes(entry.profile)));
      }
    }).catch(err => console.log("Não foi possível gerar data"))
  }

  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h1 className="text-xl text-gray-800 font-bold">Perfis de acesso</h1>
        <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
          <input onChange={(event) => handleSearch(event)} type="text" name="search" placeholder="Procurar perfil" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors" />
          <ButtonComponent className="order-1 md:order-2 float-left md:float-right mb-4 w-28 md:w-48 ">Novo Perfil</ButtonComponent>
        </div>
        <Table loading={loading} columns={cols} dataSource={dataSource || []} onRow={(record, rowIndex) => { return { onClick: event => { console.log(record, rowIndex, event) }, } }} />
      </div>
    </AuthenticatedLayoutComponent>
  )
}

export default ProfilePage;