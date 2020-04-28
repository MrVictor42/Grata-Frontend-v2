import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';
import FormLogin from '../forms/FormLogin';

import { logout } from '../../store/auth';

const { Header } = Layout;

class Navbar extends Component {

    render() {
        return (
            <Header className = 'header'>
                <Menu className = 'menu' mode = 'horizontal'>
                    {
                        this.props.isLogged === null ? (
                            null
                        ) : (
                            <Menu.Item>
                                <Dropdown />
                            </Menu.Item>
                        )
                    }
                    {
                        this.props.isLogged === null ? (
                            <Menu.Item>
                                <FormLogin props = { this.props } />
                            </Menu.Item>
                        ) : (
                            <Menu.Item onClick = { this.props.logout }>
                                <Link to = '/'><p className = 'textNavbar'> Logout </p></Link>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </Header>
        );
    }
}

const mapStateToProps = state => {
    
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));