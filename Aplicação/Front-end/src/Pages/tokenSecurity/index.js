import React, { useState, useEffect } from 'react';
import { Form, Table, message, Tooltip, Popconfirm } from 'antd';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../Components';
import {API} from '../../Services';
import { CopyOutlined, CloseOutlined } from '@ant-design/icons';

function TokenSecurityPage() {
    const [data, setData] = useState('')
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();

    const cols = [
        {
            title: 'Nome da aplicação',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Criação',
            dataIndex: 'created',
            key: 'created',
            render: (text, record) => {
                const date = new Date(text);
                const dateFormat = ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();; 

                return <span>{dateFormat}</span>
            }
        },
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'token',
            render: (text, record) => {
                return <>
                    <Tooltip title="Clique para copiar o token">
                        <CopyOutlined onClick={() => {navigator.clipboard.writeText(text)}} style={{marginRight : 15, marginTop: "-15"}} />
                    </Tooltip>
                    <span onClick={() => {navigator.clipboard.writeText(text)}}>{text.substr(0,15)}</span>
                </>
            }
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record , i) => (
                <div className="flex flex-row justify-center items-center">
                        <div className="mx-1">
                            <Popconfirm icon={<CloseOutlined />} key={`Delete-${i}`} title={`Deseja excluír o perfil ${record.name}?`} onConfirm={() => handleDelete(record.id)}>
                            <a href="!#">Deletar</a>
                            </Popconfirm>
                        </div>
                </div>
            )
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(){
        try{
            const response = await API().get("/api/tokens");
            if(response.status >= 200 && response.status < 300){
                setDataSource(response.data);
            }
        }catch(e){
            message.error("Não foi possível carregar os dados!");
        } 
    }

    async function handleSubmit(){
        try{
            const response = await API().post("/api/tokens", {name: data});
            if(response.status >= 200 && response.status < 300){
                message.success("Token criado com sucesso!");
                fetchData();
                setData('');
            }
        }catch(e){
            message.error("Não foi possível criar o token!");
        }
    }

    async function handleDelete(id){
        try{
            const response = await API().delete("/api/tokens/" + id);
            if(response.status >= 200 && response.status < 300){
                message.success("Token excluído com sucesso!");
                fetchData();
            }
        }catch(e){
            message.error("Não foi possível excluir o token!");
        }
    }
    
    function setName(e){
        setData(e.target.value);
    }

    

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Integrações</h2>
                <Form onFinish={handleSubmit} form={form} initialValues={data} scrollToFirstError>
                    <label htmlFor="application" className="font-semibold text-gray-600">Nome da aplicação: </label>
                    <Form.Item name="application" type="text">
                        <BasicInputComponent name="application" type="text" placeholder="Informe o nome da aplicação" value={data} onChange={e => setName(e)}/>
                    </Form.Item>
                    <Form.Item>
                        <ButtonComponent name="save" type="submit">Inserir</ButtonComponent>
                        <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                    </Form.Item>
                </Form>

                <Table rowKey={record => record.id} columns={cols} dataSource={dataSource} />
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default TokenSecurityPage;