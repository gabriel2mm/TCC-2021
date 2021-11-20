import React, { useState, useEffect} from 'react'
import { Form, Upload, message, Button, Tabs, Table, Switch } from 'antd';
import { AuthenticatedLayoutComponent, BasicInputComponent, BasicInputMaskComponent, BasicSelectComponent, ButtonComponent } from '../../../Components'
import { UploadOutlined, ClearOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import ActivityResultPage from '../activityResult';
import AddressMapComponent from '../maps/addressMap';
import axios from 'axios';
import { API } from '../../../Services';
import { useUserContext } from '../../../Contexts';
import moment from 'moment';


export default function NewActivityPage() {
    const { TabPane } = Tabs;
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [sendForm, setSendForm] = useState(false);
    const [showMarker, setShowMarker] = useState(false);
    const [location, setLocation] = useState({ lat: -25.475174 || 0, lng: -49.2807627 || 0 });
    const [data, setData] = useState({ category: { id: ""}, created: newDate(), status: "ABERTO", description: "", formComplement: "", tableComplement: [], lat: 0, lng: 0, cep: "", address: "", city: "", state: "", number: "", complement: "", district: "", dataLimit: moment(new Date()).format("DD/MM/yyyy HH:mm"), sendComplement:[] , complementVisible: true });
    const [address, setAddress] = useState({ bairro: "", cep: "", complemento: "", ddd: "", gia: "", ibge: "", localidade: "", logradouro: "", siafi: "", uf: ""});
    const context = useUserContext();


    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    async function handleSubmit() {
        try{
            const response = await API().post('/api/activities', {
                number: "",
                status: data.status,
                description: data.description,
                attachment: "",
                address: {
                    cep: address.cep,
                    CEP: address.cep,
                    address: address.logradouro,
                    city: address.localidade,
                    state: address.uf,
                    number: data.number,
                    complement: data.complement,
                    district: address.bairro,
                    lat: `${location.lat}`,
                    lng: `${location.lng}`
                },
                category:{
                    id: data.category.id
                },
                complements: data.sendComplement
            });

            if(response.status >= 200 && response.status < 300){
                message.success("Atividade cadastrada com sucesso!");
                setSendForm(true);
            }
        }catch(e){
            message.error("Não foi possível enviar a atividade");
        }
    }

    async function loadCategories() {
        try{
            const response = await API().get('/api/categories');
            if(response.status >= 200 && response.status < 300){
                setCategories(response.data);
            }
        }catch(e){
            message.error("Não foi possível carregar as categorias");
        }
    }   

    function calculeDeadline(id){
        const categorySelected = categories.find(category => category.id == id);

        if(categorySelected && categorySelected.sla){
            const sla = categorySelected.sla;
            let unity = "";
            switch(sla.unity){
                case "m":
                    unity = "minutes";
                    break;
                case "h":
                    unity = "hours";
                    break;
                case "d":
                    unity = "days";
                    break;
                case "S":
                    unity = "weeks";
                    break;
                case "M":
                    unity = "months";
                    break;
                case "y":
                    unity = "years";
                    break;
            }
            const date = moment(new Date()).add(sla.time, unity).format("DD/MM/yyyy HH:mm");
            setData({...data, category: { id: id }, dataLimit: date});
            form.setFieldsValue({dataLimit: date});
        }
    }


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

    function handleCategory(value){
        calculeDeadline(value.target.value);
    }

    function handleClearComplement() {
        setData({ ...data, viewFormComplement: false, formComplement: "" });
        form.resetFields();
    }

    function viewComplement(record) {
        setData({ ...data, viewFormComplement: true, formComplement: record.title });
        form.resetFields();
    }

    function addComplement() {
        console.log("Complement click")
        const complement = { key: data.tableComplement.length + 1, title: data.formComplement, user: context.user, date: new Date()};
        setData({ ...data, formComplement: "", tableComplement: [...data.tableComplement, complement], sendComplement: [...data.sendComplement, {key: data.sendComplement.length + 1, complement: data.formComplement, visibleUser: data.complementVisible, attchment : "", user: context.user, date: new Date()}] });
    }

    function removeComplement(record) {
        setData({ ...data, formComplement: "", tableComplement: data.tableComplement.filter(d => d.key !== record.key), sendComplement : data.sendComplement.filter(d => d.key !== record.key)});
    }

    function changeText(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function newDate(){
        return moment(new Date()).format("DD/MM/yy HH:mm")
    }

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
            title: 'Usuário',
            dataIndex: 'user',
            render: (text, record, i) => (<span key={i}>{record.user?.firstName} {record.user?.lastName}</span>)
        },
        {
            title: 'Criação',
            dataIndex: 'date',
            render: (text, record, i) => (<span key={i}>{moment(record.date).format("dd/MM/yy HH:mm")}</span>)
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
    ];

    function handleChangeVisibilityComplment(e){
        setData({...data, complementVisible : e });
    }

    async function searchCEP() {
        const cep = data.cep.split("-").join("").split("_").join("");
        if (cep && cep.length > 0) {
            const response = await axios.get("https://viacep.com.br/ws/" + cep + "/json/", {transformRequest: (data, headers) => {
                delete headers.common['Authorization'];
                return data;
              }
            });
           
            try{
                if(response.status >= 200 && response.status < 300){
                    setData({...data, address: response.data.logradouro, city: response.data.localidade, state: response.data.uf, district: response.data.bairro});
                    setAddress(response.data);
                    form.resetFields();
                }
            }catch(e){
                console.log(e);
                message.error("Não foi possível localizar bairro! ");
                setData({ bairro: "", cep: "", complemento: "", ddd: "", gia: "", ibge: "", localidade: "", logradouro: "", siafi: "", uf: ""});
                setShowMarker(false);
            }


            const geoapi = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + cep + "&key=AIzaSyAqlZil13PZoeh3agIbqcRpxf7mdMwDJ_0", {transformRequest: (data, headers) => {
                delete headers.common['Authorization'];
                return data;
              }
            });
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

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo chamado</h2>
                {!sendForm ? (
                    <Form initialValues={data} onFinish={handleSubmit} form={form} scrollToFirstError>
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
                                        <BasicSelectComponent value={data.category?.id || ''} onChange={ e => handleCategory(e)} dataSource={categories.map(cat => ({option: cat.name, value: cat.id}))} defaultOption={true} />
                                    </Form.Item>
                                </div>
                            </div>
                            {/** another col */}

                            <div className="flex md:flex-row flex-col w-full">
                                <div className="item-group w-full md:mr-2">
                                    <label htmlFor="status" className="font-semibold text-gray-600">Status:</label>
                                    <Form.Item name="status" type="text">
                                        <BasicInputComponent name="status" type="text" placeholder="Informe o status" value={data.status || ''} disabled />
                                    </Form.Item>
                                </div>
                                <div className="item-group w-full md:mr-2">
                                    <div className="flex flex-row w-full">
                                        <div className="w-full md:mr-2">
                                            <label htmlFor="created" className="font-semibold text-gray-600">Data de criação:</label>
                                            <Form.Item name="created" type="text">
                                                <BasicInputComponent name="created" type="text" value={data.created} disabled/>
                                            </Form.Item>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="dataLimit" className="font-semibold text-gray-600">Data limite:</label>
                                            <Form.Item name="dataLimit" type="text">
                                                <BasicInputComponent name="dataLimit" type="text" placeholder="00/00/00 00:00"  onChange={changeText} value={moment(data.dataLimit).format("DD/MM/yyyy HH:mm") || '00/00/00 00:00'} disabled />
                                            </Form.Item>
                                        </div>
                                    </div>

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
                                                        <BasicInputComponent type="text" placeholder="Informe o endereço" name="address" onChange={changeText} value={address.logradouro || ''} disabled />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="district" className="font-semibold text-gray-600">Bairro:</label>
                                                    <Form.Item name="district" rules={[{ required: true, message: "Informe o bairro" }]}>
                                                        <BasicInputComponent type="text" placeholder="Informe o bairro" name="district" onChange={changeText} value={address.bairro || ''} disabled />
                                                    </Form.Item>
                                                </div>
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="city" className="font-semibold text-gray-600">Cidade:</label>
                                                    <Form.Item name="city" rules={[{ required: true, message: "Informe a cidade" }]}>
                                                        <BasicInputComponent type="text" name="city" placeholder="Informe a cidade" onChange={changeText} value={address.localidade || ''} disabled />
                                                    </Form.Item>
                                                </div>
                                                <div className="item-group w-full md:mr-2">
                                                    <label htmlFor="state" className="font-semibold text-gray-600">Estado:</label>
                                                    <Form.Item name="state" rules={[{ required: true, message: "Informe o estado (UF)" }]}>
                                                        <BasicInputComponent type="text" name="state" placeholder="Informe o estado (UF)" onChange={changeText} value={address.uf || ''} disabled />
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
                                                        <BasicInputComponent type="textarea" rows="10" name="formComplement" onChange={changeText} value={data.formComplement || ''} placeholder="Informe o complemento da sua solicitação" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row flex-col w-full">
                                                <div className="item-group w-full">
                                                    <label htmlFor="deadline" className="font-semibold text-gray-600">Mostrar complemento ao usuário:</label>
                                                    <Form.Item>
                                                        <Switch checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} onChange={e => handleChangeVisibilityComplment(e)}  checked={data.complementVisible}/>
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
                                                <BasicSelectComponent value={`${context.user.email} - ${context.user.firstName} ${context.user.lastName}` || ''} disabled={true} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-row flex-col w-full">
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="firstName" className="font-semibold text-gray-600">Nome:</label>
                                            <Form.Item>
                                                <BasicInputComponent name="firstName" placeholder="Insira seu nome" value={context.user.firstName} disabled />
                                            </Form.Item>
                                        </div>
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="lastName" className="font-semibold text-gray-600">Sobrenome:</label>
                                            <Form.Item>
                                                <BasicInputComponent name="lastName" placeholder="Informe o sobrenome" value={context.user.lastName} disabled />
                                            </Form.Item>
                                        </div>
                                        <div className="item-group w-full">
                                            <label htmlFor="cpf" className="font-semibold text-gray-600">CPF:</label>
                                            <Form.Item>
                                                <BasicInputComponent name="cpf" placeholder="Informe o cpf" value={context.user.cpf} disabled />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="flex md:flex-row flex-col w-full">
                                        <div className="item-group w-full md:mr-2">
                                            <label htmlFor="email" className="font-semibold text-gray-600">E-mail:</label>
                                            <Form.Item>
                                                <BasicInputComponent type="email" name="email" placeholder="Informe o e-mail" value={context.user.email} disabled />
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
                ) : (<ActivityResultPage activityNumber="" />)}
            </div>
        </AuthenticatedLayoutComponent>
    )
}
