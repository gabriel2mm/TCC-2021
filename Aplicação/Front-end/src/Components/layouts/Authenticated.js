import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MenuOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { BreadCrumbComponent, SearchActivityComponent, ChatComponent } from '../index';
import { ChatContextProvider, useUserContext } from '../../Contexts';
import { Menu, Dropdown } from 'antd';

function AuthenticatedLayoutComponent({ children }) {

    const refMenu = useRef();
    const buttonActive = "px-5 flex md:justify-center items-center hover:text-white focus:text-white flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-3xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200";
    const buttonNotActive = "p-2 lg:px-4 px-5 md:px-0 my-2 flex md:justify-center items-center md:my-0 md:mx-2 text-md text-gray-800 font-semibold flex-shrink-0 rounded-3xl focus:bg-gray-200 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-800"
    const context = useUserContext();

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/settings/my-profile">Meu perfil</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/settings/change-password">Alterar senha</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/" onClick={context.logout}>Sair</Link>
            </Menu.Item>
        </Menu>
    );

    function openMenu() {
        refMenu.current.classList.toggle("hidden");
        refMenu.current.classList.toggle("flex");
    }

    function getCurrentRoute(menuPath) {
        const path = window.location.pathname;
        let isActive = false;

        if(Array.isArray(menuPath)){  
            if(path){
                const arrayPath = path.split("/");
                arrayPath.forEach(element => {
                    if(menuPath.includes(path)){
                       isActive = true;
                    }
                });
            }
            
        }else{
            if (path && path.includes(menuPath)) {
                isActive = true;
            }
        }
        
        return isActive ? buttonActive : buttonNotActive;
    }

    return (
        <>
            <ChatContextProvider>
                <header className="header-2 relative min-w-max">
                    <nav className="bg-white w-full mb-15 md:mb-0 absolute md:static md:px-5 py-4 shadow-lg z-50 min-w-max">
                        <div className="container px-4 mx-auto md:flex md:items-center">
                            <div className="flex justify-between items-center">

                                <h1><Link to="/home" className="flex-shrink-0 text-gray-800 font-bold text-2xl md:text-lg lg:text-2xl hover:text-purple-800 focus:text-purple-800 transition-colors duration-800 focus:underline" tabIndex="1">OCR Field Service</Link></h1>

                                <button onClick={openMenu} className="flex justify-center items-center border border-solid border-gray-600 w-10 h-10 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                                    <MenuOutlined className="mt-0.5" />
                                </button>
                            </div>

                            <div ref={refMenu} className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                                <NavLink to="/home" className={getCurrentRoute(["/home", "/", "/activity", "/activities", "/activities/new"])} tabIndex="2">Atividades</NavLink>
                                {context.containsPermission("dashboard") || context.containsPermission("Admin") ? ( <NavLink to="/dashboard" className={`${getCurrentRoute("/dashboard")}`} tabIndex="3">Relatórios</NavLink>) : (null)}
                                {context.containsPermission("settings") || context.containsPermission("Admin") ? (<NavLink to="/settings" className={`${getCurrentRoute("/settings")}`} tabIndex="4">Configurações</NavLink>) : (null)}
                                <ul className="flex flex-row justify-around md:justify-center items-center ml-2 mt-5 md:mt-0">
                                    <SearchActivityComponent />

                                    <Link to="/chat" className="md:hidden">
                                        <li className="md:hidden antialiased mx-5 text-gray-500 text-2xl flex justify-center items-center py-2 px-2 rounded-full hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-800">
                                            <MessageOutlined />
                                        </li>
                                    </Link>

                                    <li className="antialiased py-2 px-2 md:ml-5 text-gray-500 md:text-gray-600 md:font-black text-2xl md:text-3xl flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-800">
                                        <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                            <UserOutlined />
                                        </Dropdown>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </header>
                <div className="lg:container mx-auto pt-20 md:pt-3"><BreadCrumbComponent /></div>
                <div className="mx-auto bg-gray-100 p-5 mt-5 mb-10 min-h-screen h-auto"> {children}</div>
                <footer className="text-md text-gray-600 text-center pb-5 min-w-max">Todos os direitos reservados. <p><strong>Field Service Cloud &copy; 2021</strong></p> </footer>
                <div className="hidden md:block"> <ChatComponent  defaultVisible={false}/> </div>
            </ChatContextProvider>
        </>
    );
}

export default AuthenticatedLayoutComponent;