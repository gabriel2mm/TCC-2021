import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { message, Popconfirm, Table, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AuthenticatedLayoutComponent, ButtonComponent } from "../../Components";
import { API } from "../../Services";

function CategoryPage() {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [deletedFilter, setDeletedFilter] = useState([]);

    const data = useMemo(() => {
        const response = fetchProfiles();
        return response;
    }, []);

    async function fetchProfiles() {
        setLoading(true);
        const response = await API().get("/api/categories");
        if (response.status >= 200 && response.status < 300) {
            setDataSource(response.data || []);
            setLoading(false);
        }

        return response.data;
    }

    const columns = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Descrição",
            dataIndex: "description",
            key: "description",
            responsive: ["md"],
        },
        {
            title: 'Atribuição automatica?',
            dataIndex: 'automaticAssignment',
            key: 'automaticAssignment',
            render: tag => tag? (<span>Sim</span>) : (<span>Não</span>)
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            render: tag => !tag? (<Tag className={"text-red-700 bg-red-100 border-0 font-bold rounded-full"}>Suspenso</Tag>) : (<Tag className={"text-green-900 bg-green-200 border-0 font-bold rounded-full"}>Ativo</Tag>)
        },
        {
            title: "Ações",
            dataIndex: "acoes",
            width: 50,
            render: (text, record, i) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="mx-1">
                        <Link to={`/settings/categories/${record.id}`}>
                            Visualizar
                        </Link>
                    </div>
                    <div className="mx-1">
                        <Popconfirm icon={<CloseOutlined />} key={`Delete-${i}`} title={`Deseja excluír o perfil ${record.name}?`} onConfirm={() => handleDelete(record)}>
                            <a href="!#">Deletar</a>
                        </Popconfirm>
                    </div>
                </div>
            ),
        },
    ];

    async function handleDelete(record) {
        try {
            const response = await API().delete(`/api/categories/${record.id}`);
            if (response.status >= 200 && response.status < 300) {
                message.success(`Categoria "${record.name}" deletada com sucesso!`);
                setDeletedFilter([...deletedFilter, record.name]);
                fetchProfiles();
            }
        } catch (e) {
            console.log(e);
            message.error(`Não foi possível deletar a categoria "${record.name}"!`);
        }
    }

    async function handleSearch(event) {
        const text = event.target.value;
        data
            .then((item) => {
                if (text && item) {
                    const filteredData = item.filter(
                        (entry) =>
                            entry.name.toLowerCase().includes(text.toLowerCase()) &&
                            !deletedFilter.includes(entry.name)
                    );
                    setDataSource(filteredData);
                } else {
                    setDataSource(
                        item.filter((entry) => !deletedFilter.includes(entry.name))
                    );
                }
            })
            .catch((err) => console.log("Não foi possível gerar data"));
    }

    return (
         <AuthenticatedLayoutComponent>
         <div className="container">
           <h2 className="text-2xl font-bold text-gray-800 my-5">Categorias</h2>
           <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
             <input onChange={(event) => handleSearch(event)} type="text" name="search" placeholder="Buscar perfil" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
             <Link to="/settings/categories/new" className="order-1 md:order-2">
               <ButtonComponent className="float-left md:float-right mb-4 w-28 md:w-48 ">Nova categoria</ButtonComponent>
             </Link>
           </div>
           <Table rowKey={ record => record.id} loading={loading} columns={columns} dataSource={dataSource || []} />
         </div>
       </AuthenticatedLayoutComponent>
    );
}

export default CategoryPage;