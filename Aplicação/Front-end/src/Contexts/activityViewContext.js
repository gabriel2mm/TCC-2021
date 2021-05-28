import React, {useState, useContext, createContext} from 'react';



export const types = { "map" : "map", "table": "table", "chart" : "chart"}
export const ActivityViewContext = createContext({screen: types.chart, changeViewScreen : null});

export function ActivityViewContextProvider({children}){

    const [screen, setScreen] = useState(types.chart);


    function changeViewScreen(screen){
        setScreen(screen);
    }

    return <ActivityViewContext.Provider value={{screen, changeViewScreen}}>{children}</ActivityViewContext.Provider>

}

export function useActivityViewContext(){
    const context = useContext(ActivityViewContext);

    return context;
}