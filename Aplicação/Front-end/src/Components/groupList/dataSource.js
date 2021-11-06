export const configuration = [
    {group : "Permissoes gerais do sistema", permissions: [
        {name: "Atividades", description: "Permite que o usuário possar visualizar todas as atividades de sua organização" , permission: "activities"},
        {name: "Receber Atividades", description: "Permite que o usuário tenha atividades atribuídos em sua lista" , permission: "receive:activity"},
        {name: "Configurações", description: "Permite que o usuário tenha acesso as configurações do sistema" , permission: "settings"},
        {name: "Dashboards", description: "Permite que o possa visualizar a sessão de relatórios de sua organização." , permission: "dashboard"},
        {name: "Canais de comunicação", description: "Permite que o usuário possa utilizar o sistema de comunicação de sua organização." , permission: "admin:chat"},
        {name: "Integrações", description: "Permite que o usuário possa criar token's de autenticação para realizar integrações." , permission: "integration"},
        {name: "Administrador", description: "Permite que o usuário possa gerenciar todas as funçõs de sua organização" , permission: "Admin"},
    ]},
    {group : "Usuários", permissions: [
        {name: "Visualização de usuários", description: "Permite que o usuário logado visualiza todos os usuários cadastrados em sua organização." , permission: "read:user"},
        {name: "Gerenciar usuários", description: "Permite que o usuário logado adicione, altere e exclua usuários de sua organização." , permission: "write:user"}
    ]},
    {group : "Perfis de acesso", permissions: [
        {name: "Visualização aos perfis de acesso", description: "Permite que o usuário logado visualiza todos os perfis cadastrados no sistema." , permission: "read:profile"},
        {name: "Gerenciar perfis de acesso", description: "Permite que o usuário logado adicione, altere e exclua perfis de acesso de sua organização." , permission: "write:profile"}
    ]},
    {group : "Grupos", permissions: [
        {name: "Visualização de grupos", description: "Permite que o usuário logado visualiza todos os grupos cadastrados em sua organização." , permission: "read:group"},
        {name: "Gerenciar grupos", description: "Permite que o usuário logado adicione, altere e exclua todos os grupos de sua organização." , permission: "write:group"}
    ]},
    {group : "Acordos de serviço", permissions: [
        {name: "Visualização de acordos", description: "Permite que o usuário logado visualiza todos os acordos de serviços cadastrados em sua organização." , permission: "read:sla"},
        {name: "Gerenciar acordos", description: "Permite que o usuário logado adicione, altere e exclua todos os acordos de serviços de sua organização." , permission: "write:sla"}
    ]},
    {group : "Habilidades", permissions: [
        {name: "Visualização de habilidades", description: "Permite que o usuário logado visualiza todas as habilidades cadastrados em sua organização." , permission: "read:skill"},
        {name: "Gerenciar habilidades", description: "Permite que o usuário logado adicione, altere e exclua todas as habilidades de sua organização." , permission: "write:skill"}
    ]},
    {group : "Capacidades", permissions: [
        {name: "Visualização de capacidades", description: "Permite que o usuário logado visualiza todas as capacidades cadastrados em sua organização." , permission: "read:capcity"},
        {name: "Gerenciar capacidades", description: "Permite que o usuário logado adicione, altere e exclua todas as capacidades de sua organização." , permission: "write:capcity"}
    ]},
    {group : "Categorias", permissions: [
        {name: "Visualização de categorias", description: "Permite que o usuário logado visualiza todas as categorias cadastrados em sua organização." , permission: "read:category"},
        {name: "Gerenciar categorias", description: "Permite que o usuário logado adicione, altere e exclua todas as categorias de sua organização." , permission: "write:category"}
    ]},
];