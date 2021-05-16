import React, { useState } from 'react';
import { Modal, List, Spin, message, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

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
                const response = await axios.get("https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/Chamado");
                if (response.status >= 200 && response.status < 300) {
                    setLoading(false);
                    if(search){
                        setActivities(response.data.filter(r => r.chamados.includes(search)) || []);
                    }else{
                        setActivities(response.data || []);
                    }
                }
            } catch (e) {
                console.log(e)
                message.error("Não foi possível realizar pesquisa!")
            }

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
            <Modal visible={searchMenu} okText="Fechar" footer={[]} onOk={toggleSearchModal} closable={true} destroyOnClose={true} onCancel={toggleSearchModal} >
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
                            {activities && activities.length > 0 ? activities.map( (a,i )=> (
                                <List.Item key={i} className="hover:bg-gray-200 transition delay-150 duration-300 ease-in-out border-b-2 border-gray-100 rounded px-5 py-2">
                                    <div className="detalhes w-full flex flex-row justify-between items-center">
                                        <span className="font-semibold text-gray-800">{a.chamados}</span>
                                        <span className="font-normal text-gray-700">{`${moment(a.data).format("DD/MM/yyyy")} ás  ${moment(a.data).format("HH:mm")}`}</span>
                                    </div>
                                </List.Item>
                            )) : search && search.length > 0 ? (<Empty description={`Não encontramos nenhuma atividade com este termo "${search}" `} />) : (<span></span>) }
                           
                        </List>
                    </>
                )}
            </Modal>
        </>
    );
}

export default SearchActivityComponent;