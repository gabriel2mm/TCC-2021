import React, { useLayoutEffect, useState } from "react";
import { Drawer } from 'antd';
import { ActivitiesViewComponent, AuthenticatedLayoutComponent, GroupUserListComponent, QueueActivityComponent } from '../../Components';
import { ExpandAltOutlined, ShrinkOutlined, MergeCellsOutlined, ContainerOutlined, FileAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ActivityViewContextProvider, GroupSelectContextProvider, useGroupSelectContext, useUserContext } from '../../Contexts';

function HomePage() {
    const [expanded, setExpanded] = useState(false);
    const [openQueue, setOpenQueue] = useState(false);
    const context = useUserContext();
    const {changeDate, date} = useGroupSelectContext();

    useLayoutEffect(() => { changeDate(date);}, []);

    function changeExpanded() {
        setExpanded(!expanded);
        changeDate(date);
    }

    return (
            <AuthenticatedLayoutComponent>
                <div className="relative">
                    <div className="clear-both float-right flex flex-row justify-start items-center transition-all delay-500">
                        {context.containsPermission("Admin") || context.containsPermission("write:activities") ? (
                            <Link to="/activities/new" className="mr-1">
                                <button title="Nova atividade" className="flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" >
                                    <FileAddOutlined />
                                </button>
                            </Link>
                        ) : (null)}

                        {context.containsPermission("Admin") || context.containsPermission("read:activities") || context.containsPermission("activities") || context.containsPermission("receive:activity") ? (
                            <Link to="/activities" className="mr-1">
                                <button title="Minhas atividades" className="flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer">
                                    <ContainerOutlined />
                                </button>
                            </Link>
                        ) : (null)}

                        {context.containsPermission("Admin") || context.containsPermission("activities") ? (
                            <>
                                <button title="Expandir" className="mr-1 flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => changeExpanded()}>
                                    {expanded ? (<ShrinkOutlined />) : (<ExpandAltOutlined />)}
                                </button>
                                <button title="Abrir fila de atividades não atribuídas" className="my-2 flex flex-row justify-center items-center bg-gray-100 border-2 border-gray-200 rounded w-8 h-8 cursor-pointer" onClick={e => setOpenQueue(!openQueue)}>
                                    <MergeCellsOutlined />
                                </button>
                            </>
                        ) : (null)}

                    </div>
                    <div style={{"min-width": "300px"}} className="flex flex-col lg:flex-row transition-all delay-500 clear-both justify-between items-stretch content-between">
                        {expanded ? (<GroupUserListComponent />) : (null)}
                        <div className="w-full min-h-screen bg-white rounded flex flex-row border-2 border-gray-200 transition-all delay-500">
                            <ActivityViewContextProvider>
                                <ActivitiesViewComponent />
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
