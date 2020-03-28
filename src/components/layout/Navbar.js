import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const NAVBAR = () => {
    return (
        <Header className = 'header'>
            <Menu className = 'menu' mode = 'horizontal'>
                <Menu.Item>
                    <Link to = '/login' > <p className = 'textNavbar'> Login </p></Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default NAVBAR;