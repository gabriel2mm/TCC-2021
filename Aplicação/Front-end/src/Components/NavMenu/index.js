import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCommentAlt, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom'
import "./style.css";

function NavMenuComponent() {
    const [activePage, setActivePage] = useState("");

    useEffect(()=> {
        const location = window.location.pathname;
        const page = location.split("/")[1];
        setActivePage(page);
    }, []);

    function getEffect(page){
        if(page === activePage){
            return (<div className="app_menu_item_active"></div>);
        }

        return (<div className="app_boder_animated"></div>);
    }

    return (
        <nav className="app_nav">
            <div className="app_nav_mobile">
                <div className="app_menu_hamburguer"><FontAwesomeIcon icon={faBars} /></div>
            </div>

            <ul className="app_menu_items">
                <li className="app_menu_item">
                    <span className="app_menu_item_title">Atividades</span>
                    {getEffect("")}
                </li>
                <li className="app_menu_item">
                    <span className="app_menu_item_title">Relatórios</span>
                    {getEffect("relatorio")}
                </li>
                <li className="app_menu_item">
                    <span className="app_menu_item_title">Configurações</span>
                    {getEffect("configuracao")}
                </li>
            </ul>
            <ul className="app_nav_menu_buttons">
                <li className="app_nav_menu_button">
                    <FontAwesomeIcon icon={faSearch} />
                </li>
                <li className="app_nav_menu_button">
                    <FontAwesomeIcon icon={faCommentAlt} />
                </li>
                <li className="app_nav_menu_button">
                    <FontAwesomeIcon icon={faCog} />
                </li>
            </ul>
        </nav>
    );
}

export default NavMenuComponent;