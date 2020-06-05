import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Layout } from './components/Layout';

import Home from './components/Home';
import RedirectOfAuth from './components/RedirectOfAuth';

import Counter from './containers/Counter';
import FetchData from './containers/FetchData';
import CrudSample from './containers/CrudSample';
import CrudSample2 from './containers/CrudSample2';

export const routes = 
        <Router>
            <Layout>
                <Route exact path='/' component={ Home } />
                <Route path='/RedirectEndpoint' component={ RedirectOfAuth } />
                <Route path='/counter' component={ Counter } />
                <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
                <Route path='/crudsample/:startDateIndex?' component={ CrudSample } />
                <Route path='/crudsample2/:startDateIndex?' component={ CrudSample2 } />
            </Layout>
        </Router>;