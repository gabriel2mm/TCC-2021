import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import {LoginPage} from '../Pages';

export default function PublicRoutes(){
    return (
        <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/**" render={() => <Redirect to="/" />} />
        </Switch>
    );
}