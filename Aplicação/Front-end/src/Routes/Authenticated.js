import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useUserContext } from '../Contexts';
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
    const context = useUserContext();

    return (
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/settings" exact render={ r => context.containsPermission("settings") || context.containsPermission("Admin") ? (<SettingsPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/about" exact component={AboutPage} />
            <Route path="/settings/profiles" exact render={ r => context.containsPermission("read:profile") || context.containsPermission("write:profile") || context.containsPermission("Admin") ? (<ProfilePage />) :  (<Redirect to="/"></Redirect>)} /> 
            <Route path="/settings/profiles/new" exact render={ r => context.containsPermission("write:profile") || context.containsPermission("Admin") ? (<NewProfilePage />) :  (<Redirect to="/"></Redirect>)}  />
            <Route path="/settings/profiles/:id" exact render={ r => context.containsPermission("read:profile") || context.containsPermission("write:profile") || context.containsPermission("Admin") ? (<ProfileDetailPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/groups" exact render={ r => context.containsPermission("read:group") || context.containsPermission("write:group") || context.containsPermission("Admin") ? (<GroupPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/groups/new" exact render={ r => context.containsPermission("write:group") || context.containsPermission("Admin") ? (<NewGroupPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/groups/:id" exact render={ r => context.containsPermission("read:group") || context.containsPermission("write:group") || context.containsPermission("Admin") ? (<GroupDetailPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/categories" exact render={ r => context.containsPermission("read:category") || context.containsPermission("write:category") || context.containsPermission("Admin") ? (<CategoryPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/categories/new" exact render={ r => context.containsPermission("write:category") || context.containsPermission("Admin") ? (<NewCategoryPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/categories/:id" exact render={ r => context.containsPermission("read:category") || context.containsPermission("write:category") || context.containsPermission("Admin") ? (<CategoryDetailPage />) :  (<Redirect to="/"></Redirect>)}  />
            <Route path="/settings/users" exact render={ r => context.containsPermission("read:user") || context.containsPermission("write:user") || context.containsPermission("Admin") ? (<UserPage />) :  (<Redirect to="/"></Redirect>)} />
            <Route path="/settings/users/new" exact render={ r => context.containsPermission("write:user") || context.containsPermission("Admin") ? (<NewUserPage />) :  (<Redirect to="/"></Redirect>)}  />
            <Route path="/settings/users/:id" exact render={ r => context.containsPermission("read:user")  || context.containsPermission("write:user") || context.containsPermission("Admin") ? (<UserDetailsPage />) :  (<Redirect to="/"></Redirect>)}  />
            <Route path="/settings/skills" exact render={ r => context.containsPermission("read:skill") || context.containsPermission("write:skill") || context.containsPermission("Admin") ? (<SkillPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/skills/new" exact render={ r => context.containsPermission("write:skill") || context.containsPermission("Admin") ? (<NewSkillPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/skills/:id" exact render={ r => context.containsPermission("read:skill") || context.containsPermission("write:skill") || context.containsPermission("Admin") ? (<SkillDetailPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/capacities" exact render={ r => context.containsPermission("read:capacity") || context.containsPermission("write:capacity") || context.containsPermission("Admin") ? (<CapacityPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/capacities/new" exact render={ r => context.containsPermission("write:capacity") || context.containsPermission("Admin") ? (<NewCapacityPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/capacities/:id" exact render={ r => context.containsPermission("read:capacity") || context.containsPermission("write:capacity") || context.containsPermission("Admin") ? (<CapacityDetailPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/sla" exact render={ r => context.containsPermission("read:sla") || context.containsPermission("write:sla") || context.containsPermission("Admin") ? (<SLAPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/sla/new" exact render={ r => context.containsPermission("write:sla") || context.containsPermission("Admin") ? (<NewSLAPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/sla/:id" exact render={ r => context.containsPermission("read:sla") || context.containsPermission("write:sla") || context.containsPermission("Admin") ? (<SLADetailPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/token" exact render={ r => context.containsPermission("integration") || context.containsPermission("Admin") ? (<TokenSecurityPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/chat" render={ r => context.containsPermission("admin:chat") || context.containsPermission("Admin") ? (<ChatPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/dashboard" render={ r => context.containsPermission("dashboard") || context.containsPermission("Admin") ? (<DashboardPage />) :  (<Redirect to="/"></Redirect>)}/>
            <Route path="/settings/my-profile" component={MyProfilePage}/>
            <Route path="/settings/change-password" exact component={ChangePasswordPage}/>
            <Route path="/activities" exact component={MyActivitiesPage}/>
            <Route path="/activities/new" exact component={NewActivityPage}/>
            <Route path="/activities/:id" exact component={ActivityDetailPage}/>
            <Route path="/**" render={() => <Redirect to="/" />} />
        </Switch>
    )
}