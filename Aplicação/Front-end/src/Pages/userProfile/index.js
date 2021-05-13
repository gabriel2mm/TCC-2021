import React from 'react';
import { AuthenticatedLayoutComponent, ButtonComponent, BasicInputComponent } from '../../Components';
import { Avatar, Image } from 'antd';
import { UserOutlined, ArrowLeftOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';

function userProfilePage() {
   
    return (
        <AuthenticatedLayoutComponent>
            <div className="container">
                <h2 className="text-2xl font-bold text-gray-800 my-5">Meu perfil</h2>
                <div className="w-full px-12 flex justify-center items-center">
                    <form>
                        <div>
                            <Avatar className= "container px-12 mx-auto md:flex md:items-center" size={200} icon={<UserOutlined />} />
                        </div>
                        <div className="my-2">
                            <label htmlFor="user" className="text-gray-700 font-bold">
                                E-mail:
                            </label>
                            <BasicInputComponent type="e-mail" name="e-mail" icon={<IdcardOutlined />} iconPosition={"left"} placeholder="Informe seu e-mail" className="max-w-screen-md"/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="text-gray-700 font-bold">
                                Nova senha:
                             </label>
                        </div>
                        <div>
                            <BasicInputComponent
                                type="password"
                                name="newPassword"
                                icon={<LockOutlined />}
                                iconPosition={"left"}
                                placeholder="Insira sua nova senha"
                                className="max-w-screen-md"
                            />
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="text-gray-700 font-bold">
                                 Confirmar senha:
                            </label>
                        <div>
                            <BasicInputComponent
                                type="password"
                                name="ConfirmPassword"
                                icon={<LockOutlined />}
                                iconPosition={"left"}
                                placeholder="Confirme sua senha"
                                className="max-w-screen-md"
                            />
                        </div>
                
                        </div>
                        <ButtonComponent type="subit" className="float-center mt-5" >Salvar</ButtonComponent>

                    </form>  
                </div>           
         </div>
        </AuthenticatedLayoutComponent>
    );
  

}

export default userProfilePage;