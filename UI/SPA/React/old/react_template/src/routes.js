import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { RedirectOfAuth } from './components/RedirectOfAuth';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { CrudSample } from './components/CrudSample';
import { CrudSample2 } from './components/CrudSample2';
export const routes = <Layout>
        <Route exact path='/' component={ Home } />
        <Route path='/RedirectEndpoint' component={ RedirectOfAuth } />
        <Route path='/counter' component={ Counter } />
        <Route path='/fetchdata' component={ FetchData } />
        <Route path='/crudsample' component={ CrudSample } />
        <Route path='/crudsample2' component={ CrudSample2 } />
    </Layout>;