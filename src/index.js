// Copyright (c) 2019 Cryptogogue, Inc. All Rights Reserved.

import pkg                  from '../package.json'
import * as cardmotron      from 'cardmotron';
import * as fgc             from 'fgc';
import { useClearCache }    from "react-clear-cache";

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

    const { isLatestVersion, emptyCacheStorage } = useClearCache ();

    if ( !isLatestVersion ) {
        console.log ( 'NEW VERSION DETECTED; EMPTYING CACHE' );
        emptyCacheStorage ();
    }

    return (<BrowserRouter>
        <div>
            <Switch>
                <Route
                    exact
                    path = "/"
                    render = {( props ) => <cardmotron.EditorScreen { ...props } version = { `${ pkg.name } ${ pkg.version }` }/>}
                />
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
