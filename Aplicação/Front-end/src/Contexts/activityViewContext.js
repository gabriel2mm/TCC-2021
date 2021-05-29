import React, {useState, useContext, createContext} from 'react';



export const types = { "map" : "map", "table": "table", "chart" : "chart"}
export const ActivityViewContext = createContext({screen: types.chart, activity : {},  showModal : false, changeViewScreen : null, handleShowModal:null, changeActivity: null});

export function ActivityViewContextProvider({children}){

    const [screen, setScreen] = useState(types.chart);
    const [activity, setActivity] = useState({});
    const [showModal, setShowModal] = useState(false);

    function changeViewScreen(screen){
        setScreen(screen);
    }

    function handleShowModal(){
        setShowModal(!showModal);
    }

    function changeActivity(activity){
        setActivity(activity)
    }

    return <ActivityViewContext.Provider value={{screen, activity, showModal, changeViewScreen, handleShowModal, changeActivity}}>{children}</ActivityViewContext.Provider>

}

export function useActivityViewContext(){
    const context = useContext(ActivityViewContext);

    return context;
}