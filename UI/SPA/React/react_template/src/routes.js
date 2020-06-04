import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { CrudSample } from './components/CrudSample';
export const routes = <Layout>
        <Route exact path='/' component={ Home } />
        <Route path='/counter' component={ Counter } />
        <Route path='/fetchdata' component={ FetchData } />
        <Route path='/crudsample' component={ CrudSample } />
    </Layout>;