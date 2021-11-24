import React, { useState, useEffect} from "react";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, Transfer, message } from 'antd';
import { API } from "../../../Services";
import { useUserContext } from "../../../Contexts";

function NewCapacityPage() {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({ id: null, name: "", description: "", active: false, users: [] });
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const context = useUserContext();

    useEffect(() => {
        loadUsers();
    }, [])

    async function loadUsers(){
        try{
            const response = await API().get('/api/users/only-receive');
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
        console.log(data);
        try {
            const response = await API().post(`/api/capacities`, {name: data.name, description : data.description, active: true, users: users.filter(u => targetKeys.includes(u.key)).map(u => ({id: u.key}))} );
            if (response.status >= 200 && response.status < 300) {
                message.success("Capacidade criada com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível criar capacidade!");
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
                <h2 className="text-2xl font-bold text-gray-800 my-5">Nova capacidade</h2>

                <Form form={form} onFinish={handleSubmit} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome da capacidade:</label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome da capacidade' }]}>
                        <BasicInputComponent type="text" name="name" placeholder="Insira o nome da capacidade" value={data.capacity || ''} onChange={e => changeText(e)} />
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição da capacidade:</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição da capacidade' }]}>
                        <BasicInputComponent type="textarea" name="description" placeholder="Insira a descrição da capacidade" value={data.description | ''} onChange={e => changeText(e)} />
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
                    { context.containsPermission("Admin") || context.containsPermission("write:capacity") ? (<ButtonComponent type="submit">Salvar</ButtonComponent>) : (null)}
                    <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default NewCapacityPage;