import {API} from '../../Services';
import { TeamOutlined, UserOutlined, ClusterOutlined } from '@ant-design/icons';

let data = [];

const DataSource = async () => {
    try{
        const response = await API().get('/api/groups');
        if(response.status >= 200 && response.status < 300){
            data = {
                key : 0,
                title : "organização",
                icon : <ClusterOutlined />,
                type: "org",
                children : response.data?.map(group => ({
                    key : group.id,
                    title : group.name,
                    icon : <TeamOutlined />,
                    type: "group",
                    children : group.users?.map(user => ({
                        key : user.id,
                        title : user.name,
                        icon : <UserOutlined />,
                        type: "user"
                    }))
                }))
            };
        }
    }catch(err){
        console.log(err);
    }

    return data;
}

export const Data = DataSource();