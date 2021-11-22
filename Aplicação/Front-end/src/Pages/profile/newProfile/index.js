import React, { useState } from 'react';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent, GroupListComponent } from '../../../Components';
import { Divider, Form, message } from 'antd';
import { configuration } from '../../../Components/groupList/dataSource';
import { API } from '../../../Services/API';

function NewProfilePage() {
    const [form] = Form.useForm();
    const initialData = { id: null, name: "", description: "", active: 1, permissions: [] };
    const [data, setData] = useState(initialData);
    function onChangeText(event) {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    async function handleSubmit() {
        try {
            const response = await API().post(`/api/profiles`, data, {});
            if (response.status >= 200 && response.status < 300) {
                setData(initialData);
                message.success("Perfil criado com sucesso!")
            }
        } catch (e) {
            console.log(e);
            message.error("Não foi possível criar perfil");
        }
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo perfil de acesso</h2>

                <Form onFinish={handleSubmit} initialValues={initialData} form={form} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome do perfil</label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome do perfil' }]}>
                        <BasicInputComponent name="name" type="text" placeholder="Informe o nome do perfil" value={data.name} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição do perfil</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição do perfil' }]}>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição do perfil" value={data.description} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <h2 className="text-lg text-gray-600 font-bold ">Permissões</h2>
                        <GroupListComponent data={data} setData={setData} dataSource={configuration} />
                    </Form.Item>

                    <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                    <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                </Form>

            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default NewProfilePage;