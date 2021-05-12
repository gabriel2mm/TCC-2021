import React from 'react';
import {BasicInputComponent, ButtonComponent, LoginLayoutComponent} from '../../Components';
import {ArrowLeftOutlined, MailOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

function ForgotPasswordPage() {
  return (
      <LoginLayoutComponent>
            <div className="flex flex-row items-center">
                <Link to="/" className="flex flex-row items-center text-purple-700 text-lg">
                 <ArrowLeftOutlined className="mr-2"/><span>Voltar</span>
                </Link>
            </div>

            <h2 className="text-2xl text-center font-bold text-gray-800 ">Esqueci minha senha</h2>
            <span className="mt-2 text-gray-600 subpixel-antialiased font-light leading-tight"> Insira o e-mail utilizado em seu cadastrado no campo abaixo. Caso o e-mail seja válido, você receberá um link no email cadastrado para redefinir sua senha</span>

            <form>
                <BasicInputComponent type="email" name="email" placeholder="Informe o email cadastrado" icon={<MailOutlined />} iconPosition="left"/>
                <ButtonComponent type="submit" className="float-right mt-5" >Redefinir</ButtonComponent>
            </form>
      </LoginLayoutComponent>
  )
}

export default ForgotPasswordPage;