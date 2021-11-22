import { message } from 'antd';
import React, {useState, useContext, createContext} from 'react';
import { API } from '../Services';


export const GroupSelectContext = createContext({activities: [], type: '', id: '', changeGroup: null, date: new Date(), changeDate: null});

export function GroupSelectContextProvider({children}){
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [activities, setActivities] = useState([]);
    
    function changeDate(date){
        setDate(date);
        setTimeout(() => {loadAcitivites();} , 100);
        setTimeout(() => {loadAcitivites();} , 100);
    }

    async function changeGroup(type, id){
        setType(type);
        setId(id);
        setTimeout(() => {loadAcitivites();} , 100);
        setTimeout(() => {loadAcitivites();} , 100);
    }

    async function loadAcitivites(){
        let url = `/api/activities/all/organization?date=${date.getTime()}`;
        if(type == "g" || type=="u"){
            url = `/api/activities/all/group-or-user?type=${type}&id=${id}&date=${date.getTime()}`;
        }

        try{
            const response = await API().get(url);
            if(response.status >= 200 && response.status < 300){
                setActivities(response.data);
                console.log("carregou as atividades");
            }
        }catch(e){
            message.error("Não foi possível carregar atividades!");
        }
    }

    return (
        <GroupSelectContext.Provider value={{type, id, date, activities, changeGroup, changeDate}}>{children}</GroupSelectContext.Provider>
    )
}


export function useGroupSelectContext(){
    const context = useContext(GroupSelectContext);

    return context;
}