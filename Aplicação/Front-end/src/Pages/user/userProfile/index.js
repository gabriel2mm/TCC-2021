import React, { useState } from 'react';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Link } from 'react-router-dom';
import { Form } from 'antd';

function MyProfilePage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ firstname: "", lastname: "", email: "" });

    function onChangeText(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <AuthenticatedLayoutComponent>
                <div className="container">
                    <h2 className="text-2xl font-bold text-gray-800 my-5">Meu perfil</h2>
                    <Form form={form} onFinish={() => console.log("Finish")} initialValues={data} scrollToFirstError>
                        <label htmlFor="firstname" className="font-semibold text-gray-600">Primeiro nome:</label>
                        <Form.Item name="firstname" rules={[{ required: true, message: 'Insira o primeiro nome' }]}>
                            <BasicInputComponent name="firstname" type="text" placeholder="Informe o primeiro nome" onChange={e => onChangeText(e)} value={data.firstname} />
                        </Form.Item>
                        <label htmlFor="lastname" className="font-semibold text-gray-600">Sobrenome:</label>
                        <Form.Item name="lastname" rules={[{ required: true, message: 'Insira o sobrenome' }]}>
                            <BasicInputComponent name="lastname" type="text" placeholder="Informe o sobrenome" onChange={e => onChangeText(e)} value={data.lastname} />
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