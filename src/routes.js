import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Hoc from './hoc/hoc';

import Homepage from './components/homepage/Homepage';

import UserDetail from './components/user/UserDetail';
import UserList from './components/user/UserList';

import SectorDetail from './components/sector/SectorDetail';
import SectorList from './components/sector/SectorList';

const BaseRouter = (props) => (
    <Hoc>
        {
            props.token === null ? (
                <Route exact path = '/' component = { Homepage } />
            ) : (
                <div>
                    <Route exact path = '/informacoes_usuario' component = { UserDetail } />
                    <Route exact path = '/lista_de_usuarios' component = { UserList } />

                    <Route exact path = '/setor/:slug' component = { SectorDetail } />
                    <Route exact path = '/lista_de_setores' component = { SectorList } />
                </div>
            )
        }
    </Hoc>
);

const mapStateToProps = state => {
    return { token: state.auth.token };
};

export default withRouter(connect(mapStateToProps)(BaseRouter));