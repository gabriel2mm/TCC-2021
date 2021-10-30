import React, { useState } from 'react'
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components'
import { Divider, Form, message } from 'antd';
import { useUserContext } from '../../../Contexts';
import { API } from '../../../Services';

export default function ChangePasswordPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const userContext = useUserContext();

    async function handleSubmit() {
        try{
            const email = userContext.user.email;
            const response = await API().post('/api/users/change-password', { email, ...data });  
            if(response.status >= 200 && response.status < 300 ){
                message.success("Troca de senha realizada com sucesso!");
            }
        }catch(e){
            message.error("Não foi possível alterar sua senha!");
        }
    }

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Alterar senha</h2>
                <Form onFinish={handleSubmit} form={form}>
                    <label htmlFor="skill" className="font-semibold text-gray-600">Senha atual: </label>
                    <Form.Item name="currentPassword" type="password" rules={[{ required: true, message: "Informe a senha atual" }]}>
                        <BasicInputComponent type="password" name="currentPassword" placeholder="Informe a senha atual" value={data.currentPassword} onChange={e => changeText(e)} />
                    </Form.Item>
                    <Divider />
                    <label htmlFor="skill" className="font-semibold text-gray-600">Nova senha: </label>
                    <Form.Item name="newPassword" type="password" rules={[{ required: true, message: "Informe a nova senha" }]}>
                        <BasicInputComponent type="password" name="newPassword" placeholder="Informe a senha atual" value={data.newPassword} onChange={e => changeText(e)} />
                    </Form.Item>
                    <label htmlFor="skill" className="font-semibold text-gray-600">Senha atual: </label>
                    <Form.Item name="confirmPassword" type="password" rules={[{ required: true, message: "Informe a confirmação de senha" }, ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('As senhas não conferem!');
                        },
                    })]}>
                        <BasicInputComponent type="password" name="confirmPassword" placeholder="Informe a senha atual" value={data.confirmPassword} onChange={e => changeText(e)} />
                    </Form.Item>

                    <Form.Item className="mt-10">
                        <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                        <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                    </Form.Item>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    )
}
