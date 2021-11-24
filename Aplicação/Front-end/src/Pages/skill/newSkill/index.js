import React, { useState, useEffect } from 'react';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, message, Transfer } from 'antd';
import { API } from '../../../Services';

function NewSkillPage() {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({ id: null, name: "", description: "", status: true, users: []});
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

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
        try {
            const response = await API().post(`/api/skills`, {name: data.name, description : data.description, active: true, users: users.filter(u => targetKeys.includes(u.key)).map(u => ({id: u.key}))});
            if (response.status >= 200 && response.status < 300) {
                message.success("Habilidade cadastrada com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível cadastrar habilidade!");
        }
    }

    function onChangeText(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
        if(data.users && !data.users.includes(sourceSelectedKeys)){
            setData({...data, users: [ ...data.users, selectedKeys.filter(k => k === sourceSelectedKeys)]});
        }
    };

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Nova Habilidade</h2>
                <Form onFinish={handleSubmit} initialValues={data} form={form} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome da habilidade: </label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome da habilidade' }]}>
                        <BasicInputComponent name="name" placeholder="Informe o nome da habilidade"  value={data.name || ''} onChange={e => onChangeText(e)}/>
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição da habilidade:</label>
                    <Form.Item name="description"  type="textarea" rules={[{ required: true, message: 'Insira a descrição da habilidade' }]}>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição da habilidade" value={data.description || ''} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <Divider />
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
                    <Form.Item className="mt-10">
                        <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                        <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                    </Form.Item>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default NewSkillPage;