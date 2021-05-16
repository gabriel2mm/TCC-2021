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
    MyProfilePage,
    ChatPage,
    SkillPage,
    NewSkillPage,
    SkillDetailPage,
    GroupPage,
    GroupDetailPage,
    NewCategoryPage,
    ChangePasswordPage
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
            <Route path="/settings/groups" exact component={GroupPage} />
            <Route path="/settings/groups/new" exact component={NewGroupPage} />
            <Route path="/settings/groups/:id" exact component={GroupDetailPage} />
            <Route path="/settings/categories" exact component={CategoryPage} />
            <Route path="/settings/categories/new" exact component={NewCategoryPage} />
            <Route path="/settings/categories/:id" exact component={CategoryDetailPage} />
            <Route path="/settings/users" exact component={UserPage} />
            <Route path="/settings/users/new" exact component={NewUserPage} />
            <Route path="/settings/users/:id" exact component={NewUserPage} />
            <Route path="/settings/my-profile" component={MyProfilePage}/>
            <Route path="/settings/change-password" exact component={ChangePasswordPage}/>
            <Route path="/settings/skills" exact component={SkillPage}/>
            <Route path="/settings/skills/new" exact component={NewSkillPage}/>
            <Route path="/settings/skills/:id" exact component={SkillDetailPage}/>
            <Route path="/chat" component={ChatPage}/>
            <Route path="/**" render={() => <Redirect to="/" />} />
        </Switch>
    );
}