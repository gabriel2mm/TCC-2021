import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticatedLayoutComponent, BasicInputComponent, ButtonComponent } from '../../Components';
import { Form } from 'antd';
import axios from 'axios';

function ProfileDetailPage() {
    const [data, setData] = useState({});
    const params = useParams();

    useEffect(() => {
        async function fetchProfile() {
            const response = await axios.get(`https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/profiles/${params.id}`);
            if (response.status >= 200 && response.status < 300) {
                setData(response.data);
            }
        }

        if(params && params.id){
            fetchProfile();
        }

    }, []);

    function onChangeText(event){
        setData({ ...data, [event.target.name] : event.target.value})
    }

    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h1 className="text-xl text-gray-800 font-bold mb-10">Detalhe perfil de acesso</h1>
                
                <Form>
                    <Form.Item>
                        <label htmlFor="profile" className="font-semibold text-gray-600">Nome do perfil</label>
                        <BasicInputComponent name="profile" type="text" placeholder="Informe o nome do perfil" value={data.profile} onChange={e => onChangeText(e)}/>
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor="profile" className="font-semibold text-gray-600">Descrição do perfil</label>
                        <BasicInputComponent name="profile" type="textarea" placeholder="Informe a descrição do perfil" value={data.description}/>
                    </Form.Item>
                    
                    
                    

                    <ButtonComponent name="save" type="submit" className="float-right block">Salvar</ButtonComponent>
                </Form>

            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default ProfileDetailPage;