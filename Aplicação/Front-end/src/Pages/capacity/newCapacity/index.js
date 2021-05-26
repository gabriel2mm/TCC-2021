import React, { useState } from "react";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, Transfer, message } from 'antd';
import axios from 'axios';

function NewCapacityPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, capacity: "", description: "", status: "ativo", users: [] });
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    async function handleSubmit() {
        console.log(data);
        try {
            const response = await axios.post(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/profiles`, data, {});
            if (response.status >= 200 && response.status < 300) {
                message.success("Capacidade criada com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível criar capacidade!");
        }
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
                <h2 className="text-2xl font-bold text-gray-800 my-5">Nova capacidade</h2>

                <Form form={form} onFinish={handleSubmit} scrollToFirstError>
                    <label htmlFor="capacity" className="font-semibold text-gray-600">Nome da capacidade:</label>
                    <Form.Item name="capacity" type="text" rules={[{ required: true, message: 'Insira o nome da capacidade' }]}>
                        <BasicInputComponent type="text" name="capacity" placeholder="Insira o nome da capacidade" value={data.capacity} onChange={e => changeText(e)} />
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição da capacidade:</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição da capacidade' }]}>
                        <BasicInputComponent type="textarea" name="description" placeholder="Insira a descrição da capacidade" value={data.description} onChange={e => changeText(e)} />
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

export default NewCapacityPage;