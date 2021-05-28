import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../../Components';
import { Form, message, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import axios from 'axios';
import { Transfer } from 'antd';

function SkillDetailPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, skill: "", description: "", status: "", users: [] });
    const params = useParams();

    const [targetKeys, setTargetKeys] = useState(data.users);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        async function fetchskill() {
            const response = await axios.get(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/screens/${params.id}`);
            if (response.status >= 200 && response.status < 300) {
                setData(response.data);

                const tmpUsers = [];
                response.data.users.map( (u,i) => tmpUsers.push({ key: u.id, title: u.first, description: u.first}))
                setTargetKeys(tmpUsers);
                form.resetFields();
            }
        }

        if (params && params.id) {
            fetchskill();
        }

    }, [params, form]);

    function onChangeText(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    async function handleSubmit() {
        try {
            const response = await axios.put(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/screens/${params.id}`, data, {});
            if (response.status >= 200 && response.status < 300) {
                message.success("Habilidade atualizado com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível atualizar Habilidade");
        }
    }

    function toggleActive(e) {
        if (e) {
            setData({ ...data, status: "ativo" })
        } else {
            setData({ ...data, status: "suspended" })
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
                <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhe da habilidade</h2>
                <Form onFinish={handleSubmit} initialValues={data} form={form} scrollToFirstError>
                    <label htmlFor="skill" className="font-semibold text-gray-600">Nome da habilidade: </label>
                    <Form.Item name="skill" type="text" rules={[{ required: true, message: 'Insira o nome da habilidade' }]}>
                        <BasicInputComponent name="skill" placeholder="Informe o nome da habilidade" value={data.skill} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição da habilidade:</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição da habilidade' }]}>
                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição da habilidade" value={data.description} onChange={e => onChangeText(e)} />
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">habilidade ativa? </label>
                        <Switch checked={data.status !== "suspended"} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                    </Form.Item>
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
                    <Form.Item>
                        <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                        <Link to="/settings/skills" className="ml-5 text-blue-500">Cancelar</Link>
                    </Form.Item>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default SkillDetailPage;