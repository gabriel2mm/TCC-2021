import React, { useState, useMemo } from 'react';
import { Tag, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {API} from '../../../Services';
import { useUserContext } from '../../../Contexts';

function TableViewComponent() {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const context = useUserContext();

    const data = useMemo(() => {
        const response = fetchActivities();
        return response;
    }, []);

    async function fetchActivities() {
        setLoading(true);
        try {
          let url = "/api/activities/my-activities";
          if(context.containsPermission("Admin") || context.containsPermission("activities")){
            url = "/api/activities";
          }
          const response = await API().get(url);
          console.log(response);
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
          title: 'Ações',
          dataIndex: 'acoes',
          render: (text, record, i) =>
            <div className="flex flex-row justify-center items-center">
              {context.containsPermission("Admin") || context.containsPermission("read:activities") ? (
              <div className="mx-1">
                <Link to={`/activities/${record.id}`}>
                  Visualizar
                </Link>
              </div>) : (null) }
            </div>
        },
      ]


    async function handleSearch(event) {
        const text = event.target.value;
        data.then(item => {
          if (text && item) {
            const filteredData = item.filter(entry => entry.number.toLowerCase().includes(text.toLowerCase()) || entry.category?.name.toLowerCase().includes(text.toLowerCase()) || entry.status.toLowerCase().includes(text.toLowerCase()) || entry.description.toLowerCase().includes(text.toLowerCase()));
            setDataSource(filteredData);
          } else {
            setDataSource(item);
          }
        }).catch(err => console.log("Não foi possível gerar data"))
      }
    

    return (
        <div className="container px-5">
            <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
                <input onChange={(event) => handleSearch(event)} type="text" name="search" placeholder="Buscar chamado" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <Table rowKey={record => record.id} loading={loading} columns={cols} dataSource={dataSource || []} onRow={(record, rowIndex) => { return { onClick: event => { console.log(record, rowIndex, event) }, } }} />
        </div>
    );
}

export default TableViewComponent;