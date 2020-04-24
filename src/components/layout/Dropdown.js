import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined, UserOutlined, TeamOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';

import { getCurrentUser, getUserToken, getUserId } from '../../store/user';
import { typeUser } from '../../services/userService';

class DropdownNav extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
        }
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    }    

    render() {
        const { currentUser } = this.state;
        const type = typeUser(currentUser.is_administrator);
        return (
            <div>
                <Dropdown overlay = { 
                    <Menu>
                        <Menu.Item key = '1'> 
                            <UserOutlined /> 
                            <Link to = { '/informacoes_usuario' }> Visualizar Perfil </Link>
                        </Menu.Item>
                        <Menu.Item key = '2'> 
                            <EditOutlined />
                            <Link to = { '/edicao_usuario' }> Editar Perfil </Link>
                        </Menu.Item>
                        <Menu.Item key = '3'> 
                            <TeamOutlined />
                            <Link to = { '/lista_de_usuario' }> Lista de Usuários </Link>
                        </Menu.Item>
                        {
                            type === 'Administrador' ? (
                                <Menu.Item key = '4'> 
                                    <UserAddOutlined />
                                    <Link to = { '/registrar_usuario' }> Adicionar Usuário </Link>
                                </Menu.Item>
                            ) : null
                        }
                    </Menu> 
                }>
                    <a className = 'ant-dropdown-link'><UserOutlined/> Usuário <DownOutlined /></a>
                </Dropdown>
            </div>
        );
    }
}

export default DropdownNav;