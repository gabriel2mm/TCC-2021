import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag, Popconfirm, message} from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import { ButtonComponent } from '../../Components';
import { API } from '../../Services/index';
import { useUserContext } from '../../Contexts';


function UserTableComponent() {

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [deletedFilter, setDeletedFilter] = useState([]);
  const context = useUserContext();

  const data = useMemo(() => {
    const response = fetchUsers();
    return response;
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await API().get('/api/users');
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

  async function handleSearch(event) {
    const text = event.target.value;
    data.then(item => {
      if (text && item) {
        const filteredData = item.filter(entry => (entry.email.toLowerCase().includes(text.toLowerCase()) 
              || entry.firstName.toLowerCase().includes(text.toLowerCase()) 
              || entry.lastName.toLowerCase().includes(text.toLowerCase())
              || entry.cpf.toLowerCase().includes(text.toLowerCase()))
              && !deletedFilter.includes(entry.email));
        setDataSource(filteredData);
      } else {
        setDataSource(item.filter(entry => !deletedFilter.includes(entry.email)));
      }
    }).catch(err => console.log("Não foi possível gerar data"))
  }


  async function handleDelete(record) {
    try {
      const response = await API().delete(`/api/users/${record.id}`);
      if (response.status >= 200 && response.status < 300) {
        message.success(`Usuário "${record.firstName} ${record.lastName}" deletado com sucesso!`);
        setDeletedFilter([...deletedFilter, record.email]);
        fetchUsers();
      }
    } catch (e) {
      console.log(e);
      message.error(`Não foi possível deletar o perfil "${record.name}"!`);
    }
  }

  const columns = [
    {
      title: 'Primeiro Nome',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Último Nome',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'E-Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: tag => {
        if (!tag) {
          return (<Tag className={"text-red-700 bg-red-100 border-0 font-bold rounded-full"}>Suspenso</Tag>)
        }

        return (<Tag className={"text-green-900 bg-green-200 border-0 font-bold rounded-full"}>Ativo</Tag>)
      },
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record, i) => (
        <div className="flex flex-row justify-center items-center">
          <div className="mx-1">
            <Link to={`/settings/users/${record.id}`}>
              Visualizar
            </Link>
          </div>

          {context.containsPermission("Admin") || context.containsPermission("write:user")? (
            <div className="mx-1">
            <Popconfirm icon={<CloseOutlined />} key={`Delete-${i}`} title={`Deseja excluír o perfil ${record.firstName}?`} onConfirm={() => handleDelete(record)}>
              <a href="!#">Deletar</a>
            </Popconfirm>
            </div>
          ) : null }
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
        <input type="text" name="search" onChange={e => handleSearch(e)} placeholder="Buscar usuário" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
        <Link to="/settings/users/new" className="order-1 md:order-2">
        {context.containsPermission("Admin") || context.containsPermission("write:user") ? (<ButtonComponent className="float-left md:float-right mb-4 w-28 md:w-48 ">Novo Usuário</ButtonComponent>) : (null)}
        </Link>
      </div>
      <Table rowKey={record => record.id} columns={columns} dataSource={dataSource || []} loading={loading} />
    </>
  )
}

export default UserTableComponent;