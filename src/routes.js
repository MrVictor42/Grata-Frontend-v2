import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Hoc from './hoc/hoc';

import Homepage from './components/homepage/Homepage';
import Login from './components/login/Login';

import ProjectList from './components/projects/ProjectList';

const BaseRouter = (props) => (
    <Hoc>
        {
            props.token === null ? (
                <div>
                    <Route exact path = '/' component = { Homepage } />
                    <Route exact path = '/login' component = { Login } />
                </div>
            ) : (
                <div>
                    <Route exact path = '/lista_de_projetos' component = { ProjectList } />
                </div>
            )
        }
    </Hoc>
);

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default withRouter(connect(mapStateToProps)(BaseRouter));