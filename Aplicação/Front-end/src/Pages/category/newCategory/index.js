import React, { useEffect, useState } from 'react';
import { Form, message, Transfer } from "antd";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent, BasicSelectComponent } from "../../../Components";
import { API } from '../../../Services';

function NewCategoryPage() {

  const [form] = Form.useForm();
  const [data, setData] = useState({name: '', description: '', active: true, skills: [], capacities: []});
  const [dataSLA, setDataSLA] = useState([{}])
  const [skills, setSkills] = useState([]);
  const [capacities, setCapacities] = useState([]);

  //Transfer tratamentos
  const [targetKeysSkills, setTargetKeysSkills] = useState([]);
  const [selectedKeysSkills, setSelectedKeysSkills] = useState([]);

  //Transfer tratamentos
  const [targetKeysCapacities, setTargetKeysCapacities] = useState([]);
  const [selectedKeysCapacities, setSelectedKeysCapacities] = useState([]);
  
  useEffect(() => {
    async function initialise(){
      await loadSLA();
      await loadSkills();
      await loadCapacities();
    }
    initialise();
  }, []);

  async function loadSkills(){
    try{
      const response = await API().get('/api/skills');
      if(response.status >= 200 && response.status < 300){
        setSkills(response.data?.map(skill => ({ key: skill.id , title: skill.name, description: skill.description} )));
      }
    }catch(e){
      console.log(e);
      message.error("Não foi possível carregar os SLA's!");
    }
  }

  async function loadCapacities(){
    try{
      const response = await API().get('/api/capacities');
      if(response.status >= 200 && response.status < 300){
        setCapacities(response.data?.map(capacity => ({ key: capacity.id , title: capacity.name, description: capacity.description} )));
      }
    }catch(e){
      console.log(e);
      message.error("Não foi possível carregar os SLA's!");
    }
  }

  async function loadSLA(){
    try{
      const response = await API().get('/api/slas');
      if(response.status >= 200 && response.status < 300){
        setDataSLA(response.data);
      }
    }catch(e){
      console.log(e);
      message.error("Não foi possível carregar os SLA's!");
    }
  }

  async function handleSubmit(event){
    try{
      const response = await API().post("/api/categories", { name: data.name, description: data.description, active: data.active, skills: data.skills, capacities: data.capacities, sla: data.sla});
      if(response.status >= 200 && response.status < 300){
        message.success("Categoria criado com sucesso!");
        setData({name: '', description: '', active: true, skills: [], capacities: []});
        setTargetKeysSkills([]);
        setSelectedKeysSkills([]);
        setTargetKeysCapacities([]);
        setSelectedKeysCapacities([]);
        loadSkills();
        loadCapacities();
        loadSLA();
        form.resetFields();
      }
    }catch(e){
      console.log(e);
      message.error("Não foi possível criar categoria!");
    }
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

  function onChangeText(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  function changeSLA(event){
    setData({...data, sla: { id: event.target.value }});
  }

  function removeSLA(){
    setData({...data, sla : null})
    message.info("SLA Removido. A Alteração será refletida apenas quando salvar!")
  }


  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Nova Categoria</h2>
        <Form form={form} onFinish={handleSubmit} scrollToFirstError>
          <label htmlFor="name" className="font-semibold text-gray-600">Nome da categoria:</label>
          <Form.Item name="name" type="text" rules={[{ required: true, message: 'Insira o nome da categoria' }]}>
            <BasicInputComponent name="name" type="text" placeholder="Informe o nome da categoria" value={data.name || ''} onChange={e => onChangeText(e)} />
          </Form.Item>
          <label htmlFor="description" className="font-semibold text-gray-600">Descrição da categoria:</label>
          <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição da categoria' }]}>
            <BasicInputComponent name="description" type="textarea" placeholder="Informe a descrição da categoria" value={data.descricao || ''} onChange={e => onChangeText(e)} />
          </Form.Item>
          <label htmlFor="sla" className="font-semibold text-gray-600">Selecionar SLA:</label>
          <Form.Item>
            <BasicSelectComponent value={data.sla?.id} onChange={changeSLA} defaultOption={true} name="sla" dataSource={dataSLA.map(sla => ({option: sla.name, value: sla.id}))} palceholder="Seleciona o SLa desta categoria" />
          </Form.Item>
          <span className="text-blue-500 hover:text-blue-400 focus:text-blue-400 cursor-pointer" onClick={removeSLA}>Remover SLA</span>

          <div className="flex flex-col lg:flex-row lg:items-center justify-start my-5">
            <div className="lg:mr-10 md:mb-2">
              <label className="font-semibold text-gray-600"> Adicionar habilidades</label>
              <Transfer 
                dataSource={skills} 
                titles={["Habilidades Selecionadas", "Todas as habilidades"]} 
                targetKeys={targetKeysSkills} 
                selectedKeys={selectedKeysSkills} 
                onChange={onChangeSkills} 
                onSelectChange={onSelectChangeSkills} 
                render={(item) => item.title} 
              />
            </div>
            <div>
              <label className="font-semibold text-gray-600"> Adicionar capacidades:</label>
              <Transfer 
                dataSource={capacities} 
                titles={["Habilidades Selecionadas", "Todas as habilidades"]} 
                targetKeys={targetKeysCapacities} 
                selectedKeys={selectedKeysCapacities} 
                onChange={onChangeCapacities} 
                onSelectChange={onSelectChangeCapacities} 
                render={(item) => item.title} />
            </div>
          </div>

          <ButtonComponent name="save" type="submit">Salvar</ButtonComponent>
          <span onClick={() => window.history.back()} className="ml-5 text-blue-500 hover:text-blue-400 cursor-pointer">Cancelar</span>
        </Form>
      </div>
    </AuthenticatedLayoutComponent>
  );
}

export default NewCategoryPage;