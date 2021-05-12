import React from 'react';
import {BasicInputComponent, ButtonComponent, LoginLayoutComponent} from '../../Components';
import {ArrowLeftOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

function ResetPasswordPage() {
  return (
      <LoginLayoutComponent>
            <div className="flex flex-row items-center">
                <Link to="/" className="flex flex-row items-center text-purple-700 text-lg">
                 <ArrowLeftOutlined className="mr-2"/><span>Voltar</span>
                </Link>
            </div>

            <h2 className="text-2xl text-center font-bold text-gray-800 ">Redefinir senha</h2>
        
            <form>
            <div className="my-2">
                <label htmlFor="password" className="text-gray-700 font-bold">
                    Nova senha:
                </label>
                <BasicInputComponent
                    type="password"
                    name="newPassword"
                    icon={<LockOutlined />}
                    iconPosition={"left"}
                    placeholder="Insira sua nova senha"
                    className="max-w-screen-md"
                />
                </div>
                <div className="my-2">
                <label htmlFor="password" className="text-gray-700 font-bold">
                    Confirmar senha:
                </label>
                <BasicInputComponent
                    type="password"
                    name="ConfirmPassword"
                    icon={<LockOutlined />}
                    iconPosition={"left"}
                    placeholder="Confirme sua senha"
                    className="max-w-screen-md"
                />
                </div>
                <ButtonComponent type="submit" className="float-right mt-5" >Redefinir</ButtonComponent>
            </form>
      </LoginLayoutComponent>
  )
}

export default ResetPasswordPage;