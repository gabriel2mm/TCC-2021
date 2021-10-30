import React, { useState, useEffect } from "react";
import { BasicInputComponent, ButtonComponent } from '../../../Components/index';
import { Form, message, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { API } from "../../../Services";
import { useParams } from 'react-router-dom';
import {AuthenticatedLayoutComponent} from '../../../Components';

function UserDetailsPage() {
    const params = useParams();
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: params.id, firstName: "", lastName: "", email: "", cpf: "", password: "" , active: false });


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await API().get(`/api/users/${params.id}`);
                setData(response.data);
                form.resetFields();
            } catch (e) {
                message.error("Não foi possível carregar usuário!");
            }
        }
        fetchData();
    }, [form, params.id]);

    async function onFinish() {
        try {
            const response = await API().put(`/api/users/${params.id}`, data);
            if (response.status >= 200 && response.status < 300) {
                setData({ id: null, firstName: "", lastName: "", email: "", cpf: "", password: "" });
                message.success('Usuário cadastrado com sucesso!');
            }
        } catch (e) {
            message.error('Erro ao cadastrar usuário! ');
        }
    };

    function handleChangeText(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function toggleActive(e){
        setData({ ...data, active: e });
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Visualizar usuário</h2>
                <Form onFinish={onFinish} initialValues={data} form={form} scrollToFirstError>
                    <label htmlFor="firstName" className="font-semibold text-gray-600">Nome:</label>
                    <Form.Item className="w-full form-control" type="text" name="firstName" rules={[{ required: true, message: 'Insira o nome do Usuário' }]}>
                        <BasicInputComponent name="firstName" placeholder="Informe o primeiro nome do usuário" onChange={e => handleChangeText(e)} value={data.firstName} />
                    </Form.Item>
                    <label htmlFor="lastName" className="font-semibold text-gray-600">Sobrenome: </label>
                    <Form.Item className="w-full form-control" type="text" name="lastName" rules={[{ required: true, message: 'Insira o último nome do Usuário' }]}>
                        <BasicInputComponent name="lastName" placeholder="Informe o sobrenome do usuário" onChange={e => handleChangeText(e)} value={data.lastName} />
                    </Form.Item>
                    <label htmlFor="email" className="font-semibold text-gray-600">Email:</label>
                    <Form.Item className="w-full form-control" type="email" name="email" rules={[{ required: true, message: 'Insira o e-mail do Usuário' }]}>
                        <BasicInputComponent name="email" placeholder="Informe um email válido" onChange={e => handleChangeText(e)} value={data.email} />
                    </Form.Item>
                    <label htmlFor="cpf" className="font-semibold text-gray-600">CPF:</label>
                    <Form.Item className="w-full form-control" type="number" name="cpf" rules={[{ required: true, message: 'Insira o CPF do Usuário' }]}>
                        <BasicInputComponent name="cpf" placeholder="Informe um CPF Válido. EX: 00000000056" onChange={e => handleChangeText(e)} value={data.cpf} />
                    </Form.Item>
                    <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">Ativo? </label>
                    <Form.Item>
                        <Switch checked={data.active} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                    </Form.Item>
                    <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                    <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default UserDetailsPage;