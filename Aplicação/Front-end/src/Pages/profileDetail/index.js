import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent, GroupListComponent } from '../../Components';
import { Form, message, Switch } from 'antd';
import {CloseOutlined, CheckOutlined} from "@ant-design/icons";
import { configuration } from '../../Components/GroupList/dataSource';
import axios from 'axios';

function ProfileDetailPage() {
    const [data, setData] = useState({ id: null, name: "", description: "", status: "", permissions: [] });
    const params = useParams();

    useEffect(() => {
        async function fetchProfile() {
            const response = await axios.get(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/profiles/${params.id}`);
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
                setData(response.data);
            }
        }

        if (params && params.id) {
            fetchProfile();
        }

    }, [params]);

    function onChangeText(event) {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    async function handleSubmit() {
        try {
            const response = await axios.put(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/profiles/${params.id}`, data, {});
            if (response.status >= 200 && response.status < 300) {
                message.success("Perfil atualizado com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível atualizar perfil");
        }
    }

    function toggleActive(e){
        if(e){
            setData({...data, status: "ativo"})
        }else{
            setData({...data, status: "suspended"})
        }
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo perfil de acesso</h2>
                <Form onFinish={handleSubmit}>
                    <Form.Item>
                        <label htmlFor="profile" className="font-semibold text-gray-600">Nome do perfil</label>
                        <BasicInputComponent name="profile" type="text" placeholder="Informe o nome do perfil" value={data.profile} onChange={e => onChangeText(e)} required />
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor="description" className="font-semibold text-gray-600">Descrição do perfil</label>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição do perfil" value={data.description} onChange={e => onChangeText(e)} required />
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">Ativo? </label>
                        <Switch checked={data.status !== "suspended"} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                    </Form.Item>
                    <Form.Item>
                        <h2 className="text-lg text-gray-600 font-bold ">Permissões</h2>
                        <GroupListComponent data={data} setData={setData} dataSource={configuration} />
                    </Form.Item>
                    <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                    <Link to="/settings/profiles" className="ml-5 text-blue-500">Cancelar</Link>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default ProfileDetailPage;