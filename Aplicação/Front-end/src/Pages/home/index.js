import React from "react";
import {AuthenticatedLayoutComponent} from '../../Components';
import { Avatar, Popconfirm} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { style as Styles} from './styles';

function HomePage() {

    function confirm(){
        console.log("confirmou");
    }

    function cancel(){
        console.log("cancelou")
    }

    return (
        <AuthenticatedLayoutComponent>
            Olá mundo
            <Avatar size={64} icon={<UserOutlined />} />    
        </AuthenticatedLayoutComponent>
    );
}

export default HomePage;
