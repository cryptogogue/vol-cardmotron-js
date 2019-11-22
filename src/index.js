// Copyright (c) 2019 Cryptogogue, Inc. All Rights Reserved.

import * as cardmotron from 'cardmotron/export';
import * as fgc from 'fgc/export';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

import { configure } from 'mobx';
configure ({
    enforceActions:     'always',
});

import registerServiceWorker            from './registerServiceWorker';
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

//----------------------------------------------------------------//
const App = () => {

    return (<BrowserRouter>
        <div>
            <Switch>
                <Route exact path = "/debug/aes"        component = { fgc.debug.AESScreen }/>
                <Route exact path = "/"                 component = { cardmotron.EditorScreen }/>
            </Switch>
        </div>
    </BrowserRouter>);
}

//----------------------------------------------------------------//
ReactDOM.render (
    <App/>,
    document.getElementById ( 'root' )
);

registerServiceWorker ();
