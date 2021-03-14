import React from 'react';
import PublicRoutes from './public';
import PrivateRoutes from './private';

function Routes() {

    function defineRoutes(){
        const token = localStorage.getItem("token");
        if(token){
            return <PrivateRoutes />       
        }

        return <PublicRoutes />
    }

  return defineRoutes();
}

export default Routes;