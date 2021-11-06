import React, { useState, useMemo } from 'react';
import { AuthenticatedLayoutComponent, ButtonComponent } from '../../Components';
import { Table, Tag, Popconfirm, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { API } from '../../Services';


function SLAPage() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [deletedFilter, setDeletedFilter] = useState([]);

  const data = useMemo(() => {
    const response = fetchProfiles();
    return response;
  }, []);

  async function fetchProfiles() {
    setLoading(true);
    try {
      const response = await API().get('/api/slas');
      if (response.status >= 200 && response.status < 300) {
        setDataSource(response.data || []);
        setLoading(false);
      }
      return response.data;

    } catch (e) {
      message.error("Não foi possível carregar os dados!");
      setDataSource([]);
      setLoading(false);
    }

    return [];
  }

  const cols = [
    {
      title: 'Acordo',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
    },
    {
      title: 'Prazo',
      dataIndex: 'time',
      key: 'time',
      render: (text, record, i) => <span key={`prazo-${i}`}>{record.time} {record.unity}</span>
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: tag =>
        !tag? (<Tag className={"text-red-700 bg-red-100 border-0 font-bold rounded-full"}>Suspenso</Tag>) : (<Tag className={"text-green-900 bg-green-200 border-0 font-bold rounded-full"}>Ativo</Tag>)
    },
    {
      title: 'Ações',
      dataIndex: 'acoes',
      render: (text, record, i) =>
        <div className="flex flex-row justify-center items-center">
          <div className="mx-1">
            <Link to={`/settings/sla/${record.id}`}>
              Visualizar
            </Link>
          </div>
          <div className="mx-1">
            <Popconfirm icon={<CloseOutlined />} key={`Delete-${i}`} title={`Deseja excluír o acordo ${record.name}?`} onConfirm={() => handleDelete(record)}>
              <a href="!#">Deletar</a>
            </Popconfirm>
          </div>
        </div>
    },
  ]

  async function handleDelete(record) {
    try {
      const response = await API().delete(`/api/slas/${record.id}`);
      if (response.status >= 200 && response.status < 300) {
        message.success(`acordo "${record.name}" deletado com sucesso!`);
        setDeletedFilter([...deletedFilter, record.name]);
        fetchProfiles();
      }
    } catch (e) {
      console.log(e);
      message.error(`Não foi possível deletar o acordo "${record.name}"!`);
    }
  }

  async function handleSearch(event) {
    const text = event.target.value;
    data.then(item => {
      if (text && item) {
        const filteredData = item.filter(entry => entry.name.toLowerCase().includes(text.toLowerCase()) && !deletedFilter.includes(entry.name));
        setDataSource(filteredData);
      } else {
        setDataSource(item.filter(entry => !deletedFilter.includes(entry.name)));
      }
    }).catch(err => console.log("Não foi possível gerar data"))
  }

  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Acordo de Nível de Serviço</h2>
        <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
          <input onChange={(event) => handleSearch(event)} type="text" name="search" placeholder="Buscar acordo" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
          <Link to="/settings/sla/new" className="order-1 md:order-2">
            <ButtonComponent className="float-left md:float-right mb-4 w-28 md:w-48 ">Novo acordo</ButtonComponent>
          </Link>
        </div>
        <Table rowKey={record => record.id} loading={loading} columns={cols} dataSource={dataSource || []} onRow={(record, rowIndex) => { return { onClick: event => { console.log(record, rowIndex, event) }, } }} />
      </div>
    </AuthenticatedLayoutComponent>
  )
}

export default SLAPage;