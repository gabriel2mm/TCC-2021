import React, { useEffect, useState } from "react";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, message, Transfer } from 'antd';
import { API } from "../../../Services";
import { useUserContext } from "../../../Contexts";

function NewGroupPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, name: "", description: "", users: [] });
    const [users, setUsers] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const context = useUserContext();

    useEffect(() => {
        loadUsers();
    }, [])

    async function loadUsers(){
        try{
            const response = await API().get('/api/users');
            if(response.status >= 200 && response.status < 300){
                const users = response.data?.map(item => ( { key: item.id, title: `${item.firstName} ${item.lastName}`} ));
                setData({...data, users: response.data});
                setUsers(users);
            }
        }catch(e){
            console.error(e);
            message.error("Não foi possível carregar a lista de usuários!");
        }
    }

    async function handleSubmit() {
        try{
            const response = await API().post('/api/groups', {name: data.name, description : data.description, users: users.filter(u => targetKeys.includes(u.key)).map(u => ({id: u.key}))} );
            if(response.status >= 200 && response.status < 300){
                message.success("Grupo criado com sucesso!")
                setData({ id: null, name: "", description: "", users: []});
                setTargetKeys([]);
                setSelectedKeys([]);
                loadUsers();
                form.resetFields();
            }
        }catch(e){
            console.log(e);
            message.error("Não foi possível criar grupo!")
        }
    }

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function onChange(nextTargetKeys, direction, moveKeys) {
        setTargetKeys(nextTargetKeys);
    };

    function onSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo grupo</h2>

                <Form form={form} onFinish={handleSubmit} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome do grupo:</label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome do grupo' }]}>
                        <BasicInputComponent type="text" name="name" placeholder="Insira o nome do grupo" value={data.group || ''} onChange={e => changeText(e)} />
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição do grupo:</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição do grupo' }]}>
                        <BasicInputComponent type="textarea" name="description" placeholder="Insira a descrição do grupo" value={data.description || ''} onChange={e => changeText(e)} />
                    </Form.Item>
                    <Divider />
                    <label htmlFor="description" className="font-semibold text-gray-600">Selecionar usuários:</label>
                    <Form.Item>
                    <Transfer
                        dataSource={users}
                        titles={['Usuários', 'Usuários selecionados']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        render={item => item.title}
                    />
                    </Form.Item>
                    { context.containsPermission("Admin") || context.containsPermission("write:group") ? (<ButtonComponent type="submit">Salvar</ButtonComponent>) : (null)}
                    <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default NewGroupPage;