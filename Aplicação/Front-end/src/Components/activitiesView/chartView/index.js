import React, { useState, useMemo, useEffect, useRef } from 'react';
import { message, Spin } from 'antd';
import axios from 'axios';
import { useActivityViewContext, useGroupSelectContext, useUserContext } from '../../../Contexts';
import "./style.css";
import { API } from '../../../Services';
import moment from 'moment';

function ChartViewComponent() {
    const [currDate, setCurrDate] = useState(new Date());
    const context = useUserContext();
    const containerRef = useRef();
    const [difHours, setDifHours] = useState(24);
    const [resources, setResources] = useState([]);
    const { activities, type, id } = useGroupSelectContext();
    const [loading, setLoading] = useState(true);
    const [headers, setHeaders] = useState([]);
    const { changeActivity, handleShowModal } = useActivityViewContext();

    useEffect(() => {
        getHead();
        setLoading(false);
        loadResource();

        setInterval(() => {
            setCurrDate(new Date());
        }, 60000);

    }, [activities]);

    async function loadResource() {
        if(context.containsPermission("Admin") || context.containsPermission("activities")){
            let url = "/api/users";
            if (type == "u") {
                url = `/api/users/${id}`;
            } else if (type == "g") {
                url = `/api/groups/${id}`;
            }
    
            try {
                const response = await API().get(url);
                if (response.status >= 200 && response.status < 300) {
                    if (type == "u") {
                        setResources([response.data]);
                    } else if (type === "g") {
                        setResources(response.data?.users);
                    } else {
                        setResources(response.data);
                    }
                }
            } catch (e) {
                console.log(e);
                message.error("Não foi possível carregar recursos");
            }
        }else if(context.containsPermission("receive:activity")){
            setResources([context.user]);
        }
    }

    function groupBy(data, key) {
        return data.reduce(function (acc, item) {
            (acc[item[key]["id"]] = acc[item[key]["id"]] || []).push(item);
            return acc;
        }, {});
    };

    function padStart(number, digits = 2, emptyDigit = 0) {
        let length = 0;
        let n = Math.abs(number);
        let absoluteNumber = n;
        do {
            n /= 10;
            length++;
        } while (n >= 1);
        const prefix = Array(Math.max((digits - length) + 1, 0)).join(emptyDigit);
        return number < 0 ? `-${prefix}${absoluteNumber}` : prefix + number;
    }

    function getHead() {
        const tmpHeaders = [];
        for (var i = 0; i < difHours; i++) {
            tmpHeaders.push({ hour: padStart(i, 2, 0) });
        }

        setHeaders(tmpHeaders);
    }

    function handleShowActivity(activity) {
        changeActivity(activity);
        handleShowModal();
    }

    function renderHead() {
        return headers.map((item, i) => {
            const width = containerRef.current?.offsetWidth;
            const space = 300 + (i * ((width - 300) / difHours));
            return (
                <div style={{ zIndex: 1, position: "absolute", height: "100%", width: ((width - 300) / 24), left: `${i > 0 ? space : 300}px`, top: 0, borderLeft: "1px dashed #CCC", textAlign: "center" }}>
                    <div style={{ position: "absolute", background: "#CCC", width: "24px", height: "25px", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <p>{item.hour}</p>
                    </div>
                </div>
            )
        });
    }

    function calculeLeftItem(created) {
        const hour = new Date(created).getHours();
        const minutes = new Date(created).getMinutes();
        const width = containerRef.current?.offsetWidth;
        const space = (hour * ((width - 300) / difHours));
        const totalMinutes = 100*minutes/ 60;
        const widthSpace = ((width - 300) / difHours);

        return space + (totalMinutes / 100) * widthSpace;
    }

    function calculeWidthItem(activity, created, deadline, unity) {
        
        let init = new Date(created).getHours();
        let limit = new Date(deadline).getHours();
        let duration = limit - init;
        switch(unity){
            case "m":
                init = new Date(created).getMinutes();
                limit = new Date(deadline).getMinutes();
                duration = (limit > init ? limit - init : init - limit) / 160;
                break;
            case "h":
                init = new Date(created).getHours();
                limit = new Date(deadline).getHours();
                break;
            case "d":
                init = new Date(created).getDate();
                limit = new Date(deadline).getDate();
                duration = 23 * (limit - init);
                break;
        }
        
        
        const width = duration * ((containerRef.current?.offsetWidth - 300) / 24);

        return width;
    }

    function calculeColor(activity){
        const currentDate = new Date();
        const initialDate = new Date(activity.created);
        const finalDate = new Date(activity.dateLimit);

        const diff1 = moment(finalDate).diff(moment(initialDate), 'minutes');
        const diff2 = moment(currentDate).diff(moment(initialDate), 'minutes');

        let result = Math.abs(100 * diff2 / diff1);
        
        if(isNaN(result))
            result = 0;
        
        if(activity.status == "ABERTO" || activity.status == "EM_ANDAMENTO"){
            if(result < 40){
                return "green";
            }else if(result >= 40 && result < 80){
                return "yellow";
            }else if(result >= 80){
                return "red";
            }
        }else{
            return "blue";
        }
    }

    return (
        loading || !activities ? (<div className="w-full h-full flex flex-row justify-center items-center"><Spin /></div>) : (
            <>
                <div id="container" ref={containerRef} style={{ width: "100%", minHeight: "1080px", "overflow-x": "auto", "overflow-y": "auto", "position": "relative" }}>
                    <div className="bg-gray-100" style={{ "width": "300px", "min-height": "1080px" }}>
                        <h3 style={{ "height": "40px", fontSize: "16pt", textAlign: "center" }}>Recursos</h3>
                        <div style={{position: 'absolute',height: '100%',left: 300 + calculeLeftItem(currDate),top: '0px', borderLeft: '1px solid red', textAlign: 'center', width: '1px', zIndex: 4}}></div>
                        {renderHead()}
                        {resources.map((resource, i) => {
                            return (
                                <div className={`flex flex-col flex-1 justify-center items-center border border-gray-300 ${i % 2 === 0 ? "" : "bg-gray-200"}`} style={{ "height": "70px", "width": "100%", paddingLeft: 10 }} key={i}>
                                    <span className="text-md font-medium">{resource.firstName} {resource.lastName}</span>
                                    <ul className={`${i % 2 === 0 ? "bg-gray-100" : "bg-gray-200"} flex flex-row`} style={{ position: "absolute", left: 300, width: "310%", height: 70, top: (i * 70) + 40 }}>
                                        {groupBy(activities, "assigned")[resource.id]?.map((activity, j) => {
                                            return (
                                                <li key={j} onClick={() => handleShowActivity(activity)} className={`cursor-pointer bg-${calculeColor(activity)}-400 border border-${calculeColor(activity)}-500`} style={{ zIndex: 2, position: "absolute", height: 70, borderRadius: 6, width: calculeWidthItem(activity, activity.created, activity.dateLimit, activity.category.sla.unity), left: calculeLeftItem(activity.created) }}></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    )
}

export default ChartViewComponent;