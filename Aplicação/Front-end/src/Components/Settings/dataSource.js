import { InfoOutlined, UnlockOutlined , UserOutlined, FolderOutlined, TagsOutlined } from "@ant-design/icons";


export const dataSource = [
    { title: 'Geral', balloons: [
            { title: 'Sobre', color: 'bg-red-500', hover: 'bg-red-600', icon: <InfoOutlined />, link: '/settings/about' }, 
            { title: 'Grupos', color: 'bg-blue-500', hover: 'bg-blue-600', icon: <FolderOutlined />, link: '/settings/group/new' }
    ]},
    { title: 'Atividades', balloons: [
        { title: 'Categorias', color: 'bg-yellow-500', hover: 'bg-yellow-600', icon: <TagsOutlined />, link: '/settings/categories' },
        
    ]},
    { title: 'Usuários e segurança', balloons: [
        { title: 'Usuários', color: 'bg-blue-500', hover: 'bg-blue-600', icon: <UserOutlined />, link: '/settings/users' },
        { title: 'Perfis de acesso', color: 'bg-gray-500', hover:'bg-gray-600', icon: <UnlockOutlined />, link: '/settings/profiles' }
    ]}
];