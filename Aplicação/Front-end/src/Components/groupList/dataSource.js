export const configuration = [
    {group : "Permissoes gerais do sistema", permissions: [
        {name: "Canais de comunicação", description: "Permite que o usuário possa utilizar o sistema de comunicação de sua organização." , permission: "chat"},
        {name: "Integrações", description: "Permite que o usuário possa criar token's de autenticação para realizar integrações." , permission: "integration"}
    ]},
    {group : "Usuários", permissions: [
        {name: "Visualização de usuários", description: "Permite que o usuário logado visualiza todos os usuários cadastrados em sua organização." , permission: "read:user"},
        {name: "Gerenciar usuários", description: "Permite que o usuário logado adicione, altere e exclua usuários de sua organização." , permission: "write:user"}
    ]},
    {group : "Perfis de acesso", permissions: [
        {name: "Visualização aos perfis de acesso", description: "Permite que o usuário logado visualiza todos os perfis cadastrados no sistema." , permission: "read:profile"},
        {name: "Gerenciar perfis de acesso", description: "Permite que o usuário logado adicione, altere e exclua perfis de acesso de sua organização." , permission: "write:profile"}
    ]},
];