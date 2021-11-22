import React, { useState, useEffect } from 'react';
import { List, Empty, message, Spin} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { BasicInputComponent } from '../index.js';
import { useChatContext, ChatTypes, useUserContext } from '../../Contexts';
import { API } from '../../Services/API.js';

export default function ChatListComponent() {
    const [save, setSave] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [contactList, setContactList] = useState({});
    const { handleChangeScreen, handleSelectedChat, handleSelectedContact } = useChatContext();
    const context = useUserContext();
    


    useEffect(() => {
        async function getContacts() {
            setLoading(true);
            try {
                const response = await API().get(`/api/rooms?id=${context.user.id}`);
                if (response.status >= 200 && response.status < 300) {
                    setContactList(response.data);
                    setSave(response.data);
                }
            } catch (e) {

                message.error("Não foi possível carregar lista de contatos! Tente novamente mais tarde.");
            }
            setLoading(false);
        }

        getContacts();
    }, []);

    function handleSelectChat(chat) {
        handleSelectedChat(chat);
        handleSelectedContact(null);
        handleChangeScreen(ChatTypes.chat);
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

    function changeText(e){
        const value = e.target.value;
        setSearchValue(value);

        if(value && value.length > 0 && save.length > 0){
            setContactList(save.filter(item => item.user1.firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.user2.firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1));
        }else{
            setContactList(save);
        }
    }

    return (
        <div style={{zIndex: 5}}>
            <div className="px-5 py-2 flex flex-row justify-between items-center">
                <span className="text-gray-800 font-bold text-lg">Conversas</span>
                <PlusCircleOutlined className="text-lg font-bold text-gray-800 cursor-pointer" onClick={() => handleChangeScreen(ChatTypes.contactList)} />
            </div>  
            {!loading ? (
                <>
                    <div className="px-5 my-2">
                        <BasicInputComponent className="" placeholder="Procurar conversa" onChange={e => changeText(e)}  value={searchValue}/>
                    </div>
                    {contactList && contactList.length > 0 ? (
                        <List className="w-full h-full px-2 overflow-y-auto" loading={loading}>
                            {contactList.map((chatRoom, i) => (
                                <>
                                <List.Item onClick={e => handleSelectChat(chatRoom)} key={i} className="relative cursor-pointer px-2 flex flex-row flex-shrink-0 justify-start hover:bg-gray-100 focus:bg-gray-100 rounded transition-colors delay-100">
                                    <div className="w-7 h-7 flex-shrink-0 bg-gray-300 rounded-full flex flex-col justify-center items-center">
                                        <span className="font-black text-xs">
                                            {`${initialLetter( selectedUser(chatRoom).firstName )}${initialLetter(selectedUser(chatRoom).lastName)}`}
                                        </span>
                                    </div>
                                    <div className="flex flex-col ml-2 ">
                                        <span className="text-gray-800 font-medium">{`${selectedUser(chatRoom).firstName} ${selectedUser(chatRoom).lastName}`}</span>
                                    </div>
                                </List.Item>
                                </>
                            ))}
                        </List>
                    ) : (<Empty description="Não há contatos" />)}
                </>
            ) : (<div className="w-full h-full flex justify-center items-center"><Spin /></div>)}
        </div>
    )
}
