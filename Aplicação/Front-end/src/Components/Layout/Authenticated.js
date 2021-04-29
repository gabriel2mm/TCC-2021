import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MenuOutlined, SearchOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import {BreadCrumbComponent} from '../index';
import {Menu, Dropdown} from 'antd';

function AuthenticatedLayoutComponent({ children }) {

    const refMenu = useRef();
    const buttonActive = "px-5 flex md:justify-center items-center hover:text-white focus:text-white flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-3xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200";
    const buttonNotActive = "p-2 lg:px-4 px-5 md:px-0 my-2 flex md:justify-center items-center md:my-0 md:mx-2 text-md text-gray-800 font-semibold flex-shrink-0 rounded-3xl focus:bg-gray-200 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-800"

    function openMenu() {
        refMenu.current.classList.toggle("hidden");
        refMenu.current.classList.toggle("flex");
    }

    const menu = (
        <Menu>
          <Menu.Item>
            <Link to="/profile">Perfil</Link>
          </Menu.Item>
          <Menu.Item>
             <Link to="/">Sair</Link>
          </Menu.Item>
        </Menu>
      );

    return (
        <>
            <header className="header-2 relative">
                <nav className="bg-white w-full mb-15 md:mb-0 absolute md:static md:px-5 py-4 shadow-lg">
                    <div className="container px-4 mx-auto md:flex md:items-center">
                        <div className="flex justify-between items-center">
                            
                            <h1><Link to="/home" className="flex-shrink-0 text-gray-800 font-bold text-2xl md:text-lg lg:text-2xl hover:text-purple-800 focus:text-purple-800 transition-colors duration-800 focus:underline" tabIndex="1">Field Service Cloud</Link></h1>

                            <button onClick={openMenu} className="flex justify-center items-center border border-solid border-gray-600 w-10 h-10 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                                <MenuOutlined className="mt-0.5" />
                            </button>
                        </div>

                        <div ref={refMenu} className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            <NavLink to="/home" activeClassName={`${buttonActive}`} tabIndex="2">Atividades</NavLink>
                            <NavLink to="/" className={`${buttonNotActive}`} tabIndex="3">Relatórios</NavLink>
                            <NavLink to="/" className={`${buttonNotActive}`} tabIndex="4">Configurações</NavLink>
                            <ul className="flex flex-row justify-around md:justify-center items-center">
                                <li className="text-gray-500 text-xl flex justify-center items-center py-2 px-2 rounded-full hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-800"><SearchOutlined /></li>
                                <Link to="/chat" className="mx-10 py-2 px-2 rounded-full hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-800 h-auto flex justify-center rounded-full hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-800 text-gray-500"><li className="text-gray-500 text-xl flex flex-1 justify-center items-center "><MessageOutlined /></li></Link>
                                <li className="text-gray-500 text-xl flex justify-center items-center py-2 px-2 rounded-full hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-800">
                                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                    <UserOutlined />
                                </Dropdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto pt-20 md:pt-3"><BreadCrumbComponent/></div>
            <div className="container mx-auto bg-gray-100 px-10 py-5 mt-5 mb-10"> {children}</div>
            <footer className="text-md text-gray-600 text-center">Todos os direitos reservados. <p><strong>Field Service Cloud &copy; 2021</strong></p> </footer>
        </>
    );
}

export default AuthenticatedLayoutComponent;