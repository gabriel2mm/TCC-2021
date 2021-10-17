import React from 'react';
import PublicRoutes from './Public';
import AuthenticatedRoutes from './Authenticated';
import { useUserContext } from '../Contexts';

function Routes() {
    const context = useUserContext();

    function defineRoutes(){
        const token = context.token;
        if(token){
            return <AuthenticatedRoutes />       
        }

        return <PublicRoutes />
    }

  return defineRoutes();
}

export default Routes;