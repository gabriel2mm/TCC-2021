import React, { useState, useEffect } from "react";
import { Divider, Switch } from 'antd';
import { AuthenticatedLayoutComponent, BasicInputComponent, BasicSelectComponent } from '../../Components';
import { GroupOutlined, SolutionOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

function NewGroupPage() {

    const [selectData, setSelectData] = useState({ viagem: false, groupPermit: false });

    useEffect(() => {
        console.log(selectData);
    }, [selectData]);

    function handleChangeSelect(isSelected, name) {
        console.log(isSelected, name);
        setSelectData({ ...selectData, [name]: isSelected });
    }


    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Novo perfil de acesso</h2>

                <form>
                    <div className="my-2">
                        <label htmlFor="newGroup" className="text-gray-700 font-bold">
                            Nome do grupo:
                         </label>
                        <BasicInputComponent
                            type="text"
                            name="newGroup"
                            placeholder="Insira o nome do grupo"
                            className="w-full"
                        />
                    </div>
                    <div className="my-2 flex flex-col">
                        <label htmlFor="group-description" className="text-gray-700 font-bold">
                            Descrição do grupo:
                    </label>
                        <BasicInputComponent
                            type="textarea"
                            name="groupDescription"
                            placeholder="Descritivo do grupo"
                            className=" w-full"
                        />
                    </div>

                    <div><Divider /></div>

                    <div className="flex flex-col md:flex-row justify-arround w-full md:space-x-2">
                        <div className="my-2 w-full min-w-max">
                            <label htmlFor="create-tech-group" className="text-gray-700 font-bold">
                                Local:
                        </label>
                            <BasicSelectComponent name="local" dataSource={[{ value: 'Teste', option: 'Teste' }, { value: 'Teste 2', 'option': "Teste2" }]} />
                        </div>
                        <div className="my-2 w-full min-w-max">
                            <label htmlFor="create-tech-group" className="text-gray-700 font-bold">
                                Habilidade:
                        </label>
                            <BasicSelectComponent name="habilidade" dataSource={[{ value: 'Habilite2', option: 'Habilite2' }, { value: 'Habilidade3', 'option': "Habilidade3" }]} />
                        </div>
                        <div className="my-2 w-full min-w-max">
                            <label htmlFor="create-tech-group" className="text-gray-700 font-bold">
                                Perfil:
                        </label>
                            <BasicSelectComponent name="habilidade" dataSource={[{ value: 'perfil1', option: 'perfil1' }, { value: 'perfil2', 'option': "perfil2" }]} />
                        </div>



                    </div>

                    <div className="flex flex-wrap flex-row justify-start space-x-8">
                        <div className="my-2 flex-none">
                            <label htmlFor="create-tech-group" className="text-gray-700 font-bold mr-2">
                                Permitir viagens?
                        </label>
                            <Switch name="viagem" onChange={isSelected => handleChangeSelect(isSelected, "viagem")} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                        </div>
                        <div className="my-2 flex-none">
                            <label htmlFor="create-tech-group" className="text-gray-700 font-bold mr-2">
                                Mostrar grupos?
                        </label>
                            <Switch name="groupPermit" onChange={isSelected => handleChangeSelect(isSelected, "groupPermit")} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                        </div>
                    </div>
                    <div><Divider /></div>
                </form>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default NewGroupPage;