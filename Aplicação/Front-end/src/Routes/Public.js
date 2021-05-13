import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import {
    LoginPage, 
    ForgotPasswordPage, 
    ResetPasswordPage, 
    HomePage, 
    SettingsPage, 
    AboutPage, 
    ProfilePage, 
    ProfileDetailPage, 
    NewProfilePage, 
    NewGroupPage, 
    CategoryPage, 
    CategoryDetailPage,
    NewUserPage,
    UserPage,
    userProfilePage
} from '../Pages';

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
            <Route path="/settings/profiles/new" exact component={NewProfilePage} />
            <Route path="/settings/profiles/:id" exact component={ProfileDetailPage} />
            <Route path="/settings/group/new" exact component={NewGroupPage} />
            <Route path="/settings/categories" exact component={CategoryPage} />
            <Route path="/settings/categories/new" exact component={CategoryDetailPage} />
            <Route path="/settings/categories/:id" exact component={CategoryDetailPage} />
            <Route path="/settings/users" exact component={UserPage} />
            <Route path="/settings/users/new" exact component={NewUserPage} />
            <Route path="/settings/users/:id" exact component={NewUserPage} />
            <Route path="/settings/my-profile" component={userProfilePage}/>
            <Route path="/**" render={() => <Redirect to="/" />} />
        </Switch>
    );
}