import React, { useState } from 'react';
import { BasicInputComponent, ButtonComponent, LoginLayoutComponent } from '../../Components';
import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Form } from 'antd';

function ResetPasswordPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ newPassword: "", confirmPassword: ""});

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleSubmit() {
        console.log("finish");
    }

    return (
        <LoginLayoutComponent>
            <div className="flex flex-row items-center">
                <Link to="/" className="flex flex-row items-center text-purple-700 text-lg">
                    <ArrowLeftOutlined className="mr-2" /><span>Voltar</span>
                </Link>
            </div>

            <h2 className="text-2xl text-center font-bold text-gray-800 ">Redefinir senha</h2>

            <Form onFinish={handleSubmit} form={form} scrollToFirstError>
                <div className="my-2">
                    <label htmlFor="password" className="text-gray-700 font-bold">Nova senha:</label>
                    <Form.Item name="newPassword" type="password" rules={[{required: true, message: "Informe a nova senha"}]}>
                        <BasicInputComponent type="password" name="newPassword" icon={<LockOutlined />} iconPosition={"left"} placeholder="Insira sua nova senha" className="max-w-screen-md" value={data.newPassword} onChange={e => changeText(e)} />
                    </Form.Item>
                </div>
                <div className="my-2">
                    <label htmlFor="password" className="text-gray-700 font-bold">
                        Confirmar senha:
                    </label>
                    <Form.Item name="confirmPassword" type="password" rules={[{ required: true, message: "Informe a confirmação de senha" }, ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('As senhas não conferem!');
                        },
                    })]}>
                        <BasicInputComponent type="password" name="confirmPassword" placeholder="Confirme sua senha" icon={<LockOutlined />} iconPosition={"left"} value={data.confirmPassword} onChange={e => changeText(e)} />
                    </Form.Item>
                </div>
                <ButtonComponent type="submit" className="float-right mt-5" >Redefinir</ButtonComponent>
            </Form>
        </LoginLayoutComponent>
    )
}

export default ResetPasswordPage;