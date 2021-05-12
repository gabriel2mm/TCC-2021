import React from "react";
import { Link } from 'react-router-dom';
import { BasicInputComponent, ButtonComponent } from '../../Components';
import { Form } from 'antd';


function UserFormComponent() {

    function onFinish(values) {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 my-5">Novo usuário</h2>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item className="w-full form-control" type="text" name="firstUserName" rules={[{ required: true, message: 'Insira o nome do Usuário' }]}>
                    <label htmlFor="firstUserName" className="font-semibold text-gray-600">Nome:</label>
                    <BasicInputComponent name="firstUserName" placeholder="Informe o primeiro nome do usuário" />
                </Form.Item>

                <Form.Item className="w-full form-control" type="text" name="lastUserName" rules={[{ required: true, message: 'Insira o último nome do Usuário' }]}>
                    <label htmlFor="lastUserName" className="font-semibold text-gray-600">Sobrenome: </label>
                    <BasicInputComponent name="lastUserName" placeholder="Inform o sobrenome do usuário" />
                </Form.Item>
                <Form.Item className="w-full form-control" type="email" name="userEmail" rules={[{ required: true, message: 'Insira o e-mail do Usuário' }]}>
                    <label htmlFor="userEmail" className="font-semibold text-gray-600">Email:</label>
                    <BasicInputComponent name="userEmail" placeholder="Informe um email válido" />
                </Form.Item>
                <Form.Item className="w-full form-control" type="number" name="userCpf" rules={[{ required: true, message: 'Insira o CPF do Usuário' }]}>
                    <label htmlFor="userCpf" className="font-semibold text-gray-600">CPF:</label>
                    <BasicInputComponent name="userCpf" placeholder="Informe um CPF Válido. EX: 00000000056" />
                </Form.Item>
                <Form.Item className="w-full form-control" type="password" name="userPassword" rules={[{ required: true, message: 'Insira a senha do Usuário' }]} >
                    <label htmlFor="userPassword" className="font-semibold text-gray-600">Senha:</label>
                    <BasicInputComponent name="userPassword" type="password" />
                </Form.Item>
                <Form.Item className="w-full form-control" type="password" name="confimrPassword" rules={[{ required: true, message: 'Insira a senha do Usuário' }]} >
                    <label htmlFor="confimrPassword" className="font-semibold text-gray-600">Confirmar senha:</label>
                    <BasicInputComponent name="confimrPassword" type="password" />
                </Form.Item>
                <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                <Link to="/settings/users" className="ml-5 text-blue-500">Cancelar</Link>
            </Form>
        </>
    );
}

export default UserFormComponent;