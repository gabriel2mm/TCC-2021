import React, { useState } from "react";
import { Drawer } from 'antd';
import { ActivitiesViewComponent, AuthenticatedLayoutComponent, GroupUserListComponent, QueueActivityComponent } from '../../Components';
import { ExpandAltOutlined, ShrinkOutlined, MergeCellsOutlined, ContainerOutlined, FileAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {ActivityViewContextProvider} from '../../Contexts';


function HomePage() {
    const [expanded, setExpanded] = useState(true);
    const [openQueue, setOpenQueue] = useState(false);

    return (
        <AuthenticatedLayoutComponent>
            <div className="relative">
                <div className="clear-both float-right flex flex-row justify-start items-center transition-all delay-500">
                    <Link to="/activities/new" className="mr-1">
                        <button title="Nova atividade" className="flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setExpanded(!expanded)}>
                            <FileAddOutlined />
                        </button>
                    </Link>
                    <Link to="/activities" className="mr-1">
                        <button title="Minhas atividades" className="flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setExpanded(!expanded)}>
                            <ContainerOutlined />
                        </button>
                    </Link>
                    <button title="Expandir" className="mr-1 flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setExpanded(!expanded)}>
                        {expanded ? (<ExpandAltOutlined />) : (<ShrinkOutlined />)}
                    </button>
                    <button title="Abrir fila de atividades não atribuídas" className="my-2 flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setOpenQueue(!openQueue)}>
                        <MergeCellsOutlined />
                    </button>
                </div>
                <div className="flex flex-row transition-all delay-500 clear-both justify-between items-stretch content-between">
                    {expanded ? (<GroupUserListComponent />) : (null)}
                    <div className="w-full min-h-screen bg-white rounded flex flex-row border-2 border-gray-200 transition-all delay-500">
                    <ActivityViewContextProvider> 
                        <ActivitiesViewComponent/>
                    </ActivityViewContextProvider> 
                    </div>
                    <Drawer width={350} closable={true} visible={openQueue} onClose={e => setOpenQueue(false)}>
                        <QueueActivityComponent />
                    </Drawer>
                </div>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default HomePage;
