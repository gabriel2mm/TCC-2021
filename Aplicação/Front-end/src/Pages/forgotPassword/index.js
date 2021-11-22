import React, {useState} from 'react';
import { BasicInputComponent, ButtonComponent, LoginLayoutComponent } from '../../Components';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Form, message } from 'antd';
import { API } from '../../Services/API';

function ForgotPasswordPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({email: ""});

    function changeText(e){
        setData({...data, [e.target.name]: e.target.value});
    }

    async function handleSubmit(){
        if(data && data.email){
            const response = await API().post('/api/auth/forgot', {email : data.email});
            message.info("Se o e-mail inserido for válido, você receberá um link para redefinir sua senha!");
        }
    }

    return (
        <LoginLayoutComponent>
            <div className="flex flex-row items-center">
                <Link to="/" className="flex flex-row items-center text-purple-700 text-lg">
                    <ArrowLeftOutlined className="mr-2" /><span>Voltar</span>
                </Link>
            </div>

            <h2 className="text-2xl text-center font-bold text-gray-800 ">Esqueci minha senha</h2>
            <span className="mt-2 text-gray-600 subpixel-antialiased font-light leading-tight"> Insira o e-mail utilizado em seu cadastrado no campo abaixo. Caso o e-mail seja válido, você receberá um link no email cadastrado para redefinir sua senha</span>

            <Form onFinish={handleSubmit} form={form} scrollToFirstError>
                <Form.Item name="email" type="email" rules={[{required: true, message: "Informe um e-mail"}, {type: "email", message: "Informe um e-mail válido"}]}>
                    <BasicInputComponent type="email" name="email" placeholder="Informe o email cadastrado" icon={<MailOutlined />} iconPosition="left" value={data.email} onChange={e => changeText(e)} />
                </Form.Item>
                <ButtonComponent type="submit" className="float-right mt-5" >Redefinir</ButtonComponent>
            </Form>
        </LoginLayoutComponent>
    )
}

export default ForgotPasswordPage;