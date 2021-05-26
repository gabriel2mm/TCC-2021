import React, { useState, useEffect } from 'react';
import { List, Empty, message } from 'antd';
import { PlusCircleOutlined  } from '@ant-design/icons';
import { BasicInputComponent } from '../index.js';
import { useChatContext, ChatTypes } from '../../Contexts';
import axios from 'axios';

export default function ChatListComponent() {
    
    const [loading, setLoading] = useState(true);
    const [contactList, setContactList] = useState({});
    const {handleChangeScreen, handleSelectedChat, handleSelectedContact} = useChatContext();
    

    useEffect(() => {
        async function getContacts() {
            setLoading(true);
            try {
                
                const response = await axios.get("https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/Contacts");
                if (response.status >= 200 && response.status < 300) {
                    setContactList(response.data);
                }
            } catch (e) {

                message.error("Não foi possível carregar lista de contatos! Tente novamente mais tarde.");
            }
            setLoading(false);
        }

        getContacts();
    }, []);

    function handleSelectChat(chat){
        handleSelectedChat(chat);
        handleSelectedContact(null);
        handleChangeScreen(ChatTypes.chat);
    }

    return (
        <>
            <div className="px-5 py-2 flex flex-row justify-between items-center">
                <span className="text-gray-800 font-bold text-lg">Conversas</span> 
                <PlusCircleOutlined className="text-lg font-bold text-gray-800 cursor-pointer"  onClick={() =>  handleChangeScreen(ChatTypes.contactList)}/>
            </div>

            <div className="px-5 my-2">
                <BasicInputComponent className="" placeholder="Procurar conversa" />
            </div>
            {contactList && contactList.length > 0 ? (
                <List className="w-full h-full px-2 overflow-y-auto" loading={loading}>
                    {contactList.map((c, i) => (
                        <List.Item onClick={e => handleSelectChat(c)} key={i} className="relative cursor-pointer px-2 flex flex-row flex-shrink-0 justify-start hover:bg-gray-100 focus:bg-gray-100 rounded transition-colors delay-100">
                            <div className="w-7 h-7 flex-shrink-0 bg-gray-300 rounded-full flex flex-col justify-center items-center">
                                <span className="font-black text-xs">
                                    {`${c.Nome.substr(0, 1).toUpperCase()}${c.Sobrenome.substr(0, 1).toUpperCase()}`}
                                </span>
                            </div>
                            <div className="flex flex-col ml-2 ">
                                <span className="text-gray-800 font-medium">{c.Nome + " " + c.Sobrenome}</span>
                                <span className="text-gray-400 font-thin overflow-ellipsis truncate">{c.ultimaMensagem.substr(0, 15)}</span>
                            </div>

                        </List.Item>
                    ))}
                </List>
            ) : (<Empty description="Não há contatos" />)}
        </>
    )
}
