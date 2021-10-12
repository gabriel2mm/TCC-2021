import React, { useState } from 'react';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, message, Transfer } from 'antd';
import axios from 'axios';

function NewSkillPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, skill: "", description: "", status: true});
    const [targetKeys, setTargetKeys] = useState(data.users);
    const [selectedKeys, setSelectedKeys] = useState([]);

    function onChangeText(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    async function handleSubmit() {
        try {
            const response = await axios.post(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/screens`, data, {});
            if (response.status >= 200 && response.status < 300) {
                message.success("Habilidade cadastrada com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível cadastrar habilidade!");
        }
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
                    <label htmlFor="skill" className="font-semibold text-gray-600">Nome da habilidade: </label>
                    <Form.Item name="skill" type="text" rules={[{ required: true, message: 'Insira o nome da habilidade' }]}>
                        <BasicInputComponent name="skill" placeholder="Informe o nome da habilidade"  value={data.skill} onChange={e => onChangeText(e)}/>
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição da habilidade:</label>
                    <Form.Item name="description"  type="textarea" rules={[{ required: true, message: 'Insira a descrição da habilidade' }]}>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição da habilidade" value={data.description} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <label htmlFor="selectUsers" className="font-semibold text-gray-600">Selecionar usuários:</label>
                        <Transfer
                            rowKey={record => record.key}
                            name="selectUsers"
                            dataSource={targetKeys}
                            titles={['Usuários selecionados', 'Selecionar usuários']}
                            targetKeys={targetKeys}
                            selectedKeys={selectedKeys}
                            onChange={onChange}
                            onSelectChange={onSelectChange}
                            render={item => item.title}
                            onItemSelect={ item => console.log(item)}
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