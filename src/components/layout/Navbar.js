import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';
import FormLogin from '../forms/FormLogin';

import { logout } from '../../store/auth';

const { Header } = Layout;

class Navbar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.visibleForm = this.visibleForm.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    visibleForm() {
        this.setState({ visible: true });
    }

    cancel() {
        this.setState({ visible: false });
    }

    render() {
        let visible = this.state.visible;
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
                                <span onClick = { this.visibleForm } className = 'textNavbar'>
                                    Login
                                </span>
                                <FormLogin 
                                    visible = { visible } onCancel = { this.cancel } 
                                    props = { this.props }
                                />
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