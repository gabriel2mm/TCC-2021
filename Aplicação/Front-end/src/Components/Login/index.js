import React from "react";
import {BasicInputComponent, ButtonComponent} from '../../Components';
import { UserOutlined , LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

function LoginComponent() {
  return (
    <>
      <h2 className="text-2xl text-center font-bold text-gray-600 ">Sign-in</h2>
      <form>
        <div className="my-2">
          <label htmlFor="user" className="text-gray-700 font-bold">
            Usuário:
          </label>
          <BasicInputComponent
            type="email"
            name="user"
            icon={<UserOutlined />}
            iconPosition={"left"}
            placeholder="Informe seu usuário"
            className="max-w-screen-md"
          />
        </div>
        <div className="my-2">
          <label htmlFor="password" className="text-gray-700 font-bold">
            Senha:
          </label>
          <BasicInputComponent
            type="password"
            name="password"
            icon={<LockOutlined />}
            iconPosition={"left"}
            placeholder="Informe sua senha"
            className="max-w-screen-md"
          />
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
      </form>
    </>
  );
}

export default LoginComponent;
