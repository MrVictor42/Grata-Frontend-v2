import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from './hoc/hoc';

import Homepage from './components/homepage/Homepage';
import Login from './components/login/Login';

const BaseRouter = () => (
    <Hoc>
        <Route exact path = '/' component = { Homepage } />
        <Route exact path = '/login' component = { Login } />
    </Hoc>
);

export default BaseRouter;