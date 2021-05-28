import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Transfer, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent, BasicSelectComponent } from "../../../Components";
import axios from 'axios';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

const initialTargetKeys = mockData
  .filter((item) => +item.key > 10)
  .map((item) => item.key);

function CategoryDetailPage(props) {
  const [form] = Form.useForm();
  const [dataSLA, setDataSLA] = useState([{}])
  const [data, setData] = useState({id: "", category: "", description: "", status: ""});
  const params = useParams();

  useEffect(() => {
    async function fetchProfile() {
      const response = await axios.get(
        `https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/screens/${params.id}`
      );
      if (response.status >= 200 && response.status < 300) {
        const tmpSLA = [];
        setData(response.data);
        response.data.sla.map(r=>
          tmpSLA.push({option: r.sla, value: r.sla})
        )
        setDataSLA(tmpSLA);
        form.resetFields();
      }
    }

    if (params && params.id) {
      fetchProfile();
    }
  }, [params, form]);

  function onChangeText(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

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
        <h2 className="text-2xl font-bold text-gray-800 my-5">Detalhe da categoria</h2>
        <Form form={form} initialValues={data} scrollToFirstError>
          <label htmlFor="category" className="font-semibold text-gray-600">Nome da categoria:</label>
          <Form.Item name="category" type="text" rules={[{ required: true, message: 'Insira o nome da categoria' }]}>
            <BasicInputComponent name="category" type="text" placeholder="Informe o nome da categoria" value={data.category} onChange={e => onChangeText(e)} />
          </Form.Item>
          <label htmlFor="description" className="font-semibold text-gray-600">Descrição da categoria:</label>
          <Form.Item name="description" type="textarea" rules={[{ required: true, message: 'Insira a descrição da categoria' }]}>
            <BasicInputComponent name="category" type="textarea" placeholder="Informe a descrição da categoria" value={data.description} onChange={e => onChangeText(e)} />
          </Form.Item>
          
          <label htmlFor="Ativo" className="font-semibold text-gray-600 mr-2">Categoria ativa? </label>
          <Form.Item>
            <Switch checked={data.status !== "suspended"} onChange={e => toggleActive(e)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
          </Form.Item>

          <label htmlFor="description" className="font-semibold text-gray-600">Selecionar SLA:</label>
          <Form.Item>
            <BasicSelectComponent name="sla" dataSource={dataSLA} palceholder="Seleciona o SLa desta categoria"/>
          </Form.Item>
          <span className="text-blue-500 hover:text-blue-400 focus:text-blue-400 cursor-pointer">Remover SLA</span>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-start my-5">
            <div className="lg:mr-10 md:mb-2">
              <label className="font-semibold text-gray-600"> Adicionar habilidades</label>
              <Transfer dataSource={mockData} titles={["Habilidades Selecionadas", "Todas as habilidades"]} targetKeys={targetKeys} selectedKeys={selectedKeys} onChange={onChange} onSelectChange={onSelectChange} render={(item) => item.title} />
            </div>
            <div>
              <label className="font-semibold text-gray-600"> Adicionar capacidades:</label>
              <Transfer dataSource={mockData} titles={["Habilidades Selecionadas", "Todas as habilidades"]} targetKeys={targetKeys} selectedKeys={selectedKeys} onChange={onChange} onSelectChange={onSelectChange} render={(item) => item.title} />
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