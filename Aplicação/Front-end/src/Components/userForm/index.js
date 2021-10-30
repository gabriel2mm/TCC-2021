import React, {useState, useEffect} from "react";
import { BasicInputComponent, ButtonComponent } from '..';
import { Form, message } from 'antd';
import { API } from "../../Services";
import { useParams } from 'react-router-dom';


function UserFormComponent() {
    const [form] = Form.useForm();
    const [data, setData] = useState({id: null, firstName: "" , lastName: "", email: "", cpf: "", password: ""});

    async function onFinish(values) {
        try{
            const response = await API().post('/api/users', data);
            if(response.status >= 200 && response.status < 300) {
                setData({id: null, firstName: "" , lastName: "", email: "", cpf: "", password: ""});
                message.success('Usuário cadastrado com sucesso!');
            }
        }catch(e){
            message.error('Erro ao cadastrar usuário! ' );
        }
    };

    function handleChangeText(e){
        setData({...data, [e.target.name]: e.target.value});
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 my-5">Novo usuário</h2>
            <Form onFinish={onFinish} initialValues={data} form={form} scrollToFirstError>
                <label htmlFor="firstName" className="font-semibold text-gray-600">Nome:</label>
                <Form.Item className="w-full form-control" type="text" name="firstName" rules={[{ required: true, message: 'Insira o nome do Usuário' }]}>
                    <BasicInputComponent name="firstName" placeholder="Informe o primeiro nome do usuário" onChange={e => handleChangeText(e)} value={data.firstName} />
                </Form.Item>
                <label htmlFor="lastName" className="font-semibold text-gray-600">Sobrenome: </label>
                <Form.Item className="w-full form-control" type="text" name="lastName" rules={[{ required: true, message: 'Insira o último nome do Usuário' }]}>
                    <BasicInputComponent name="lastName" placeholder="Informe o sobrenome do usuário" onChange={e => handleChangeText(e)} value={data.lastName} />
                </Form.Item>
                <label htmlFor="email" className="font-semibold text-gray-600">Email:</label>
                <Form.Item className="w-full form-control" type="email" name="email" rules={[{ required: true, message: 'Insira o e-mail do Usuário' }]}>
                    <BasicInputComponent name="email" placeholder="Informe um email válido" onChange={e => handleChangeText(e)} value={data.email} />
                </Form.Item>
                <label htmlFor="cpf" className="font-semibold text-gray-600">CPF:</label>
                <Form.Item className="w-full form-control" type="number" name="cpf" rules={[{ required: true, message: 'Insira o CPF do Usuário' }]}>
                    <BasicInputComponent name="cpf" placeholder="Informe um CPF Válido. EX: 00000000056" onChange={e => handleChangeText(e)} value={data.cpf}/>
                </Form.Item>
                <label htmlFor="password" className="font-semibold text-gray-600">Senha:</label>
                <Form.Item className="w-full form-control" type="password" name="password" rules={[{ required: true, message: 'Insira a senha do Usuário' }]} >
                    <BasicInputComponent name="password" type="password" placeholder="Informe a senha" onChange={e => handleChangeText(e)} value={data.password}/>
                </Form.Item>
                <label htmlFor="confirmPassword" className="font-semibold text-gray-600">Confirmar senha:</label>
                <Form.Item className="w-full form-control" type="password" name="confirmPassword" rules={[{ required: true, message: 'Insira a confirmação de senha do Usuário' },  ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('As senhas não conferem!');
                        },
                    })]} >
                    <BasicInputComponent name="confirmPassword" type="password" placeholder="Confirmar senha"/>
                </Form.Item>
                <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
            </Form>
        </>
    );
}

export default UserFormComponent;