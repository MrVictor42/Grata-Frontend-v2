import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

class Navbar extends React.Component {

    render () {
        return (
            <Header className = 'header'>
                <Menu className = 'menu' mode = 'horizontal'>
                    <Menu.Item className = 'text_logout' onClick = { this.props.logout }>
                        Logout
                    </Menu.Item>
                    ) : (
                    <Menu.Item>
                        <Link to = '/login' > <p className = 'text'> Login </p></Link>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default Navbar;