import React, {useState, useContext, createContext} from 'react';


export const types = { chatList: "chatList", contactList: "contactList", chat: "chat"}
export const ChatContext = createContext({screen: types.chatList, handleChangeScreen: null, selectedChat: null, handleSelectedChat: null, selectedContact: null, handleSelectedContact: null});

export function ChatContextProvider({children}){
    const [screen, setScreen] = useState(types.chatList);
    const [selectedChat, setSelectedChat] = useState({});
    const [selectedContact, setSelectedContact] = useState({});
    
    function handleChangeScreen(ScreenName){
        setScreen(ScreenName);
    }

    function handleSelectedChat(chat){
        console.log(chat);
        setSelectedChat(chat);
    }

    function handleSelectedContact(contact){
        console.log(contact);
        setSelectedContact(contact);
    }

    return <ChatContext.Provider value={{screen, handleChangeScreen, selectedChat, handleSelectedChat, selectedContact, handleSelectedContact}}>{children}</ChatContext.Provider>
}

export function useChatContext(){
    const context = useContext(ChatContext);
    
    return context;
}