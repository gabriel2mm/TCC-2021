import { message } from 'antd';
import React, {useState, useContext, createContext} from 'react';
import { API } from '../Services';


export const GroupSelectContext = createContext({loading: true, activities: [], type: '', id: '', changeGroup: null, date: new Date(), changeDate: null});

export function GroupSelectContextProvider({children}){
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    
    function changeDate(date){
        setDate(date);
        loadAcitivites()
    }

    async function changeGroup(type, id){
        setType(type);
        setId(id);
        loadAcitivites();
    }

    async function loadAcitivites(){
        setLoading(true);
        let url = `/api/activities/all/organization?date=${date.getTime()}`;
        if(type == "g" || type=="u"){
            url = `/api/activities/all/group-or-user?type=${type}&id=${id}&date=${date.getTime()}`;
        }

        try{
            const response = await API().get(url);
            if(response.status >= 200 && response.status < 300){
                setActivities(response.data);
                setLoading(false);
            }
        }catch(e){
            message.error("Não foi possível carregar atividades!");
        }
    }

    return (
        <GroupSelectContext.Provider value={{type, id, date, loading, activities, changeGroup, changeDate}}>{children}</GroupSelectContext.Provider>
    )
}


export function useGroupSelectContext(){
    const context = useContext(GroupSelectContext);

    return context;
}