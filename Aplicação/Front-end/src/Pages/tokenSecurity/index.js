import React, { useState } from 'react';
import { Form, Table } from 'antd';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../Components';

function TokenSecurityPage() {
    const [data, setData] = useState({})
    const [form] = Form.useForm();

    const cols = [
        {
            title: 'Nome da aplicação',
            dataIndex: 'application',
            key: 'application',
        },
        {
            title: 'Criação',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'token',
        },
    ];

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Integrações</h2>
                <Form form={form} initialValues={data} scrollToFirstError>
                    <label htmlFor="application" className="font-semibold text-gray-600">Nome da aplicação: </label>
                    <Form.Item name="application" type="text">
                        <BasicInputComponent name="application" type="text" placeholder="Informe o nome da aplicação" />
                    </Form.Item>
                    <label htmlFor="key" className="font-semibold text-gray-600">Chave:</label>
                    <Form.Item name="key" type="text">
                        <BasicInputComponent name="key" type="text" placeholder="Informe uma chave de segurança" />
                    </Form.Item>
                    <Form.Item>
                        <ButtonComponent name="save" type="submit">Inserir</ButtonComponent>
                        <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                    </Form.Item>
                </Form>

                <Table rowKey={record => record.id} columns={cols} dataSource={[]} />
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default TokenSecurityPage;