import React from 'react';
import {Link } from 'react-router-dom';
import { Table, Tag, Popconfirm} from 'antd';
import {CloseOutlined} from "@ant-design/icons";


function UserTableComponent() {


  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      email: 'john.brown@gmail.com',
      cpf: 12345678910,
      password: 'abcd1234',
      tags: ['Dev', 'Mob', 'Web'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      email: 'jim.green@yahoo.com',
      cpf: 12345678911,
      password: 'abcd1234',
      tags: ['sem função'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      email: 'joe.black@outlook.com',
      cpf: 12345678912,
      password: 'abcd1234',
      tags: ['manutenção', 'hardware'],
    },
  ];

  const columns = [
    {
      title: 'Primeiro Nome',
      dataIndex: 'firstName',
      key: 'firstName',
      render: text => <a href="!#">{text}</a>,
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
      title: 'Senha',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Função',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            //EXEMPLO DE ESCOLHA DE COR, DEFINIR MAIS TARDE COMO SERÁ AS TAGS SE TIVER
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'sem função') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, i) => (
        <div className="flex flex-row justify-center items-center">
            <div className="mx-1">
              <Link to={`/settings/users/${record.key}`}>
                Visualizar
              </Link>
            </div>
            <div className="mx-1">
              <Popconfirm icon={<CloseOutlined />} key={`Delete-${i}`} title={`Deseja excluír o perfil ${record.firstName}?`} onConfirm={() => handleDelete(record)}>
                <a href="!#">Deletar</a>
              </Popconfirm>
            </div>
          </div>
      ),
    },
  ];
  
  

  function handleDelete(record){
    console.log(record);
  }
  return (
    <>
     <Table columns={columns} dataSource={data} />
    </>
  )
}

export default UserTableComponent;