import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import {
    LoginPage, 
    ForgotPasswordPage, 
    ResetPasswordPage
} from '../Pages';

export default function PublicRoutes(){
    return (
        <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/forgot-password" exact component={ForgotPasswordPage}/>
            <Route path="/reset-password" exact component={ResetPasswordPage}/>
        </Switch>
    );
}