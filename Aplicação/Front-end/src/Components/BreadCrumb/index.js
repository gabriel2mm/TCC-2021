import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import "./style.css";

function BreadCrumbComponent() {

    const location = window.location;
    const [pages, setPages] = useState([]);
    useEffect(() => {
        const location = window.location.pathname;
        const arrayPages = location.split("/");
        setPages(arrayPages)
    }, [location]);

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            {pages.map(r => {
                if(r){
                    return (
                        <Breadcrumb.Item>
                            <Link to={`/${r}`}>{r}</Link>
                        </Breadcrumb.Item>
                    )
                }

                return null;
            })}
        </Breadcrumb>
    );
}

export default BreadCrumbComponent;