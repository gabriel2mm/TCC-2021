import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

function BreadCrumbComponent() {
    const location = window.location.pathname;
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const pageList = location.split('/');
        const routes = [];
        pageList.forEach(p => {
            if (p)
                routes.push({ path: p, breadcrumbName: p });
        });

        setPages(routes);

    }, [location]);

    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;

        return last ? (
            <span className="text-gray-800 font-bold  ">{route.breadcrumbName.toLowerCase().charAt(0).toUpperCase() + route.breadcrumbName.substr(1)}</span>
        ) : (
            <Link to={`/${paths.join('/')}`} className="text-gray-300 hover:text-purple-800 visited:text-purple-600">{route.breadcrumbName.toLowerCase().charAt(0).toUpperCase() + route.breadcrumbName.substr(1)}</Link>
        );
    }

    return (
        <div className="w-max py-2 px-5 m-2 bg-gray-200 rounded-2xl ">
            <Breadcrumb itemRender={itemRender} routes={pages} />
        </div>
    );
}

export default BreadCrumbComponent;