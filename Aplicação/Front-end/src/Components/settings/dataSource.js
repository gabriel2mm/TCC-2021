import { InfoOutlined, UnlockOutlined , UserOutlined, FolderOutlined, TagsOutlined, ToolOutlined, ReconciliationOutlined, KeyOutlined} from "@ant-design/icons";

export const dataSource = [
    { title: 'Geral', balloons: [
            { title: 'Sobre', color: 'bg-red-500', hover: 'bg-red-600', icon: <InfoOutlined />, link: '/settings/about', permission: ["settings"] }, 
    ]},
    { title: 'Atividades', balloons: [
        { title: 'Categorias', color: 'bg-yellow-500', hover: 'bg-yellow-600', icon: <TagsOutlined />, link: '/settings/categories', permission: ["read:category","write:category"]},
        { title: 'Habilidade', color: 'bg-indigo-500', hover: 'bg-indigo-600', icon: <ReconciliationOutlined /> , link: '/settings/skills', permission: ["read:skill","write:skill"] },
        { title: 'Capacidades', color: 'bg-purple-500', hover: 'bg-purple-600', icon: <ToolOutlined />, link: '/settings/capacities', permission: ["read:capacity","write:capacity"] },
        { title: 'Grupos', color: 'bg-green-500', hover: 'bg-green-600', icon: <FolderOutlined />, link: '/settings/groups', permission: ["read:group","write:group"] },
        { title: 'Acordos de níveis de serviços', color: 'bg-yellow-300', hover: 'bg-yellow-400', icon: <FolderOutlined />, link: '/settings/sla', permission: ["read:sla","write:sla"] }
    ]},
    { title: 'Usuários e segurança', balloons: [
        { title: 'Usuários', color: 'bg-blue-500', hover: 'bg-blue-600', icon: <UserOutlined />, link: '/settings/users', permission: ["read:user", "write:user"] },
        { title: 'Perfis de acesso', color: 'bg-gray-500', hover:'bg-gray-600', icon: <UnlockOutlined />, link: '/settings/profiles', permission: ["read:profile", "write:profile"] },
        { title: 'Integração', color: 'bg-red-500', hover:'bg-red-600', icon: <KeyOutlined />, link: '/settings/token', permission: ["integration"] },
    ]}
];