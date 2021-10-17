import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { BasicInputComponent, ButtonComponent } from '..';
import {Form, message} from 'antd';
import { useHistory } from "react-router-dom"
import { useUserContext } from "../../Contexts";

function LoginComponent() {
  const  history = useHistory();
  const [form] = Form.useForm();
  const context = useUserContext();
  const [data, setData] = useState({email: null , password: null, persistConnection: true});

  async function handleSubmit(){
    console.log(data.persistConnection);
    const login = await context.signIn(data.email, data.password, data.persistConnection);
    if(login){
      history.push("/")
    }else{
      message.error("E-mail ou senha inválidos! Tente novamente.");
    }
  }

  function onChangeText(event){
    setData({...data, [event.target.name] : event.target.value});
  }

  function persistConnection(e){
    setData({...data, persistConnection : e.target.checked});
  }

  return (
    <>
      <h2 className="mb-7 text-2xl text-center font-bold text-gray-800">Sign-In</h2>
      <Form onFinish={handleSubmit} form={form} scrollToFirstError>
        <div className="my-2">
          <label htmlFor="email" className="text-gray-700 font-bold">Usuário:</label>
          <Form.Item type="email" name="email" rules={[{ type: 'email',message: 'Informe um e-email válido',},{ required: true, message: 'Informe um e-mail',}]}>
            <BasicInputComponent onChange={e => onChangeText(e)} value={data.email} type="email" name="email" icon={<UserOutlined />} iconPosition={"left"} placeholder="Informe seu usuário" className="max-w-screen-md"/>
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="password" className="text-gray-700 font-bold">Senha:</label>
          <Form.Item type="password" name="password" rules={[{required: true, message: "Informe sua senha"}]}>
            <BasicInputComponent onChange={e => onChangeText(e)} value={data.password} type="password" name="password" icon={<LockOutlined />} iconPosition={"left"} placeholder="Informe sua senha" className="max-w-screen-md"/>
          </Form.Item>
        </div>
        <div className="flex lg:flex-row md:flex-col justify-between items-center mb-10 ml-1 mr-1">
          <label className="flex items-center">
            <input type="checkbox" onChange={e => persistConnection(e)} checked={data.persistConnection} />
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
