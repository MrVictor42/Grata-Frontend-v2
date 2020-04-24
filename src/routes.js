import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Hoc from './hoc/hoc';

import Homepage from './components/homepage/Homepage';

import UserDetail from './components/user/UserDetail';
import UserEdit from './components/user/UserEdit';
import UserRegister from './components/user/UserRegister';
import UserList from './components/user/UserList';

import ProjectList from './components/project/ProjectList';

const BaseRouter = (props) => (
    <Hoc>
        {
            props.token === null ? (
                <div>
                    <Route exact path = '/' component = { Homepage } />
                </div>
            ) : (
                <div>
                    <Route exact path = '/informacoes_usuario' component = { UserDetail } />
                    <Route exact path = '/edicao_usuario' component = { UserEdit } />
                    <Route exact path = '/registrar_usuario' component = { UserRegister } />
                    <Route exact path = '/lista_de_usuario' component = { UserList } />

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