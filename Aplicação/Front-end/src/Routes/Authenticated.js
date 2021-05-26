import React from 'react';
import {Switch, Route } from 'react-router-dom';

export default function AuthenticatedRoutes(){
    return (
        <Switch>
            <Route path="/" exact render={() => <span>Private</span>} />
            <Route path="/**" render={() => <span>Erro Não foi possível encontrar o que voce estava procurando</span>}/>
        </Switch>
    )
}