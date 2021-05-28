import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent, BasicSelectComponent } from '../../../Components';
import { Form, message, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import axios from 'axios';

function SLADetailPage() {
    const params = useParams();
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, sla: "", description: "", status: "", users: [] });

    useEffect(() => {
        async function fetchProfile() {
            const response = await axios.get(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/sla/${params.id}`);
            if (response.status >= 200 && response.status < 300) {
                setData(response.data);
                form.resetFields();
            }
        }

        if (params && params.id) {
            fetchProfile();
        }

    }, [params, form]);

    function changeText(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    
    async function handleSubmit() {
        try {
            const response = await axios.put(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/sla/${params.id}`, data, {});
            if (response.status >= 200 && response.status < 300) {
                message.success("Acordo atualizado com sucesso!")
            }
        } catch (e) {
            message.error("Não foi possível atualizar Acordo!");
        }
    }

    function toggleActive(e) {
        if (e) {
            setData({ ...data, status: "ativo" })
        } else {
            setData({ ...data, status: "suspended" })
        }
    }

    return (
        <AuthenticatedLayoutComponent>
        <div className="container">
            <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhes Acordo de nível de serviço</h2>

            <Form form={form} initialValues={data} onFinish={handleSubmit} scrollToFirstError>
                <label htmlFor="sla" className="font-semibold text-gray-600">Nome do acordo:</label>
                <Form.Item name="sla" type="text" rules={[{ required: true, message: 'Insira o nome do acordo' }]}>
                    <BasicInputComponent type="text" name="sla" placeholder="Insira o nome do acordo" value={data.sla} onChange={e => changeText(e)} />
                </Form.Item>
                <div className="flex flex-row justify-start w-full">
                    <div className="flex flex-col justify-start mr-1 w-1/2">
                        <label htmlFor="deadline" className="font-semibold text-gray-600">Prazo:</label>
                        <Form.Item name="deadline" type="number" rules={[{ required: true, message: 'Insira o prazo do nivel de serviço' }, ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value && value > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Informe um valor maior que "0" ');
                            },
                        })]}>
                            <BasicInputComponent type="number" name="deadline" placeholder="Insira o prazo do nivel de serviço" value={data.deadline} onChange={e => changeText(e)} className="w-1/2" />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col justify-start w-1/2">
                        <label htmlFor="unity" className="font-semibold text-gray-600">Unidade:</label>
                        <Form.Item name="unity" type="select" rules={[{ required: true, message: 'Selecione a unidade' }]}>
                            <BasicSelectComponent defaultOption={false} dataSource={[{ option: 'Minutos', value: "m" }, { option: 'Horas', value: "h" }, { option: 'Dia(s)', value: "d" }, { option: 'Mês/Meses', value: "M" }, { option: 'Semana(s)', value: "S" }, { option: 'Ano(s)', value: "y" }]} />
                        </Form.Item>
                    </div>
                </div>
                <label htmlFor="description" className="font-semibold text-gray-600">Descrição do acordo:</label>
                <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição do acordo' }]}>
                    <BasicInputComponent type="textarea" name="description" placeholder="Insira a descrição do acordo" value={data.description} onChange={e => changeText(e)} />
                </Form.Item>
                <Form.Item>
                        <label htmlFor="active" className="font-semibold text-gray-600 mr-2">Acordo ativo? </label>
                        <Switch name="active" checked={data.status !== "suspended"} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                    </Form.Item>

                <ButtonComponent type="submit">Salvar</ButtonComponent>
                <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
            </Form>
        </div>
    </AuthenticatedLayoutComponent>
    );
}

export default SLADetailPage;