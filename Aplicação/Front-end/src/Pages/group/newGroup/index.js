import React, { useState } from "react";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, Transfer } from 'antd';

function NewGroupPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, group: "", description: "", status: "ativo", users: [] });
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    function handleSubmit() {
        console.log("finish")
    }

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function onChange(nextTargetKeys, direction, moveKeys) {
        setTargetKeys(nextTargetKeys);
    };

    function onSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo grupo</h2>

                <Form form={form} onFinish={handleSubmit} scrollToFirstError>
                    <label htmlFor="group" className="font-semibold text-gray-600">Nome do grupo:</label>
                    <Form.Item name="group" type="text" rules={[{ required: true, message: 'Insira o nome do grupo' }]}>
                        <BasicInputComponent type="text" name="group" placeholder="Insira o nome do grupo" value={data.group} onChange={e => changeText(e)} />
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição do grupo:</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição do grupo' }]}>
                        <BasicInputComponent type="textarea" name="description" placeholder="Insira a descrição do grupo" value={data.description} onChange={e => changeText(e)} />
                    </Form.Item>
                    <Divider />
                    <label htmlFor="description" className="font-semibold text-gray-600">Selecionar usuários:</label>
                    <Form.Item>
                    <Transfer
                        dataSource={data.users}
                        titles={['Usuários', 'Usuários selecionados']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        render={item => console.log(item)}
                    />
                    </Form.Item>
                    <ButtonComponent type="submit">Salvar</ButtonComponent>
                    <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default NewGroupPage;