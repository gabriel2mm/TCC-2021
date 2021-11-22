import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { BasicInputComponent } from '../index.js';
import { useChatContext, ChatTypes, useUserContext } from '../../Contexts';
import { Spin } from 'antd';
import SockJsClient from 'react-stomp';
import { API } from '../../Services/API.js';

export default function ChatMassagesComponent() {
    const { selectedChat, selectedContact, handleChangeScreen, handleSelectedChat } = useChatContext();
    const [chatUser, setChatUser] = useState();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const clientRef = useRef();
    const containerRef = useRef();
    const context = useUserContext();

    useEffect(() => {
        scrollDown();
    } , [messages]);

    useEffect(() => {
        setChatUser(selectedChat);
        scrollDown();
        async function getMessages() {
            const response = await API().get(`/api/rooms/messages?id=${selectedChat.id}`);

            if (response.status >= 200 && response.status < 300) {
                setMessages(response.data);
            }
        }
        getMessages();

    }, [selectedChat, selectedContact]);

    function toUserSender(user) {
        return { firstName: user.firstName, lastName: user.lastName, cpf: user.cpf, email: user.email, id: user.id };
    }

    function sendMessage() {
        if(message){
            clientRef.current.sendMessage("/app/chat.sendMessage", JSON.stringify({ chatRoom: selectedChat.id, content: message, to: toUserSender(chatUser), from: toUserSender(context.user), type: 0 }))
            setMessage("");
        }
    }

    function changeMessage(event) {
        setMessage(event.target.value);
    }

    function handleBack() {
        handleSelectedChat({});
        handleChangeScreen(ChatTypes.chatList)
    }

    function initialLetter(text){
        if(text)
           return text.substr(0,1).toUpperCase()

       return "";
   }

   function selectedUser(chatRoom){
       if(chatRoom.user1.id === context.user.id){
           return chatRoom.user2;
       }

       return chatRoom.user1;
   }

    function renderMessage() {
        return messages.map(m => {
            if ((m.from != null && m.from.id != null && context.user.id === m.from.id) || context.user.id == m.from) {
                return (
                    <div className="clearfix">
                        <div className="bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">{m.content || m.message}</div>
                    </div>
                )
            } else {
                return (
                    <div className="clearfix">
                        <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
                            {m.content || m.message}
                        </div>
                    </div>
                )
            }
        });
    }

    function scrollDown(){
        if(containerRef.current){
            containerRef.current.scrollTop = containerRef.current?.scrollHeight;
        }
    }

    return (

        chatUser ? (
            <>
                <SockJsClient url='https://143.244.157.15:8443/ocrfieldservice-1.0.0-SNAPSHOT/ws'
                    topics={['/topic/public']}
                    onConnect={() => {
                        console.log("connected");
                    }}
                    onDisconnect={() => {
                        console.log("Disconnected");
                    }}
                    onMessage={(msg) => {
                        setMessages([...messages, msg]);
                        scrollDown();
                    }}
                    ref={clientRef} />
                <div className="bg-gray-200 shadow w-full h-16 flex flex-row items-center rounded-t-lg">
                    <div onClick={() => handleBack()} className="px-2 flex flex-row items-center cursor-pointer">
                        <ArrowLeftOutlined className="text-purple-500 hover:text-purple-400 focus:text-purple-400 " />
                    </div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex flex-col justify-center items-center overscroll-y-contain overflow-y-auto">
                        <span className="font-black text-xs">
                            {`${initialLetter(selectedUser(chatUser).firstName)}${initialLetter(selectedUser(chatUser).lastName)}`}
                        </span>
                    </div>
                    <span className="font-bold text-gray-800 ml-2">{`${selectedUser(chatUser).firstName} ${selectedUser(chatUser).lastName}`}</span>
                </div>
                <div className="flex flex-col justify-between h-full w-full">
                    <div ref={containerRef} className="w-full bg-gray-600 overflow-y-auto overscroll-contain overscroll-y-contain scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch" style={{height: "285px"}}>
                        {renderMessage()}
                    </div>
                    <div className="h-14 bg-gray-200 p-2 flex flex-row flex-nowrap flex-shrink-0 rounded-b-lg">
                        <BasicInputComponent value={message} onChange={e => changeMessage(e)} placeholder="Digite uma mensagem" />
                        <button onClick={sendMessage} className="mx-1 bg-purple-500 rounded-full outline-none focus:outline-black w-10 h-10 flex flex-shrink-0 items-center justify-center">
                            <SendOutlined className="text-white font-bold" />
                        </button>
                    </div>
                </div>
            </>) : (<Spin />)
    )
}
