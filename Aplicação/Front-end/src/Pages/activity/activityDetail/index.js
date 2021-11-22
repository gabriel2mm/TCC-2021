import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { Form, Upload, message, Button, Tabs, Table, Rate, Switch } from 'antd';
import { AuthenticatedLayoutComponent, BasicInputComponent, BasicInputMaskComponent, BasicSelectComponent, ButtonComponent } from '../../../Components'
import { UploadOutlined, ClearOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axios from 'axios';
import AddressMapComponent from '../maps/addressMap';
import ActivityResultPage from '../activityResult';
import SignatureCanvas from 'react-signature-canvas';
import { API } from '../../../Services';
import moment from 'moment';
import { useUserContext } from '../../../Contexts';


export default function ActivityDetailPage() {
  const signatureRef = useRef();
  const context = useUserContext();
  const params = useParams();
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [sendForm, setSendForm] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  const [historyDataSource, setHistoryDataSource] = useState([]);
  const [location, setLocation] = useState({ lat: -25.475174 || 0, lng: -49.2807627 || 0 });
  const [data, setData] = useState({ activity: "", description: "", assigned: {}, created: new Date(), dateLimit: new Date(), viewFormComplement: false, formComplement: "", tableComplement: [], complementVisible: true, rate: 0, signature: "" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    await getData();

    if (context.containsPermission("Admin") || context.containsPermission("activities")) {
      loadUsers();
    }

    //await getHistory();
    form.resetFields();
  }

  async function getData() {
    setLoading(true);
    try {
      const response = await API().get(`/api/activities/${params.id}`);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
        setData(
          {
            ...data,
            activity: response.data?.number,
            description: response.data?.description,
            created: moment(response.data?.created).format("DD/MM/yy HH:mm"),
            dateLimit: moment(response.data?.dateLimit).format("DD/MM/yy HH:mm"),
            tableComplement: context.containsPermission("Admin") || context.containsPermission("activities") ? response.data?.complements.map(item => ({ key: item.id, id: item.id, title: item.complement, user: item.createdBy, date: item.created })) : response.data?.complements.map(item => ({ key: item.id, id: item.id, title: item.complement, user: item.createdBy, date: item.created, visibleUser: item.visibleUser })).filter(item => item.visibleUser == true),
            category: response.data?.category,
            status: response.data?.status,
            assigned: response.data?.assigned,
            cep: response.data?.address?.cep,
            complement: response.data?.address?.complement,
            number: response.data?.address?.number,
            address: response.data?.address.address,
            city: response.data?.address?.city,
            state: response.data?.address?.state,
            district: response.data?.address?.district,
            requester: response.data?.requester,
            rate: response.data.proof?.rate,
            signature: response.data.proof?.signature,
            dateClosed: response.data?.dateClosed,
            createdBy: response.data?.createdBy,
          });
        setLocation({ lat: parseFloat(response.data?.address?.lat), lng: parseFloat(response.data?.address?.lng) });
        setShowMarker(true);
      }
    } catch (e) {
      console.log(e);
      message.error("Não foi possível carregar informações da atividade!")
    }
  }

  async function loadUsers() {
    try {
      const response = await API().get(`/api/users`);
      if (response.status >= 200 && response.status < 300) {
        setUsers(response.data.filter(user => user.active === true));
      }
    } catch (e) {
      message.error("Não foi possível carregar os usuários!")
    }
  }

  async function handleSubmit() {


    try {
      const response = await API().put(`/api/activities/${params.id}`, {
        number: data.activity,
        status: data.status,
        description: data.description,
        attachment: "",
        category: data.category,
        assigned: data.assigned,
        complements: data.tableComplement,
        proof: {
          rate: data.rate,
          signature: signatureRef.current?.toDataURL() || ""
        }
      });

      if (response.status >= 200 && response.status < 300) {
        message.success("Atividade atualizada com sucesso!");
      }
    } catch (e) {
      console.log(e);
      message.error("Não foi possível atualizar atividade");
    }
  }


  function getHistory() {
    const response = axios.get("https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/Organization/1/category/1/activity/1/history");

    response.then(response => {
      setHistoryDataSource(response.data || []);
    }).catch(err => {
      message.error("Não foi possível carregar o histórico desta atividade!");
    })
  }

  async function updateStatus(status) {
    try {
      const response = await API().get(`/api/activities/status-activity/${params.id}?status=${status}`);
      if (response.status >= 200 && response.status < 300) {
        message.info("Atividade Iniciada!");
      }
    } catch (e) {
      message.error("Não foi possível atualizar status da atividade");
    }
  }

  function handleChangeTab(event) {
    setTimeout(() => {
      if (event == 4) {
        signatureRef.current?.fromDataURL(data.signature);
      }
    }, 200);
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

  function handleClearComplement() {
    setData({ ...data, viewFormComplement: false, formComplement: "" });
    form.resetFields();
  }

  function viewComplement(record) {
    setData({ ...data, viewFormComplement: true, formComplement: record.title });
    form.resetFields();
  }

  function addComplement() {
    const complement = { key: data.tableComplement.length + 1, title: data.formComplement, complement: data.formComplement, visibleUser: data.complementVisible, user: context.user, date: new Date(), attchment: "", createdBy: context.user };
    setData({ ...data, formComplement: "", tableComplement: [...data.tableComplement, complement] });
    form.resetFields();
  }

  function changeRate(value) {
    setData({ ...data, rate: value });
  }

  function removeComplement(record) {
    setData({ ...data, formComplement: "", tableComplement: data.tableComplement.filter(d => d.key !== record.key) });
  }

  function changeText(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleChangeVisibilityComplment(e) {
    setData({ ...data, complementVisible: e });
  }

  function handleChangeUser(event) {
    setData({ ...data, assigned: { id: event.target.value } });
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
      render: (text, record, i) => (<span key={i}>{moment(record.date).format("DD/MM/yy HH:mm")}</span>)
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

  const colsHistory = [
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Usuário',
      dataIndex: 'User',
      key: 'User',
    },
    {
      title: 'Data Atualização',
      dataIndex: 'created',
      key: 'created',
      render: (text, render, i) => <span>{text}</span>
    },
  ];


  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhe atividade</h2>
        {!sendForm ? (
          <Form initialValues={data} onFinish={handleSubmit} form={form} scrollToFirstError>
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full justify-end">

                {context.user?.id === data.assigned?.id && data.status === "ABERTO" && (context.containsPermission("Admin") || context.containsPermission("receive:activity") || context.containsPermission("activities")) ? (
                  <button type="button" onClick={e => updateStatus("EM_ANDAMENTO")} title="Iniciar atividade" className="mx-1  px-2  flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded h-8 cursor-pointer">
                    Iniciar atividade
                  </button>
                ) : (null)}

                {context.user?.id === data.assigned?.id && data.status === "EM_ANDAMENTO" && (context.containsPermission("Admin") || context.containsPermission("receive:activity") || context.containsPermission("activities")) ? (
                  <button type="button" onClick={e => updateStatus("CONCLUIDO")} title="Fechar atividade" className="mx-1  px-2  flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded h-8 cursor-pointer">
                    Finalizar atividade
                  </button>
                ) : (null)}

              </div>
              <div className="flex md:flex-row flex-col w-full">
                <div className="item-group w-full md:mr-2">
                  <label htmlFor="activity" className="font-semibold text-gray-600">Atividade:</label>
                  <Form.Item name="activity" type="text">
                    <BasicInputComponent name="activity" placeholder={data.activity || "W0000000000"} onChange={changeText} value={data.number || ''} disabled />
                  </Form.Item>
                </div>
                <div className="item-group w-full md:mr-2">
                  <label htmlFor="activity" className="font-semibold text-gray-600">Categoria:</label>
                  <Form.Item>
                    <BasicSelectComponent disabled={true} value={data.category?.name} dataSource={[{ option: data.category?.name, value: data.category?.id }]} />
                  </Form.Item>
                </div>
              </div>

              <div className="flex md:flex-row flex-col w-full">
                <div className="item-group w-full md:mr-2">
                  <label htmlFor="status" className="font-semibold text-gray-600">Status:</label>
                  <Form.Item name="status" type="text">
                    <BasicInputComponent placeholder="Informe o status" value={data.status} disabled />
                  </Form.Item>
                </div>
                <div className="item-group w-full md:mr-2">
                  <div className="flex flex-row w-full">
                    <div className="w-full md:mr-2">
                      <label htmlFor="created" className="font-semibold text-gray-600">Data de criação:</label>
                      <Form.Item name="created" type="text">
                        <BasicInputComponent name="created" type="text" value={data.created} disabled />
                      </Form.Item>
                    </div>
                    <div className="w-full">
                      <label htmlFor="dateLimit" className="font-semibold text-gray-600">Data limite:</label>
                      <Form.Item name="dateLimit" type="text">
                        <BasicInputComponent name="dateLimit" type="text" value={data.dateLimit} disabled />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>

              {data.status === "ABERTO" && context.containsPermission("Admin") || context.containsPermission("activities") ? (
                <div className="flex md:flex-row flex-col w-full">
                  <div className="item-group w-full md:mr-2">
                    <label htmlFor="requester" className="font-semibold text-gray-600">Usuário atribuído:</label>
                    <Form.Item>
                      <BasicSelectComponent defaultOption={true} onChange={handleChangeUser} value={data.assigned?.id} dataSource={users.map(user => ({ option: `${user.firstName} ${user.lastName} - ${user.email}`, value: user.id }))} />
                    </Form.Item>
                  </div>
                </div>
              ) : (null)}

              {data.status !== "ABERTO" && (!context.containsPermission("Admin") && !context.containsPermission("activities")) ? (
                <div className="flex md:flex-row flex-col w-full">
                  <div className="item-group w-full md:mr-2">
                    <label htmlFor="requester" className="font-semibold text-gray-600">Usuário atribuído:</label>
                    <Form.Item>
                      <BasicSelectComponent value={`${data.assigned?.firstName || ''} ${data.assigned?.lastName || ''} - ${data.assigned?.email}`} disabled />
                    </Form.Item>
                  </div>
                </div>
              ) : (null)}


              <div className="flex md:flex-row flex-col w-full">
                <div className="item-group w-full">
                  <label htmlFor="description" className="font-semibold text-gray-600">Descrição:</label>
                  <Form.Item name="description">
                    <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição do problema" rows="10" value={data.description} onChange={changeText} disabled />
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

            <Tabs defaultActiveKey="1" onChange={handleChangeTab}>
              <TabPane tab="Endereço" key="1">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <div className="flex flex-col w-full">
                      <div className="flex md:flex-row flex-col w-full">
                        <div className="item-group w-full md:mr-2">
                          <label htmlFor="cep" className="font-semibold text-gray-600">CEP:</label>
                          <Form.Item name="cep" rules={[{ required: true, message: "Informe o cep" }]}>
                            <BasicInputMaskComponent name="cep" mask="99999-999" placeholder="Informe o CEP. Ex.: 00000-000" value={data.address?.cep} disabled />
                          </Form.Item>
                        </div>
                        <div className="item-group w-full md:mr-2">
                          <label htmlFor="address" className="font-semibold text-gray-600">Endereço:</label>
                          <Form.Item name="address">
                            <BasicInputComponent type="text" placeholder="Informe o endereço" name="address" value={data.address?.address} disabled />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex md:flex-row flex-col w-full">
                        <div className="item-group w-full md:mr-2">
                          <label htmlFor="district" className="font-semibold text-gray-600">Bairro:</label>
                          <Form.Item name="district" rules={[{ required: true, message: "Informe o bairro" }]}>
                            <BasicInputComponent type="text" placeholder="Informe o bairro" name="district" onChange={changeText} value={data.address?.district} disabled />
                          </Form.Item>
                        </div>
                        <div className="item-group w-full md:mr-2">
                          <label htmlFor="city" className="font-semibold text-gray-600">Cidade:</label>
                          <Form.Item name="city" rules={[{ required: true, message: "Informe a cidade" }]}>
                            <BasicInputComponent type="text" name="city" placeholder="Informe a cidade" value={data.address?.city} disabled />
                          </Form.Item>
                        </div>
                        <div className="item-group w-full md:mr-2">
                          <label htmlFor="state" className="font-semibold text-gray-600">Estado:</label>
                          <Form.Item name="state" rules={[{ required: true, message: "Informe o estado (UF)" }]}>
                            <BasicInputComponent type="text" name="state" placeholder="Informe o estado (UF)" value={data.address?.state} disabled />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex md:flex-row flex-col w-full">
                        <div className="item-group w-full md:mr-2">
                          <label htmlFor="complement" className="font-semibold text-gray-600">Complemento:</label>
                          <Form.Item name="complement">
                            <BasicInputComponent type="text" name="complement" placeholder="Informe o complemento. (Opcional)" onChange={changeText} value={data.address?.complement} disabled />
                          </Form.Item>
                        </div>
                        <div className="item-group w-full md:mr-2">
                          <label htmlFor="number" className="font-semibold text-gray-600">Número:</label>
                          <Form.Item name="number" type="number" rules={[{ required: true, message: "Informe o número do endereço" }]}>
                            <BasicInputComponent type="text" name="number" placeholder="Informe o número do endereço" onChange={changeText} value={data.address?.number} disabled />
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
                          {data.status !== "FECHADO" ? (
                            <>
                              <label htmlFor="formComplement" className="font-semibold text-gray-600">Complemento:</label>
                              <Form.Item>
                                <BasicInputComponent type="textarea" rows="10" name="formComplement" onChange={changeText} value={data.formComplement} placeholder="Informe o complemento da sua solicitação" />
                              </Form.Item>
                            </>
                          ) : (null)}

                        </div>
                      </div>

                      {data.status !== "FECHADO" && (context.containsPermission("Admin") || context.containsPermission("activities")) ? (
                        <div className="flex md:flex-row flex-col w-full">
                          <div className="item-group w-full">
                            <label htmlFor="deadline" className="font-semibold text-gray-600">Mostrar complemento ao usuário:</label>
                            <Form.Item>
                              <Switch checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} checked={data.complementVisible} onChange={handleChangeVisibilityComplment} />
                            </Form.Item>
                          </div>
                        </div>
                      ) : (null)}

                      {data.status !== "FECHADO" ? (
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
                      ) : (null)}

                    </div>
                    {!data.viewFormComplement && data.status !== "FECHADO" ? (<ButtonComponent type="button" name="add" className="float-right mb-5" onClick={addComplement}>Adicionar</ButtonComponent>) : (null)}
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
                        <BasicSelectComponent value={`${data.requester?.firstName || ''} ${data.requester?.lastName || ''} - ${data.requester?.email || ''}`} disabled />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col w-full">
                    <div className="item-group w-full md:mr-2">
                      <label htmlFor="firstName" className="font-semibold text-gray-600">Nome:</label>
                      <Form.Item>
                        <BasicInputComponent name="firstName" placeholder="Insira seu nome" value={data.requester?.firstName || ''} disabled />
                      </Form.Item>
                    </div>
                    <div className="item-group w-full md:mr-2">
                      <label htmlFor="lastName" className="font-semibold text-gray-600">Sobrenome:</label>
                      <Form.Item>
                        <BasicInputComponent name="lastName" placeholder="Informe o sobrenome" value={data.requester?.lastName || ''} disabled />
                      </Form.Item>
                    </div>
                    <div className="item-group w-full">
                      <label htmlFor="cpf" className="font-semibold text-gray-600">CPF:</label>
                      <Form.Item>
                        <BasicInputComponent name="cpf" placeholder="Informe o cpf" value={data.requester?.cpf || ''} disabled />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col w-full">
                    <div className="item-group w-full md:mr-2">
                      <label htmlFor="email" className="font-semibold text-gray-600">E-mail:</label>
                      <Form.Item>
                        <BasicInputComponent type="email" name="enail" placeholder="Informe o e-mail" value={data.requester?.email || ''} disabled />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </TabPane>
              {(data.status === "CONCLUIDO" || data.status === "FECHADO") && context.user.id == data.createdBy.id ? (
                <TabPane tab="Comprovante" key="4">
                  <label htmlFor="signature" className="font-semibold text-gray-600">Data de fechamento:</label>
                  <Form.Item>
                    <BasicInputComponent value={moment(data.dateClosed).format("DD/MM/yy HH:mm")} placeholder="Informe de encerramento" disabled />
                  </Form.Item>
                  <label htmlFor="signature" className="font-semibold text-gray-600">Avaliação do atendimento</label>
                  <Form.Item>
                    <Rate onChange={changeRate} value={data.rate} />
                  </Form.Item>
                  <label htmlFor="signature" className="font-semibold text-gray-600">Assinatura eletronica:</label>
                  <Form.Item>
                    <SignatureCanvas penColor='blue' ref={signatureRef} canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
                    <button type="button" title="Limpar" className="mx-1  flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => signatureRef.current.clear()}>
                      <ClearOutlined />
                    </button>
                  </Form.Item>
                </TabPane>
              ) : null}

              {context.containsPermission("Admin") || context.containsPermission("activities") ? (
                <TabPane tab="Histórico" key="5">
                  <Table rowKey={record => record.id} dataSource={historyDataSource} columns={colsHistory} className="mb-5" />
                </TabPane>
              ) : (null)}
            </Tabs>

            <Form.Item>
              {data.status !== "FECHADO" && context.containsPermission("Admin") || context.containsPermission("activities") || context.containsPermission("write:activities") || context.containsPermission("receive:activity") ? (<ButtonComponent name="save" type="submit">Atualizar</ButtonComponent>) : null}
              <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
            </Form.Item>


          </Form>
        ) : (<ActivityResultPage activityNumber="W01231213213" />)}
      </div>
    </AuthenticatedLayoutComponent>
  )
}
