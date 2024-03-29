import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, message, Switch, Transfer } from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { API } from '../../../Services';


function CapacityDetailPage() {
    const params = useParams();
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({ id: null, name: "", description: "", active: true, users: [] });
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        async function initialise(){
            await loadUsers();
            await loadCapacities();
        }
        initialise();
    }, [params, form]);

    useEffect(() => {setTargetKeys(data.users?.map(user => user.id));}, [data]);

    async function loadCapacities() {
        const response = await API().get(`/api/capacities/${params.id}`);
        if (response.status >= 200 && response.status < 300) {
            setData(response.data);
            form.resetFields();
        }
    }

    async function loadUsers(){
        try{
            const response = await API().get('/api/users');
            if(response.status >= 200 && response.status < 300){
                setUsers(response.data.map(item => ({key: item.id, title: `${item.firstName} ${item.lastName}`})));   
            }
        }catch(e){
            console.error(e);
            message.error("Não foi possível carregar usuários!");
        }
    }

    function onChangeText(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    function onChange(nextTargetKeys, direction, moveKeys) {
        setTargetKeys(nextTargetKeys);
    };

    function onSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    async function handleSubmit() {
        try {
            const response = await API().put(`/api/capacities/${params.id}`, {name: data.name, description: data.description, active: data.active, users: users.filter(u => targetKeys.includes(u.key)).map(u => ({id: u.key}))});
            if (response.status >= 200 && response.status < 300) {
                message.success("Capacidade atualizada com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível atualizar capacidade!");
        }
    }

    function toggleActive(e) {
        setData({ ...data, active: e })
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhe da capacidade</h2>
                <Form onFinish={handleSubmit} initialValues={data} form={form} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome da capacidade: </label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome do grupo' }]}>
                        <BasicInputComponent name="name" placeholder="Informe o nome da capacidade"  value={data.name || ''} onChange={e => onChangeText(e)}/>
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição da capacidade:</label>
                    <Form.Item name="description"  type="textarea" rules={[{ required: true, message: 'Insira a descrição da capacidade' }]}>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição da capacidade " value={data.description || ''} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">Ativo? </label>
                    <Form.Item>
                        <Switch checked={data.active} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                    </Form.Item>
                    <Divider />
                    <Transfer
                        dataSource={users}
                        titles={['Usuários', 'Usuários selecionados']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        render={item => item.title}
                    />
                    <Form.Item className="mt-5">
                        <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                        <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                    </Form.Item>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default CapacityDetailPage;