import React, { useState, useMemo } from 'react';
import { Tag, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

function TableViewComponent() {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);

    const data = useMemo(() => {
        const response = fetchActivities();
        return response;
    }, []);

    async function fetchActivities() {
        setLoading(true);
        try {
            const response = await axios.get('https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/Organization/1/category/1/activity');
            if (response.status >= 200 && response.status < 300) {
                setDataSource(response.data || []);
                setLoading(false);
            }
            return response.data;

        } catch (e) {
            message.error("Não foi possível carregar os dados!");
            setDataSource([]);
            setLoading(false);
        }

        return [];
    }


    const cols = [
        {
            title: 'Chamado',
            dataIndex: 'activity',
            key: 'activity',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            responsive: ['md'],
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
            responsive: ['md'],
            render: (text, record, i) => <span key={i}>{record.Category.category}</span>
        },
        {
            title: 'Criado em',
            dataIndex: 'created',
            key: 'created',
            responsive: ['md'],
            render: (text, record, i) => <span key={i}>{moment(text).format("DD/MM/yy HH:mm")}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: tag => <Tag>{tag}</Tag>
        },
        {
            title: 'Ações',
            dataIndex: 'acoes',
            render: (text, record, i) =>
                <div className="flex flex-row justify-center items-center">
                    <div className="mx-1">
                        <Link to={`/activities/${record.id}`}>
                            Visualizar
                        </Link>
                    </div>
                </div>
        },
    ]


    async function handleSearch(event) {
        const text = event.target.value;
        data.then(item => {
            if (text && item) {
                const filteredData = item.filter(entry => entry.activity.toLowerCase().includes(text.toLowerCase()) || entry.Category.category.toLowerCase().includes(text.toLowerCase()) || entry.status.toLowerCase().includes(text.toLowerCase()) || entry.description.toLowerCase().includes(text.toLowerCase()));
                setDataSource(filteredData);
            } else {
                setDataSource(item);
            }
        }).catch(err => console.log("Não foi possível gerar data"))
    }

    return (
        <div className="container px-5">
            <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
                <input onChange={(event) => handleSearch(event)} type="text" name="search" placeholder="Buscar chamado" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <Table rowKey={record => record.id} loading={loading} columns={cols} dataSource={dataSource || []} onRow={(record, rowIndex) => { return { onClick: event => { console.log(record, rowIndex, event) }, } }} />
        </div>
    );
}

export default TableViewComponent;