import React from "react";
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { BasicInputComponent, ButtonComponent } from '../../Components';
import {Form} from 'antd';

function LoginComponent() {
  const [form] = Form.useForm();

  function handleSubmit(){
    console.log("finish");
  }

  return (
    <>
      <h2 className="mb-7 text-2xl text-center font-bold text-gray-800">Sign-In</h2>
      <Form onFinish={handleSubmit} form={form} scrollToFirstError>
        <div className="my-2">
          <label htmlFor="user" className="text-gray-700 font-bold">Usuário:</label>
          <Form.Item type="email" name="user" rules={[{ type: 'email',message: 'Informe um e-email válido',},{ required: true, message: 'Informe um e-mail',}]}>
            <BasicInputComponent type="email" name="user" icon={<UserOutlined />} iconPosition={"left"} placeholder="Informe seu usuário" className="max-w-screen-md"/>
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="password" className="text-gray-700 font-bold">Senha:</label>
          <Form.Item type="password" name="password" rules={[{required: true, message: "Informe sua senha"}]}>
            <BasicInputComponent type="password" name="password" icon={<LockOutlined />} iconPosition={"left"} placeholder="Informe sua senha" className="max-w-screen-md"/>
          </Form.Item>
        </div>
        <div className="flex lg:flex-row md:flex-col justify-between items-center mb-10 ml-1 mr-1">
          <label className="flex items-center">
            <input type="checkbox" value="true" />
            <span className="ml-2 text-md">Mantenha-me conectado</span>
          </label>
          <Link to="/forgot-password" className="text-purple-700">Esqueci minha senha</Link>
        </div>
          <ButtonComponent type="submit" className="w-full">
            Entrar
          </ButtonComponent>
      </Form>
    </>
  );
}

export default LoginComponent;
