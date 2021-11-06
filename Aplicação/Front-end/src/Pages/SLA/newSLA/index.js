import React, { useState, useRef} from "react";
import { AuthenticatedLayoutComponent, BasicInputComponent, BasicSelectComponent, ButtonComponent } from '../../../Components';
import { Divider, Form, message } from 'antd';
import { API } from "../../../Services";

function NewSLAPage() {
    const formRef = useRef();
    const [form] = Form.useForm();
    const [data, setData] = useState({ name: '', time: '', description: '', active: true, unity: '' });

    async function handleSubmit() {
       try{
        const response = await API().post('/api/slas', data)
        if(response.status >= 200 && response.status < 300){
            message.success("SLA Criado com sucesso! ");
            setData({ name: '', time: '', description: '', active: true, unity: '' });
            form.resetFields();
        }
       }catch(e){
            message.error("Não foi possível criar SLA");
            console.log(e);
       }
    }

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function onChangeSelect(event){
        formRef.current.setFieldsValue({ unity: event.target.value});
        setData({...data, unity: event.target.value})
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo Acordo de nível de serviço</h2>

                <Form ref={formRef} form={form} onFinish={handleSubmit} scrollToFirstError>
                    <label htmlFor="name" className="font-semibold text-gray-600">Nome do acordo:</label>
                    <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome do acordo' }]}>
                        <BasicInputComponent type="text" name="name" placeholder="Insira o nome do acordo" value={data.name || ''} onChange={e => changeText(e)} />
                    </Form.Item>
                    <div className="flex flex-row justify-start w-full">
                        <div className="flex flex-col justify-start mr-1 w-1/2">
                            <label htmlFor="time" className="font-semibold text-gray-600">Prazo:</label>
                            <Form.Item name="time" type="number" rules={[{ required: true, message: 'Insira o prazo do nivel de serviço' }, ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (value && value > 0) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Informe um valor maior que "0" ');
                                },
                            })]}>
                                <BasicInputComponent type="number" name="time" placeholder="Insira o prazo do nivel de serviço" value={data.time || ''} onChange={e => changeText(e)} className="w-1/2" />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col justify-start w-1/2">
                            <label htmlFor="unity" className="font-semibold text-gray-600">Unidade:</label>
                            <Form.Item name="unity" type="select" rules={[{ required: true, message: 'Selecione a unidade' }]}>
                                <BasicSelectComponent onChange={e => onChangeSelect(e)} name="unity" defaultOption={false} dataSource={[{ option: 'Minutos', value: "m" }, { option: 'Horas', value: "h" }, { option: 'Dia(s)', value: "d" }, { option: 'Mês/Meses', value: "M" }, { option: 'Semana(s)', value: "S" }, { option: 'Ano(s)', value: "y" }]} />
                            </Form.Item>
                        </div>
                    </div>
                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição do acordo:</label>
                    <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição do acordo' }]}>
                        <BasicInputComponent type="textarea" name="description" placeholder="Insira a descrição do acordo" value={data.description || ''} onChange={e => changeText(e)} />
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