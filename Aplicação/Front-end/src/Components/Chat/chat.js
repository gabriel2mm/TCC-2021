import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { BasicInputComponent } from '../index.js';
import { useChatContext, ChatTypes } from '../../Contexts';
import { Spin } from 'antd';

export default function ChatMassagesComponent() {

    const { selectedChat, selectedContact, handleChangeScreen, handleSelectedChat } = useChatContext();
    const [chatUser, setChatUser] = useState();

    useEffect(() => {
        setChatUser(selectedChat || selectedContact);
    }, [selectedChat, selectedContact]);

    function handleBack() {
        handleSelectedChat({});
        handleChangeScreen(ChatTypes.chatList)
    }

    return (

        chatUser ? (
            <>
                <div className="bg-gray-200 shadow w-full h-16 flex flex-row items-center rounded-t-lg">
                    <div onClick={() => handleBack()} className="px-2 flex flex-row items-center cursor-pointer">
                        <ArrowLeftOutlined className="text-purple-500 hover:text-purple-400 focus:text-purple-400 " />
                    </div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex flex-col justify-center items-center">
                        <span className="font-black text-xs">
                            {`${chatUser.Nome.substr(0, 1).toUpperCase()}${chatUser.Sobrenome.substr(0, 1).toUpperCase()}`}
                        </span>
                    </div>
                    <span className="font-bold text-gray-800 ml-2">{`${chatUser.Nome} ${chatUser.Sobrenome}`}</span>
                </div>
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="h-screen md:h-full md:max-h-96 w-full bg-gray-600 overflow-y-auto overscroll-contain overscroll-y-contain scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
                        <div className="clearfix">
                            <div className="bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">Mensagem de texto enviada</div>
                        </div>
                        <div className="clearfix">
                            <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
                                Mensagem de texto recebida
                            </div>
                        </div>
                        <div className="clearfix">
                            <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
                                Mensagem de texto recebida 2
                            </div>
                        </div>

                        <div className="clearfix">
                            <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
                                Mensagem de texto recebida 3
                            </div>
                        </div>
                    </div>
                    <div className="h-14 bg-gray-200 p-2 flex flex-row flex-nowrap flex-shrink-0 rounded-b-lg">
                        <BasicInputComponent placeholder="Digite uma mensagem" />
                        <button className="mx-1 bg-purple-500 rounded-full outline-none focus:outline-black w-10 h-10 flex flex-shrink-0 items-center justify-center">
                            <SendOutlined className="text-white font-bold" />
                        </button>
                    </div>
                </div>
            </>) : (<Spin />)
    )
}
