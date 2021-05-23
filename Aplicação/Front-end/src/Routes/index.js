import React from 'react';
import PublicRoutes from './Public';
import AuthenticatedRoutes from './Authenticated';

function Routes() {
    function defineRoutes(){
        // const token = localStorage.getItem("token");
        // if(token){
        //     return <AuthenticatedRoutes />       
        // }

        return <PublicRoutes />
    }

  return defineRoutes();
}

export default Routes;