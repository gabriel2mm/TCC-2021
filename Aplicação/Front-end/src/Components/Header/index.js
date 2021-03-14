import React from 'react';
import "./style.css";

function HeaderComponent({ children }) {
    return (
        <header className="app_header">
            <div className="app_header_container">
                <h1 className="app_logo">Aplicacao</h1>
                {children}
            </div>
        </header>
    );
}

export default HeaderComponent;