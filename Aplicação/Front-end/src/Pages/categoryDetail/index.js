import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Transfer } from "antd";
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from "../../Components";
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
  const [componentSize, setComponentSize] = useState("default");
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchProfile() {
      const responseCategory = await axios.get(
        `https://6096c51f116f3f00174b394c.mockapi.io/category/${params.id}`
      );
      if (responseCategory.status >= 200 && responseCategory.status < 300) {
        setData(responseCategory.data);
        console.log(responseCategory);
      }
    }

    if (params && params.id) {
      fetchProfile();
    }
  }, [params]);

  function onChangeText(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    // console.log("targetKeys:", nextTargetKeys);
    // console.log("direction:", direction);
    // console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // console.log("sourceSelectedKeys:", sourceSelectedKeys);
    // console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const classBase =
    "w-full py-2 border-2 border-gray-200 rounded-lg placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-purple-600 transition-colors duration-300";


  return (
    <div className="md:container md:mx-auto">
      <AuthenticatedLayoutComponent>
        <div className="justify-items-center">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            <div className="flex flex-col ...">
              <div className="w-full flex space-x-4 ... ">
                <label className="w-1/2 ">
                  Nome:
                  <BasicInputComponent name="nome" type="text" value={data.name} onChange={e => onChangeText(e)} />
                </label>
                <label className="w-1/2 ">
                  Descrição:
                  <BasicInputComponent name="nome" type="text" value={data.descricao} onChange={e => onChangeText(e)} />
                </label>
              </div>

              <div className="w-full flex space-x-4 ... py-5 ">
                <label className="w-1/3 ">
                  Adicionar SLA:
                  <select placeholder="Adicionar SLA" options={data.sla} className={classBase}>
                    <option value="qualquer"></option>
                  </select>
                </label>
              </div>
              <div className="my-10 ...">
                <label>
                  Adicionar Habilidades
                  <Transfer
                    className="justify-between ..."
                    listStyle={{
                      width: 550,
                      height: 300,
                    }}
                    dataSource={mockData}
                    titles={["Source", "Target"]}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    render={(item) => item.title}
                  />
                </label>
              </div>
              <div className="w-full">
                <ButtonComponent
                  type="button"
                  className={`${props.className}bg-green-400 float-right m-4`}
                >
                  Salvar
                </ButtonComponent>
              </div>
            </div>
          </Form>
        </div>
      </AuthenticatedLayoutComponent>
    </div>
  );
}

export default CategoryDetailPage;