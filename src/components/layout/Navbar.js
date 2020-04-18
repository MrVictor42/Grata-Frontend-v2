import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';

import { logout } from '../../store/auth';

const { Header } = Layout;

const Navbar = (props) => {
    return (
        <Header className = 'header'>
            <Menu className = 'menu' mode = 'horizontal'>
                {
                    props.isLogged === null ? (
                        null
                    ) : (
                        <Menu.Item>
                            <Dropdown />
                        </Menu.Item>
                    )
                }
                {
                    props.isLogged === null ? (
                        <Menu.Item>
                            <Link to = '/login'><p className = 'textNavbar'> Login </p></Link>
                        </Menu.Item>
                    ) : (
                        <Menu.Item onClick = { props.logout }>
                            <Link to = '/'><p className = 'textNavbar'> Logout </p></Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        </Header>
    );
};

const mapStateToProps = state => {
    
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));