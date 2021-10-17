import React, { useState, useEffect } from 'react';
import { List, Empty, message } from 'antd';
import { CommentOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BasicInputComponent } from '../index.js';
import { useChatContext, ChatTypes, useUserContext } from '../../Contexts';
import { API } from '../../Services/API.js';

export default function ContactListComponent() {

    const {handleChangeScreen, handleSelectedContact, handleSelectedChat} = useChatContext();
    const [loading, setLoading] = useState(true);
    const [contactList, setContactList] = useState({});
    const context = useUserContext();

    useEffect(() => {
        async function getContacts() {
            try {
                setLoading(true);
                const response = await API().get(`/api/rooms/contacts?id=${context.organization.id}`);
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

    async function handleNewChat(contact){
        const response = await API().post('/api/rooms', { user1: context.user, user2: contact, notificiation: true, messages: []})
        if(response.status >= 200 && response.status < 300){
            handleSelectedChat(response.data);
            handleSelectedContact(contact);
            handleChangeScreen(ChatTypes.chat);
        }
    }

    function handleBack(){
        handleSelectedContact({});
        handleChangeScreen(ChatTypes.chatList);
    }

    return (
        <>
            <div  onClick={() =>handleBack()} className="px-5 py-2 flex flex-row items-center cursor-pointer">
             <ArrowLeftOutlined className="mr-2 text-purple-500 hover:text-purple-400 focus:text-purple-400 text-lg" /><span className="text-gray-800 font-bold text-lg">Contatos</span> 
            </div>

            <div className="px-5 my-2">
                <BasicInputComponent className="" placeholder="Procurar Contato" />
            </div>
            {contactList && contactList.length > 0 ? (
                <List className="scroll w-full px-2 overflow-y-auto" loading={loading}>
                    {contactList.map((c, i) => (
                        <List.Item onClick={() => handleNewChat(c)} key={i} className="relative cursor-pointer px-2 flex flex-row flex-shrink-0 justify-start hover:bg-gray-100 focus:bg-gray-100 rounded transition-colors delay-100">
                            <div className="w-7 h-7 bg-gray-300 rounded-full flex flex-col justify-center items-center">
                                <span className="font-black text-xs">
                                    {`${c.firstName.substr(0, 1).toUpperCase()}${c.lastName.substr(0, 1).toUpperCase()}`}
                                </span>
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="text-gray-800 font-medium">{c.firstName + " " + c.lastName}</span>
                            </div>
                            <CommentOutlined className="absolute right-2" />

                        </List.Item>
                    ))}
                </List>
            ) : (<Empty description="Não há contatos" />)}
        </>
    )
}
