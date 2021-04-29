import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import {LoginPage, ForgotPasswordPage, ResetPasswordPage, HomePage} from '../Pages';

export default function PublicRoutes(){
    return (
        <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/forgot-password" exact component={ForgotPasswordPage}/>
            <Route path="/reset-password" exact component={ResetPasswordPage}/>
            <Route path="/home" exact component={HomePage}/>
            <Route path="/**" render={() => <Redirect to="/" />} />
        </Switch>
    );
}