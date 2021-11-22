import React, { useState } from "react";
import { useChatContext, ChatTypes, useUserContext } from '../../Contexts';
import ContactListComponent from "./contactList";
import ChatListComponent from './chatList.js';
import ChatMassagesComponent from './chat'
import { MessageOutlined, CloseOutlined } from '@ant-design/icons';

function ChatComponent({ defaultVisible }) {

  const { screen } = useChatContext();
  const [openChat, setOpenChat] = useState(defaultVisible);
  const context = useUserContext();

  function getComponent() {
    if (screen && screen === ChatTypes.contactList) {
      return (<ContactListComponent />)
    } else if (screen && screen === ChatTypes.chatList) {
      return (<ChatListComponent />)
    } else if (screen && screen === ChatTypes.chat) {
      return (<ChatMassagesComponent />)
    }
  }

  function toggleChat() {
    setOpenChat(!openChat);
  }

  return (
    context.containsPermission('admin:chat') || context.containsPermission('Admin') ?    
   (<div>
      <button onClick={toggleChat} className="hidden md:fixed md:flex md:flex-row justify-center items-center right-5 bottom-5 w-10 h-10 bg-purple-600 rounded-full hover:bg-purple-700 active:shadow-2xl hover:shadow-2xl mouse shadow-lg transition ease-in duration-200 focus:outline-none font-black" style={{zIndex: 5}}>
        {!openChat ? <MessageOutlined className="font-black text-white" /> : <CloseOutlined className="font-black text-white" />}
      </button>
      {openChat ? (
        <div style={{zIndex: 5}} className="md:fixed mb-20 md:mb-0 bottom-20 right-12 w-full md:w-72 h-full md:h-96 bg-white md:flex md:flex-col rounded-lg shadow-lg">
          {getComponent()}
        </div>) : (null)}
    </div>) : (null)
  )
}

export default ChatComponent;
