import React, { useState } from 'react'
import { Form, Upload, message, Button, Tabs, Table, Switch } from 'antd';
import { AuthenticatedLayoutComponent, BasicInputComponent, BasicInputMaskComponent, BasicSelectComponent, ButtonComponent } from '../../../Components'
import { UploadOutlined } from "@ant-design/icons";
import axios from 'axios';


export default function NewActivityPage() {
    const { TabPane } = Tabs;
    const [form] = Form.useForm();
    const [sendForm, setSendForm] = useState(false);
    const [showMarker, setShowMarker] = useState(false);
    const [location, setLocation] = useState({ lat: -25.475174 || 0, lng: -49.2807627 || 0 });
    const [data, setData] = useState({ description: "", formComplement: "", tableComplement: [], lat: 0, lng: 0, cep: "", address: "", city: "", state: "", number: "", complement: "", district: "" });

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const cols = [
        {
            title: 'Complementos',
            dataIndex: 'title',
            key: 'title',
            render: (key, record) => (
                <span>{record.title.substr(0, 30)}</span>
            )
        },

        {
            title: 'Ações',
            dataIndex: 'acoes',
            render: (text, record, i) => (
                <>
                    <span className="cursor-pointer text-blue-500 hover:text-blue-300 focus:text-blue-3000 mr-2" onClick={e => viewComplement(record)}>Visualizar</span>
                    <span className="cursor-pointer text-blue-500 hover:text-blue-300 focus:text-blue-3000" onClick={e => removeComplement(record)}>Remover</span>
                </>
            )
        }
    ]

    function handleClearComplement() {
        setData({ ...data, viewFormComplement: false, formComplement: "" });
        form.resetFields();
    }

    function viewComplement(record) {
        setData({ ...data, viewFormComplement: true, formComplement: record.title });
        form.resetFields();
    }

    function addComplement() {
        const complement = { key: data.tableComplement.length + 1, title: data.formComplement };
        setData({ ...data, formComplement: "", tableComplement: [...data.tableComplement, complement] });
    }

    function removeComplement(record) {
        setData({ ...data, formComplement: "", tableComplement: data.tableComplement.filter(d => d.key !== record.key) });
    }

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function searchCEP() {
        const cep = data.cep.split("-").join("").split("_").join("");
        if (cep && cep.length > 0) {
            const response = await axios.get("https://viacep.com.br/ws/" + cep + "/json/");
            try {
                if (!response.data.erro && response.status >= 200 && response.status < 300) {
                    const tmpData = response.data;
                    setData({ ...data, cep: cep, city: tmpData.localidade, state: tmpData.uf, address: tmpData.logradouro, district: tmpData.bairro })
                    form.resetFields();
                } else {
                    setData({ ...data, cep: cep, city: "", state: "", address: "", district: "" })
                    setShowMarker(false);
                }
            } catch (e) {
                message.error("Não foi possível localizar bairro! ");
            }

            const geoapi = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + cep + "&key=AIzaSyAqlZil13PZoeh3agIbqcRpxf7mdMwDJ_0");
            if (geoapi.status >= 200 && geoapi.status < 300) {
                const results = geoapi.data.results;
                if (geoapi.data.results.length > 0) {
                    setData({ ...data, lat: parseFloat(results[0].geometry.location.lat), lng: parseFloat(results[0].geometry.location.lng) });
                    setLocation({ lat: parseFloat(results[0].geometry.location.lat), lng: parseFloat(results[0].geometry.location.lng) });
                    setShowMarker(true);
                }
            }
        } else {
            setData({ ...data, cep: cep, city: "", state: "", address: "", district: "" })
            setShowMarker(false);
        }
    }

    function handleSubmit() {
        setSendForm(true);
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo chamado</h2>
                {!sendForm ? (
                    <Form initialValues={data} onFinish={handleSubmit} initialValues={data} form={form} scrollToFirstError>
                        <div className="flex flex-col w-full">
                            <div className="flex md:flex-row flex-col w-full">
                                <div className="item-group w-full md:mr-2">
                                    <label htmlFor="activity" className="font-semibold text-gray-600">Atividade:</label>
                                    <Form.Item name="activity" type="text">
                                        <BasicInputComponent placeholder="W00000000" value="W0321321321" disabled />
                                    </Form.Item>
                                </div>
                                <div className="item-group w-full md:mr-2">
                                    <label htmlFor="activity" className="font-semibold text-gray-600">Categoria:</label>
                                    <Form.Item>
                                        <BasicSelectComponent dataSource={[{ option: "Categoria 1", value: "categoria1" }, { option: "Categoria 2", value: "categoria 2" }]} />
                                    </Form.Item>
                                </div>
                            </div>
                            {/** another col */}

                            <div className="flex md:flex-row flex-col w-full">
                                <div className="item-group w-full md:mr-2">
                                    <label htmlFor="status" className="font-semibold text-gray-600">Status:</label>
                                    <Form.Item name="status" type="text">
                                        <BasicInputComponent name="status" type="text" placeholder="Informe o status" value="criado" value="Aberto" disabled />
                                    </Form.Item>
                                </div>
                                <div className="item-group w-full md:mr-2">
                                    <div className="flex flex-row w-full">
                                        <div className="w-full md:mr-2">
                                            <label htmlFor="created" className="font-semibold text-gray-600">Data de criação:</label>
                                            <Form.Item name="created" type="text">
                                                <BasicInputComponent name="created" type="text" placeholder="22/05/21" value="22/05/21 15:34" disabled />
                                            </Form.Item>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="deadline" className="font-semibold text-gray-600">Data limite:</label>
                                            <Form.Item name="deadline" type="text">
                                                <BasicInputComponent name="deadline" type="text" placeholder="22/05/21" value="22/05/21 18:34" disabled />
                                            </Form.Item>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col w-full">
                                <div className="item-group w-full md:mr-2">
                                    <label htmlFor="requester" className="font-semibold text-gray-600">Usuário atribuído:</label>
                                    <Form.Item>
                                        <BasicSelectComponent dataSource={[{ option: "Fulano da silva - finalodasilva@email.com", value: "1" }]} />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col w-full">
                                <div className="item-group w-full">
                                    <label htmlFor="description" className="font-semibold text-gray-600">Descrição:</label>
                                    <Form.Item name="description" rules={[{ required: true, message: "Informe a descrição" }]}>
                                        <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição do problema" rows="10" value={data.description} onChange={changeText} />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col w-full">
                                <div className="item-group w-full">
                                    <label htmlFor="deadline" className="font-semibold text-gray-600">Anexo:</label>
                                    <Form.Item>
                                        <Upload {...props} maxCount={1}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Endereço" key="1">

                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/2">
                                        <div className="flex flex-col w-full">
                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="cep" className="font-semibold text-gray-600">CEP:</label>
                                                    <Form.Item name="cep" rules={[{ required: true, message: "Informe o cep" }]}>
                                                        <BasicInputMaskComponent name="cep" mask="99999-999" placeholder="Informe o CEP. Ex.: 00000-000" onChange={changeText} value={data.cep} onBlur={searchCEP} />
                                                    </Form.Item>
                                                </div>
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="address" className="font-semibold text-gray-600">Endereço:</label>
                                                    <Form.Item name="address">
                                                        <BasicInputComponent type="text" placeholder="Informe o endereço" name="address" onChange={changeText} value={data.address} disabled />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="district" className="font-semibold text-gray-600">Bairro:</label>
                                                    <Form.Item name="district" rules={[{ required: true, message: "Informe o bairro" }]}>
                                                        <BasicInputComponent type="text" placeholder="Informe o bairro" name="district" onChange={changeText} value={data.district} disabled />
                                                    </Form.Item>
                                                </div>
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="city" className="font-semibold text-gray-600">Cidade:</label>
                                                    <Form.Item name="city" rules={[{ required: true, message: "Informe a cidade" }]}>
                                                        <BasicInputComponent type="text" name="city" placeholder="Informe a cidade" onChange={changeText} value={data.city} disabled />
                                                    </Form.Item>
                                                </div>
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="state" className="font-semibold text-gray-600">Estado:</label>
                                                    <Form.Item name="state" rules={[{ required: true, message: "Informe o estado (UF)" }]}>
                                                        <BasicInputComponent type="text" name="state" placeholder="Informe o estado (UF)" onChange={changeText} value={data.state} disabled />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="complement" className="font-semibold text-gray-600">Complemento:</label>
                                                    <Form.Item name="complement">
                                                        <BasicInputComponent type="text" name="complement" placeholder="Informe o complemento. (Opcional)" onChange={changeText} value={data.complement} />
                                                    </Form.Item>
                                                </div>
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="number" className="font-semibold text-gray-600">Número:</label>
                                                    <Form.Item name="number" type="number" rules={[{ required: true, message: "Informe o número do endereço" }]}>
                                                        <BasicInputComponent type="text" name="number" placeholder="Informe o número do endereço" onChange={changeText} value={data.number} />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 p-5 rounded-lg">
                                        <AddressMapComponent location={location} showMarker={showMarker} />
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Complemento" key="2">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/2 w-full">
                                        <div className="flex flex-col w-full">
                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full">
                                                    {data.viewFormComplement ? (<button type="button" title="Limpar complemento" className="mx-1  flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => handleClearComplement()}><ClearOutlined /></button>) : (null)}
                                                    <label htmlFor="formComplement" className="font-semibold text-gray-600">Complemento:</label>
                                                    <Form.Item>
                                                        <BasicInputComponent type="textarea" rows="10" name="formComplement" onChange={changeText} value={data.formComplement} placeholder="Informe o complemento da sua solicitação" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full">
                                                    <label htmlFor="deadline" className="font-semibold text-gray-600">Anexo:</label>
                                                    <Form.Item>
                                                        <Upload {...props} maxCount={1}>
                                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                        </Upload>
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full">
                                                    <label htmlFor="deadline" className="font-semibold text-gray-600">visivel para usuário:</label>
                                                    <Form.Item>
                                                        <Switch />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                        </div>
                                        {!data.viewFormComplement ? (<ButtonComponent type="button" name="add" className="float-right mb-5" onClick={addComplement}>Adicionar</ButtonComponent>) : (null)}
                                    </div>

                                    <div className="md:w-1/2 w-full p-5">
                                        <Table rowKey={record => record.key} columns={cols} dataSource={data.tableComplement} />
                                    </div>

                                </div>
                            </TabPane>
                            <TabPane tab="Requisitante" key="3">
                                <div className="flex flex-col w-full">
                                    <div className="flex md:flex-row flex-col w-full">
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="requester" className="font-semibold text-gray-600">Requisitante:</label>
                                            <Form.Item>
                                                <BasicSelectComponent dataSource={[{ option: "Fulano da silva - finalodasilva@email.com", value: "1" }]} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-row flex-col w-full">
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="firstName" className="font-semibold text-gray-600">Nome:</label>
                                            <Form.Item>
                                                <BasicInputComponent name="firstName" placeholder="Insira seu nome" value="Fulano" disabled />
                                            </Form.Item>
                                        </div>
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="lastName" className="font-semibold text-gray-600">Sobrenome:</label>
                                            <Form.Item>
                                                <BasicInputComponent name="lastName" placeholder="Informe o sobrenome" value="Da silva" disabled />
                                            </Form.Item>
                                        </div>
                                        <div className="item-group w-full">
                                            <label htmlFor="cpf" className="font-semibold text-gray-600">CPF:</label>
                                            <Form.Item>
                                                <BasicInputComponent name="cpf" placeholder="Informe o cpf" value="000.000.000-00" disabled />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="flex md:flex-row flex-col w-full">
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="email" className="font-semibold text-gray-600">E-mail:</label>
                                            <Form.Item>
                                                <BasicInputComponent type="email" name="enail" placeholder="Informe o e-mail" value="fulano.da.silva@hotmail.com" disabled />
                                            </Form.Item>
                                        </div>
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="phone" className="font-semibold text-gray-600">Telefone:</label>
                                            <Form.Item>
                                                <BasicInputComponent name="phone" placeholder="Informe o telefone de contato" value="(41) 98888-8888" disabled />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>

                        <Form.Item>
                            <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
                            <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
                        </Form.Item>

                    </Form>
                ) : (<ActivityResultPage activityNumber="W01231213213" />)}
            </div>
        </AuthenticatedLayoutComponent>
    )
}
