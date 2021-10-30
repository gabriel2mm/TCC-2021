import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {
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
    ChangePasswordPage,
    CapacityPage,
    NewCapacityPage,
    CapacityDetailPage,
    SLAPage,
    NewSLAPage,
    SLADetailPage,
    MyActivitiesPage,
    ActivityDetailPage,
    NewActivityPage,
    DashboardPage,
    TokenSecurityPage,
    UserDetailsPage
} from '../Pages';

export default function AuthenticatedRoutes(){
    return (
        <Switch>
            <Route path="/" exact component={HomePage}/>
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
            <Route path="/settings/users/:id" exact component={UserDetailsPage} />
            <Route path="/settings/my-profile" component={MyProfilePage}/>
            <Route path="/settings/change-password" exact component={ChangePasswordPage}/>
            <Route path="/settings/skills" exact component={SkillPage}/>
            <Route path="/settings/skills/new" exact component={NewSkillPage}/>
            <Route path="/settings/skills/:id" exact component={SkillDetailPage}/>
            <Route path="/settings/capacities" exact component={CapacityPage}/>
            <Route path="/settings/capacities/new" exact component={NewCapacityPage}/>
            <Route path="/settings/capacities/:id" exact component={CapacityDetailPage}/>
            <Route path="/settings/sla" exact component={SLAPage}/>
            <Route path="/settings/sla/new" exact component={NewSLAPage}/>
            <Route path="/settings/sla/:id" exact component={SLADetailPage}/>
            <Route path="/activities" exact component={MyActivitiesPage}/>
            <Route path="/activities/new" exact component={NewActivityPage}/>
            <Route path="/activities/:id" exact component={ActivityDetailPage}/>
            <Route path="/settings/token" exact component={TokenSecurityPage}/>
            <Route path="/chat" component={ChatPage}/>
            <Route path="/dashboard" component={DashboardPage}/>
            <Route path="/**" render={() => <Redirect to="/" />} />
        </Switch>
    )
}