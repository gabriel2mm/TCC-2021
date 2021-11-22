import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent, GroupListComponent } from '../../../Components';
import { Divider, Form, message, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { configuration } from '../../../Components/groupList/dataSource';
import { API } from '../../../Services/API';
import { useUserContext } from '../../../Contexts';

function ProfileDetailPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, name: "", description: "", active: 0, permissions: [] });
    const params = useParams();
    const context = useUserContext();

    useEffect(() => {
        console.log(context);

        async function fetchProfile() {
            const response = await API().get(`/api/profiles/${params.id}`);
            if (response.status >= 200 && response.status < 300) {
                setData(response.data);
                form.resetFields();
            }
        }

        if (params && params.id) {
            fetchProfile();
        }

    }, [params, form]);

    function onChangeText(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    async function handleSubmit() {
        try {
            const response = await API().put(`/api/profiles/${params.id}`, { id: params.id, name: data.name, description: data.description, active: data.active, permissions: data.permissions}, {});
            if (response.status >= 200 && response.status < 300) {
                message.success("Perfil atualizado com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível atualizar perfil");
        }
    }

    function toggleActive(e) {
        if (e) {
            setData({ ...data, active: 1 })
        } else {
            setData({ ...data, active: 0 })
        }
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhe perfil de acesso</h2>
                <Form onFinish={handleSubmit} initialValues={data} form={form} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome do perfil: </label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome do perfil'}]}>
                        <BasicInputComponent name="name" placeholder="Informe o nome do perfil"  value={data.name || ''} onChange={e => onChangeText(e)}/>
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição do perfil:</label>
                    <Form.Item name="description"  type="textarea" rules={[{ required: true, message: 'Insira a descrição do perfil' }]}>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição do perfil" value={data.description || ''} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">Ativo? </label>
                    <Form.Item>
                        <Switch checked={data.active} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                    </Form.Item>
                    <Divider />
                    <div>
                        <h2 className="text-lg text-gray-600 font-bold ">Permissões</h2>
                        <GroupListComponent data={data} setData={setData} dataSource={configuration} />
                    </div>
                    <Form.Item>
                    {context.containsPermission("Admin") || context.containsPermission("write:profile") ? (<ButtonComponent name="save" type="submit">Salvar</ButtonComponent>) : (null)}
                        <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                    </Form.Item>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default ProfileDetailPage;