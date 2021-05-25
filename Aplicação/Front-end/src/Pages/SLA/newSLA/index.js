import React, { useState } from "react";
import { AuthenticatedLayoutComponent, BasicInputComponent, BasicSelectComponent, ButtonComponent } from '../../../Components';
import { Divider, Form } from 'antd';

function NewSLAPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState({ id: null, sla: "", deadline: "", description: "", status: "ativo", users: [] });

    function handleSubmit() {
        console.log("finish")
    }

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo Acordo de nível de serviço</h2>

                <Form form={form} onFinish={handleSubmit} scrollToFirstError>
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
                    <Divider />
                    <ButtonComponent type="submit">Salvar</ButtonComponent>
                    <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                </Form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default NewSLAPage;