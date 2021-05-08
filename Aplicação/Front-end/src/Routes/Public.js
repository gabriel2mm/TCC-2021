import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import {LoginPage, ForgotPasswordPage, ResetPasswordPage, HomePage, SettingsPage, AboutPage, ProfilePage, ProfileDetailPage} from '../Pages';
import {ChatComponent} from '../Components';

export default function PublicRoutes(){
    return (
        <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/forgot-password" exact component={ForgotPasswordPage}/>
            <Route path="/reset-password" exact component={ResetPasswordPage}/>
            <Route path="/home" exact component={HomePage}/>
            <Route path="/settings" exact component={SettingsPage} />
            <Route path="/settings/about" exact component={AboutPage} />
            <Route path="/settings/profiles" exact component={ProfilePage} />
            <Route path="/settings/profiles/:id" exact component={ProfileDetailPage} />
            <Route path="/chat" exact render={() => <ChatComponent /> }/>
            <Route path="/**" render={() => <Redirect to="/" />} />
        </Switch>
    );
}