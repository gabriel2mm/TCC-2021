import React from 'react';
import {Switch, Route, Reditrect} from 'react-router-dom';

export default function PrivateRoutes(){
    return (
        <Switch>
            <Route path="/" exact render={() => <span>Private</span>} />
            <Route path="/**" render={() => <span>Erro Não foi possível encontrar o que voce estava procurando</span>}/>
        </Switch>
    )
}