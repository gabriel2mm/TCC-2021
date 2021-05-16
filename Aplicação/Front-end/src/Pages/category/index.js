import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { message, Popconfirm, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AuthenticatedLayoutComponent, ButtonComponent } from "../../Components";
import axios from "axios";

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
        const response = await axios.get(
            "https://6096c51f116f3f00174b394c.mockapi.io/category"
        );
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
            dataIndex: "descricao",
            key: "descricao",
            responsive: ["md"],
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
            const response = await axios.delete(
                `https://6096c51f116f3f00174b394c.mockapi.io/category/${record.id}`
            );
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
        <div className="md:container md:mx-auto">
            <AuthenticatedLayoutComponent>
                <h1 className="text-xl text-gray-800 font-bold">Categorias</h1>
                <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
                    <input
                        onChange={(event) => handleSearch(event)}
                        type="text"
                        name="search"
                        placeholder="Procurar categoria"
                        className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <ButtonComponent
                        type="submit"
                        href="#"
                        className="order-1 md:order-2 float-left md:float-right mb-4 w-28 md:w-48 "
                    >
                        <Link to="/settings/categories/new" tabIndex="4">
                            Nova Categoria
                        </Link>
                    </ButtonComponent>
                </div>
                <div>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={dataSource || []}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    console.log(record, rowIndex, event);
                                },
                            };
                        }}
                    />
                </div>
            </AuthenticatedLayoutComponent>
        </div>
    );
}

export default CategoryPage;