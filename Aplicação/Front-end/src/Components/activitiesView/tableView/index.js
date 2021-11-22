import React, { useState, useMemo, useEffect } from 'react';
import { Tag, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { API } from '../../../Services';
import { useGroupSelectContext, useUserContext } from '../../../Contexts';

function TableViewComponent() {
  const [dataSource, setDataSource] = useState([]);
  const context = useUserContext();
  const contextGroups = useGroupSelectContext();

  useEffect(() => {
    setDataSource(contextGroups.activities)
  }, [contextGroups])

  async function handleSearch(event) {
    const text = event.target.value;
    if (text) {
      const filteredData = dataSource.filter(entry => entry.number.toLowerCase().includes(text.toLowerCase()) || entry.category?.name.toLowerCase().includes(text.toLowerCase()) || entry.status.toLowerCase().includes(text.toLowerCase()) || entry.description.toLowerCase().includes(text.toLowerCase()));
      setDataSource(filteredData);
    } else {
      setDataSource(contextGroups.activities);
    }
  }

  const cols = [
    {
      title: 'Chamado',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      responsive: ['md'],
      render: (text, record, i) => <span key={i}>{record.category?.name}</span>
    },
    {
      title: 'Criado em',
      dataIndex: 'created',
      key: 'created',
      render: (text, record, i) => <span key={i}>{moment(record.created).format('DD/MM/YYYY HH:mm')}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: tag => <Tag>{tag}</Tag>
    },
    {
      title: 'Usuário',
      dataIndex: 'user',
      key: 'user',
      render: (text, record, i) => <span key={i}>{record.assigned?.email}</span>
    },
    {
      title: 'Ações',
      dataIndex: 'acoes',
      render: (text, record, i) =>
        <div className="flex flex-row justify-center items-center">
          {context.containsPermission("Admin") || context.containsPermission("read:activities") ? (
            <div className="mx-1">
              <Link to={`/activities/${record.id}`}>
                Visualizar
              </Link>
            </div>) : (null)}
        </div>
    },
  ]


  return (
    <div className="container px-5">
      <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
        <input onChange={(event) => handleSearch(event)} type="text" name="search" placeholder="Buscar chamado" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
      </div>
      <Table rowKey={record => record.id} columns={cols} dataSource={dataSource || []} />
    </div>
  );
}

export default TableViewComponent;