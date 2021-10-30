import React, { useEffect, useState } from 'react';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Link } from 'react-router-dom';
import { Form, message } from 'antd';
import { API } from '../../../Services';

function MyProfilePage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, firstName: "", lastName: "", email: "" });

    useEffect(() => {
        async function fetchMyData(){
            try{
                const response = await API().get('/api/users/my-user');
                if(response.status >= 200 && response.status < 300){
                    setData(response.data);
                    form.resetFields();
                }
            }catch(e){
                message.error("Não foi possível carregar seus dados!");
            }
        }

        fetchMyData();
        
    }, []);

    function onChangeText(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleFisnish(){
        try{
            const response = await API().put(`/api/users/${data.id}`, data);
            if(response.status >= 200 && response.status < 300){
                message.success("Dados atualizados com sucesso!");
            }
        }catch(e){
            message.error("Não foi possível salvar seus dados!");
        }
    }

    return (
        <div>
            <AuthenticatedLayoutComponent>
                <div className="container">
                    <h2 className="text-2xl font-bold text-gray-800 my-5">Meu perfil</h2>
                    <Form form={form} onFinish={handleFisnish} initialValues={data} scrollToFirstError>
                        <label htmlFor="firstName" className="font-semibold text-gray-600">Primeiro nome:</label>
                        <Form.Item name="firstName" rules={[{ required: true, message: 'Insira o primeiro nome' }]}>
                            <BasicInputComponent name="firstName" type="text" placeholder="Informe o primeiro nome" onChange={e => onChangeText(e)} value={data.firstName} />
                        </Form.Item>
                        <label htmlFor="lastName" className="font-semibold text-gray-600">Sobrenome:</label>
                        <Form.Item name="lastName" rules={[{ required: true, message: 'Insira o sobrenome' }]}>
                            <BasicInputComponent name="lastName" type="text" placeholder="Informe o sobrenome" onChange={e => onChangeText(e)} value={data.lastName} />
                        </Form.Item>
                        <label htmlFor="email" className="font-semibold text-gray-600">Email:</label>
                        <Form.Item name="email" rules={[{ type: 'email', message: 'Insira um e-mail válido!' }, { required: true, message: 'Insira o e-mail' }]}>
                            <BasicInputComponent name="email" type="email" placeholder="Informe o seu email" onChange={e => onChangeText(e)} value={data.email} />
                        </Form.Item>

                        <Form.Item>
                            <Link to="/settings/change-password" className="text-blue-500 block mb-5">Alterar senha</Link>

                            <ButtonComponent>Salvar</ButtonComponent>
                            <span onClick={(e) => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                        </Form.Item>
                    </Form>
                </div>
            </AuthenticatedLayoutComponent>
        </div>
    )
}

export default MyProfilePage;