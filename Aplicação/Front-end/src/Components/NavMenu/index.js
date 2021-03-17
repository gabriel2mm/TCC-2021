import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCommentAlt, faUserCircle, faBars, faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Menu, Dropdown } from 'antd';

import "./style.css";

function NavMenuComponent() {
    const menuMobile = useRef();
    const [activePage, setActivePage] = useState("");
    const location = window.location;
    const [modal, setModal] = useState({ isVisible: false });

    useEffect(() => {
        const location = window.location.pathname;
        const page = location.split("/")[1];
        setActivePage(page);
    }, [location]);

    function getCurrentSelectedPage(page) {
        return page === activePage ? <div className="app_menu_item_active"></div> : null;
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<FontAwesomeIcon icon={faUserEdit} />}> Perfil </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2" icon={<FontAwesomeIcon icon={faSignOutAlt} />}> Sair </Menu.Item>
        </Menu>
    );

    function showMenu() {
        const element = menuMobile.current;
        if (element.classList.contains("app_nav_menu_responsive--close")) {
            element.classList.remove("app_nav_menu_responsive--close");
            element.classList.add("app_nav_menu_responsive--open");
        } else {
            element.classList.remove("app_nav_menu_responsive--open");
            element.classList.add("app_nav_menu_responsive--close");
        }
    }

    function searchModal() {
        setModal({isVisible: true});
    }

    function handleCancelSearch(){
        setModal({isVisible: false});
    }

    function handleMenuClick(){
        console.log("menu")
    }

    return (
        <>
            <nav className="app_nav">
                <div className="app_nav_mobile" onClick={e => showMenu()}>
                    <div className="app_menu_hamburguer"><FontAwesomeIcon icon={faBars} /></div>
                </div>

                <div className="app_nav_menu_container app_nav_menu_responsive--close" ref={menuMobile}>
                    <ul className="app_menu_items">
                        <li className="app_menu_item">
                            <span className="app_menu_item_title">
                                <Link to="/">Atividades</Link>
                            </span>
                            {getCurrentSelectedPage("")}
                        </li>
                        <li className="app_menu_item">
                            <span className="app_menu_item_title">
                                <Link to="/relatorio">Relatórios</Link>
                            </span>
                            {getCurrentSelectedPage("relatorio")}
                        </li>
                        <li className="app_menu_item">
                            <span className="app_menu_item_title"><Link to="/configuracoes">Configurações</Link></span>
                            {getCurrentSelectedPage("configuracao")}
                        </li>
                    </ul>
                    <ul className="app_nav_menu_buttons">
                        <li className="app_nav_menu_button" onClick={searchModal}>
                            <FontAwesomeIcon icon={faSearch} />
                        </li>
                        <li className="app_nav_menu_button">
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </li>
                        <li className="app_nav_menu_button">
                            <Dropdown overlay={menu} arrow>
                                <FontAwesomeIcon icon={faUserCircle} />
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>
            <Modal title="Pesquisar" cancelButtonProps={{size: 0}}  footer={[]} visible={modal.isVisible} onCancel={handleCancelSearch} >
               <input type="text" placeholder="Pesquisar atividade..." className="ant-input"/>
            </Modal>

        </>
    );
}

export default NavMenuComponent;