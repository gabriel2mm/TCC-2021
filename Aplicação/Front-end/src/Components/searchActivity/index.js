import React, { useState } from 'react';
import { Modal, List, Spin, message, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { API } from '../../Services';
import { Redirect } from 'react-router-dom';

function SearchActivityComponent() {
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [search, setSearch] = useState("");
    const [searchMenu, setSearchMenu] = useState(false);

    function toggleSearchModal() {
        setSearch("");
        setActivities([])
        setSearchMenu(!searchMenu);
    }


    async function handleSearchActivity(e) {
        setLoading(true);
        if ((e.type === "keypress" && e.code === "Enter") || e.type === "click") {

            try {
                const response = await API().get(`/api/activities/search?value=${search}`);
                if (response.status >= 200 && response.status < 300) {
                    setLoading(false);
                    if (search) {
                        setActivities(response.data || []);
                    } else {
                        setActivities([]);
                    }
                }
            } catch (e) {
                console.log(e)
                message.error("Não foi possível realizar pesquisa!")
            }

        }
    }

    function renderColor(created, limit, status) {
        const currentDate = new Date();
        const initialDate = new Date(created);
        const finalDate = new Date(limit);

        const diff1 = moment(finalDate).diff(moment(initialDate), 'minutes');
        const diff2 = moment(currentDate).diff(moment(initialDate), 'minutes');

        let result = Math.abs(100 * diff2 / diff1);

        console.log(result, diff1, diff2);

        if (isNaN(result))
            result = 0;

        if (status == "ABERTO" || status == "EM_ANDAMENTO") {
            if (result < 40) {
                return "bg-green-500";
            } else if (result >= 40 && result < 70) {
                return "bg-yellow-500";
            } else if (result >= 70) {
                return "bg-red-500";
            }
        } else {
            return "bg-blue-500";
        }
    }

    function onChangeText(e) {
        setSearch(e.target.value);
    }

    return (
        <>
            <li onClick={toggleSearchModal} className="antialiased py-2 px-2 md:ml-5 text-gray-500 md:text-gray-600 md:font-black text-2xl md:text-3xl flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-800">
                <SearchOutlined />
            </li>
            <Modal visible={searchMenu} okText="Fechar" footer={[]} onOk={toggleSearchModal} closable={true} destroyOnClose={true} onCancel={toggleSearchModal} className="even:rounded-lg even:shadow-lg">
                <h3 className="text-gray-800 font-semibold text-lg mt-5 mb-2">Buscar atividades</h3>

                <div className="relative">
                    <input onChange={onChangeText} value={search} onKeyPress={handleSearchActivity} type="text" name="search" placeholder="Buscar  por atividades..." className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
                    <button onClick={handleSearchActivity} className="block w-7 h-7 text-center text-xl leading-0 absolute top-0.5 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
                        <SearchOutlined />
                    </button>
                </div>
                {loading ? (<div className="w-full mt-10 flex flex-row justify-center items-center"><Spin /></div>) : (
                    <>
                        <List className="mt-5 max-h-80 overflow-y-auto">
                            {activities && activities.length > 0 ? activities.map((a, i) => (
                                <a href={`/activities/${a.id}`} key={i}>
                                    <List.Item>
                                        <div className="grid grid-cols-12 gap-2 w-full rounded-lg shadow cursor-pointer hover:shadow-lg  bg-white transition-all delay-200">
                                            <div className={`w-full h-full ${renderColor(a.created, a.dateLimit, a.status)} rounded-tl-lg rounded-bl-lg`}></div>
                                            <div className="w-full col-span-11 h-full">
                                                <div className="flex flex-col py-2">
                                                    <span className="text-md text-gray-800 font-medium"><b>Atividade</b>: {a.number}</span>
                                                    <span className="font-thin text-gray-700"><b>Data de criação:</b> {moment(a.created).format("DD/MM/yyyy HH:mm")}</span>
                                                    <span className="font-thin text-gray-700"><b>Data limite:</b> {moment(a.dateLimit).format("DD/MM/yyyy HH:mm")}</span>
                                                    <span className="font-thin text-gray-700"><b>Categoria:</b> {a.category?.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </List.Item>
                                </a>
                            )) : search && search.length > 0 ? (<Empty description={`Não encontramos nenhuma atividade com este termo "${search}" `} />) : (<span></span>)}

                        </List>
                    </>
                )}
            </Modal>
        </>
    );
}

export default SearchActivityComponent;