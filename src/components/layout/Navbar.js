import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import Dropdown from './Dropdown';
import FormLogin from '../forms/login/FormLogin';

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
                            null
                        )
                    }
                </Menu>
            </Header>
        );
    }
}

export default Navbar;