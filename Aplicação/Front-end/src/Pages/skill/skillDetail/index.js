import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Form, message, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Transfer } from 'antd';
import { API } from '../../../Services';
import { useUserContext } from '../../../Contexts';

function SkillDetailPage() {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({ id: null, name: "", description: "", active: false, users: [] });
    const params = useParams();
    const context = useUserContext();
    
    const [targetKeys, setTargetKeys] = useState(data.users);
    const [selectedKeys, setSelectedKeys] = useState([]);
    useEffect(() => {
        async function initialise(){
            await loadUsers();
            await loadSkills();
        }
        initialise();
    }, [params, form]);

    useEffect(() => {setTargetKeys(data.users?.map(user => user.id));}, [data]);

    async function loadSkills() {
        const response = await API().get(`/api/skills/${params.id}`);
        if (response.status >= 200 && response.status < 300) {
            setData(response.data);

            const tmpUsers = [];
            response.data.users.map( (u,i) => tmpUsers.push({ key: u.id, title: u.first, description: u.first}))
            setTargetKeys(tmpUsers);
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

    async function handleSubmit() {
        try {
            const response = await API().put(`/api/skills/${params.id}`, {name: data.name, description: data.description, active: data.active, users: users.filter(u => targetKeys.includes(u.key)).map(u => ({id: u.key}))});
            if (response.status >= 200 && response.status < 300) {
                message.success("Habilidade atualizado com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível atualizar Habilidade");
        }
    }

    function toggleActive(e) {
        setData({ ...data, active: e })
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


    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhe da habilidade</h2>
                <Form onFinish={handleSubmit} initialValues={data} form={form} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome da habilidade: </label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome da habilidade' }]}>
                        <BasicInputComponent name="name" placeholder="Informe o nome da habilidade" value={data.skill} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição da habilidade:</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição da habilidade' }]}>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição da habilidade" value={data.description} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">habilidade ativa? </label>
                        <Switch checked={data.active} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor="selectUsers" className="font-semibold text-gray-600">Selecionar usuários:</label>
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
                    <Form.Item>
                    { context.containsPermission("Admin") || context.containsPermission("write:skill") ? (<ButtonComponent type="submit">Salvar</ButtonComponent>) : (null)}
                        <Link to="/settings/skills" className="ml-5 text-blue-500">Cancelar</Link>
                    </Form.Item>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default SkillDetailPage;