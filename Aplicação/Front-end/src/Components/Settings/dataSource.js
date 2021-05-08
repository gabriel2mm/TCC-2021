import { InfoOutlined, UnlockOutlined , UserOutlined } from "@ant-design/icons";


export const dataSource = [
    { title: 'Geral', balloons: [
            { title: 'Sobre', color: 'bg-red-600', icon: <InfoOutlined />, link: '/settings/about' }, 
    ]},
    { title: 'Atividades', balloons: [
        { title: 'Categorias', color: 'bg-yellow-500', icon: <InfoOutlined />, link: '/about' }
    ]},
    { title: 'Usuários e segurança', balloons: [
        { title: 'Usuários', color: 'bg-blue-500', icon: <UserOutlined />, link: '/settings/profiles' },
        { title: 'Perfis de acesso', color: 'bg-gray-500', icon: <UnlockOutlined />, link: '/settings/profiles' }
    ]}
];