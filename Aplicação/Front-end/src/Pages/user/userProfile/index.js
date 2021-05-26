import React, { useState } from 'react';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Link } from 'react-router-dom';
import { Form } from 'antd';

function MyProfilePage() {
    const [myprofile, setMyprofile] = useState({});

    function onChangeText(e) {
        setMyprofile({ ...myprofile, [e.target.name]: e.target.value });
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Meu perfil</h2>
                <Form>
                    <Form.Item name="firstname" type="text" rules={[{ required: true, message: 'Insira o primeiro nome' }]}>
                        <label htmlFor="firstname" className="font-semibold text-gray-600">Primeiro nome:</label>
                        <BasicInputComponent name="firstname" type="text" placeholder="Informe o primeiro nome" onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <Form.Item name="lastname" type="text" rules={[{ required: true, message: 'Insira o sobrenome' }]}>
                        <label htmlFor="lastname" className="font-semibold text-gray-600">Sobrenome:</label>
                        <BasicInputComponent name="lastname" type="text" placeholder="Informe o sobrenome" onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <Form.Item name="email" type="email" rules={[{type: 'email',message: 'Insira um e-mail válido!',},{required: true,message: 'Insira o e-mail',},]}>
                        <label htmlFor="email" className="font-semibold text-gray-600">Email:</label>
                        <BasicInputComponent name="email" type="email" placeholder="Informe o seu email" onChange={e => onChangeText(e)} />
                    </Form.Item>

                    <Link to="/settings/change-password" className="text-blue-500 block mb-5">Alterar senha</Link>

                    <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                    <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    )
}

export default MyProfilePage;