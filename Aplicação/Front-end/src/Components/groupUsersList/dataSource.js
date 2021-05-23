import { FolderOutlined, UserOutlined, ClusterOutlined } from '@ant-design/icons';

export const treeData = [
    {
        key: '0',
        title: "Organização",
        icon: <ClusterOutlined />,
        children: [
            {
                key: '1',
                title: "Paraná",
                icon: <FolderOutlined />,
                children: [
                    {
                        key: '10',
                        title: "João da silva",
                        icon: <UserOutlined/>,
                    },
                    {
                        key: '12',
                        title: "João Silva 2",
                        icon: <UserOutlined />,
                    },
                    {
                        key: '13',
                        title: "Joãozinho Silva 3",
                        icon: <UserOutlined />,
                    },
                ]
            },
            {
                key: '2',
                title: "João sem grupo 1",
                icon: <UserOutlined />,
                children: []
            }
        ],
    }
];