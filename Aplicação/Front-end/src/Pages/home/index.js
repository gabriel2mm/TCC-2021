import React, { useState } from "react";
import { Drawer } from 'antd';
import { AuthenticatedLayoutComponent, GroupUserListComponent, QueueActivityComponent } from '../../Components';
import { ExpandAltOutlined, ShrinkOutlined, MergeCellsOutlined, ContainerOutlined, FileAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


function HomePage() {

    const [expanded, setExpanded] = useState(true);
    const [openQueue, setOpenQueue] = useState(false);

    return (
        <AuthenticatedLayoutComponent>
            <div className="relative">
                <div className="clear-both float-right flex flex-row justify-start items-center transition-all delay-500">
                    <Link to="/activities/new">
                        <button title="Nova atividade" className="mx-1  flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setExpanded(!expanded)}>
                            <FileAddOutlined />
                        </button>
                    </Link>
                    <Link to="/activities" className="mx-2">
                        <button title="Minhas atividades" className="mx-1  flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setExpanded(!expanded)}>
                            <ContainerOutlined />
                        </button>
                    </Link>
                    <button title="Expandir" className="mx-1  flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setExpanded(!expanded)}>
                        {expanded ? (<ExpandAltOutlined />) : (<ShrinkOutlined />)}
                    </button>
                    <button title="Abrir fila de atividades não atribuídas" className="mx-1 my-2 flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setOpenQueue(!openQueue)}>
                        <MergeCellsOutlined />
                    </button>
                </div>
                <div className="flex flex-row transition-all delay-500 clear-both">
                    {expanded ? (<GroupUserListComponent />) : (null)}
                    <div className="w-full h-screen bg-white rounded flex flex-row border-2 border-gray-200 transition-all delay-500">

                    </div>
                    <Drawer width={450} closable={true} visible={openQueue} onClose={e => setOpenQueue(false)}>
                        <QueueActivityComponent />
                    </Drawer>
                </div>
            </div>
        </AuthenticatedLayoutComponent>
    );
}

export default HomePage;
