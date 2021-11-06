import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Transfer, Switch, message } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent, BasicSelectComponent } from "../../../Components";
import { API } from '../../../Services';

function CategoryDetailPage(props) {
  const params = useParams();
  const [form] = Form.useForm();
  const [sla, setSla] = useState([]);
  const [skills, setSkills] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [data, setData] = useState({ id: "", name: "", description: "", active: false, automaticAssignment: false, sla: {}, skills: [], capacities: [] });

  //Transfer tratamentos
  const [targetKeysSkills, setTargetKeysSkills] = useState([]);
  const [selectedKeysSkills, setSelectedKeysSkills] = useState([]);

  //Transfer tratamentos
  const [targetKeysCapacities, setTargetKeysCapacities] = useState([]);
  const [selectedKeysCapacities, setSelectedKeysCapacities] = useState([]);

  const [live, setLive] = useState(false);

  useEffect(() => {
    async function loadData() {
      await loadCategoryInfo();
      await loadSLAs();
      await loadSkills();
      await loadCapacities();
    }
    loadData();
  }, [params, form]);

  useEffect(() => {
    setTargetKeysSkills(data.skills?.map(skill => skill.id));
    setTargetKeysCapacities(data.capacities?.map(capacity => capacity.id));
  }, [data]);

  async function loadCategoryInfo() {
    try {
      const response = await API().get(`/api/categories/${params.id}`);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        setData(response.data);
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
      message.error("Erro ao carregar informações da categoria.");
    }
  }

  async function loadSLAs() {
    try {
      const response = await API().get(`/api/slas`);
      if (response.status >= 200 && response.status < 300) {
        setSla(response.data);
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
      message.error("Erro ao carregar SLAs.");
    }
  }

  async function loadSkills() {
    try {
      const response = await API().get('/api/skills');
      if (response.status >= 200 && response.status < 300) {
        setSkills(response.data?.map(skill => ({ key: skill.id, title: skill.name, description: skill.description })));
      }
    } catch (e) {
      console.log(e);
      message.error("Não foi possível carregar os SLA's!");
    }
  }

  async function loadCapacities() {
    try {
      const response = await API().get('/api/capacities');
      if (response.status >= 200 && response.status < 300) {
        setCapacities(response.data?.map(capacity => ({ key: capacity.id, title: capacity.name, description: capacity.description })));
      }
    } catch (e) {
      console.log(e);
      message.error("Não foi possível carregar os SLA's!");
    }
  }

  async function handleSubmit() {
    try {
      const response = await API().put(`/api/categories/${params.id}`, {
        name: data.name,
        description: data.description,
        active: data.active,
        sla: data.sla,
        skills: skills.filter(u => targetKeysSkills.includes(u.key)).map(s => ({ id: s.key })),
        capacities: capacities.filter(c => targetKeysCapacities.includes(c.key)).map(c => ({ id: c.key })),
        automaticAssignment : data.automaticAssignment
      });
      if (response.status >= 200 && response.status < 300) {
        message.success("Categoria atualizada com sucesso!");
      }
    } catch (e) {
      console.log(e);
      message.error("Erro ao atualizar categoria.");
    }
  }

  function onChangeText(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const onChangeSkills = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeysSkills(nextTargetKeys);
  };

  const onSelectChangeSkills = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeysSkills([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onChangeCapacities = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeysCapacities(nextTargetKeys);
  };

  const onSelectChangeCapacities = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeysCapacities([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  function toggleActive(e) {
    setData({ ...data, active: e })
  }

  function changeSLA(event) {
    setData({ ...data, sla: { id: event.target.value } });
  }

  function removeSLA() {
    setData({ ...data, sla: null })
    message.info("SLA Removido. A Alteração será refletida apenas quando salvar!")
  }

  function toggleActiveAutomaticAssignment(e){
    setData({ ...data, automaticAssignment: e })
  }

  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhe da categoria</h2>
        <Form form={form} onFinish={handleSubmit} initialValues={data} scrollToFirstError>
          <label htmlFor="name" className="font-semibold text-gray-600">Nome da categoria:</label>
          <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome da categoria' }]}>
            <BasicInputComponent name="name" type="text" placeholder="Informe o nome da categoria" value={data.name || ''} onChange={e => onChangeText(e)} />
          </Form.Item>
          <label htmlFor="description" className="font-semibold text-gray-600">Descrição da categoria:</label>
          <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição da categoria' }]}>
            <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição da categoria" value={data.description || ''} onChange={e => onChangeText(e)} />
          </Form.Item>

          <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">Categoria ativa? </label>
          <Form.Item>
            <Switch checked={data.active} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
          </Form.Item>

          <label htmlFor="automaticAssignment" className="font-semibold text-gray-600 mr-2">Atribuir atividades automaticamente? </label>
          <Form.Item>
            <Switch checked={data.automaticAssignment} onChange={e => toggleActiveAutomaticAssignment(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
          </Form.Item>

          <label htmlFor="description" className="font-semibold text-gray-600">Selecionar SLA:</label>
          <Form.Item>
            <BasicSelectComponent name="sla" onChange={e => changeSLA(e)} value={data.sla?.id} dataSource={sla.map(sla => ({ option: sla.name, value: sla.id }))} palceholder="Seleciona o SLa desta categoria" />
          </Form.Item>
          <span className="text-blue-500 hover:text-blue-400 focus:text-blue-400 cursor-pointer" onClick={removeSLA}>Remover SLA</span>

          <div className="flex flex-col lg:flex-row lg:items-center justify-start my-5">
            <div className="lg:mr-10 md:mb-2">
              <label className="font-semibold text-gray-600"> Adicionar habilidades</label>
              <Transfer dataSource={skills} titles={["Todas as habilidades", "Habilidades selecionadas"]} targetKeys={targetKeysSkills} selectedKeys={selectedKeysSkills} onChange={onChangeSkills} onSelectChange={onSelectChangeSkills} render={(item) => item.title} />
            </div>
            <div>
              <label className="font-semibold text-gray-600"> Adicionar capacidades:</label>
              <Transfer dataSource={capacities} titles={["Todas as capacidades", "Capacidades selecionadas"]} targetKeys={targetKeysCapacities} selectedKeys={selectedKeysCapacities} onChange={onChangeCapacities} onSelectChange={onSelectChangeCapacities} render={(item) => item.title} />
            </div>
          </div>
          <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
          <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
        </Form>
      </div>
    </AuthenticatedLayoutComponent>
  );
}

export default CategoryDetailPage;