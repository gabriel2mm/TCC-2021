import React, { useState, useEffect } from 'react'
import { List, message, Spin} from 'antd';
import { API } from '../../Services';
import { useUserContext } from '../../Contexts';
import moment from 'moment';

export default function QueueActivityComponent() {

    const context = useUserContext();
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        loadQueue();
    }, []);

    async function loadQueue() {
        try {
            setLoading(true);
            const response = await API().get('/api/activities/queue');
            if (response.status >= 200 && response.status < 300) {
                setActivities(response.data);
            }
        } catch (e) {
            console.log(e);
            message.error("Não foi possível carregar fila de atividades não atribuídas!")
        }
        setLoading(false);
    }

    function renderColor(created, limit, status) {

        const currentDate = new Date();
        const initialDate = new Date(created);
        const finalDate = new Date(limit);

        const diff1 = moment(finalDate).diff(moment(initialDate), 'minutes');
        const diff2 = moment(currentDate).diff(moment(initialDate), 'minutes');

        let result = Math.abs(100 * diff2 / diff1);

        if (isNaN(result))
            result = 0;

        if (status == "ABERTO" || status == "EM_ANDAMENTO") {
            if (result < 40) {
                return "bg-green-500";
            } else if (result >= 40 && result < 70) {
                return "bg-yellow-500";
            } else if (result >= 70) {
                return "bg-red-500";
            }
        } else {
            return "bg-blue-500";
        }
    }

    return (
        <div className="bg-white">

            <h2 className="text-lg font-bold text-gray-800">Fila - Atividades não atribuídas</h2>
            {!loading ? (
                <List className="overflow-y-auto">
                    {activities.map((activity, index) => (
                        <a href={`/activities/${activity.id}`} key={index}>
                            <List.Item>
                                <div className="grid grid-cols-12 gap-2 w-full rounded-lg shadow cursor-pointer hover:shadow-lg  bg-white transition-all delay-200">
                                    <div className={`${renderColor(activity.created, activity.dateLimit, activity.status)} w-full h-full rounded-tl-lg rounded-bl-lg`}></div>
                                    <div className="w-full col-span-11 h-full">
                                        <div className="flex flex-col py-2 px-2">
                                            <span className="text-md text-gray-800 font-medium"><b>Atividade</b>: {activity.number}</span>
                                            <span className="font-thin text-gray-600"><b>Data de criação:</b> {moment(activity.created).format("DD/MM/yyyy HH:mm")}</span>
                                            <span className="font-thin text-gray-600"><b>Data limite:</b> {moment(activity.dateLimit).format("DD/MM/yyyy HH:mm")}</span>
                                            <span className="font-thin text-gray-600"><b>Categoria:</b> {activity.category?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </List.Item>
                        </a>
                    ))}
                </List>
            ) : (<center><Spin /></center>)}

        </div>
    )
}

