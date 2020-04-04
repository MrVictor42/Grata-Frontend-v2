import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';

import ProjectList from '../projects/ProjectList';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderLayout = () => {
    return (
        <Layout className = 'layoutSider'>
            <Sider className = 'site-layout-background' width = { 200 }>
                <Menu 
                    mode = 'inline'
                    defaultSelectedKeys = {['1']}
                    style = {{ height: '100%', position: 'absolute' }}
                >
                    <SubMenu 
                        key = 'profile' 
                        title = {
                            <span><UserOutlined /> <b> Perfil </b></span>
                        }
                    >
                        <Menu.Item key = 'view_profile'> Visualizar Perfil </Menu.Item>
                        <Menu.Item key = 'edit_profile'> Editar Perfil </Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key = 'sector' 
                        title = {
                            <span><EnvironmentOutlined /> <b> Setor </b></span>
                        }
                    >
                        <Menu.Item key = 'information_sector'> Informações </Menu.Item>
                            {/* Talvez colocar comentários sobre o setor, e isso sendo pra qualquer
                        pessoa, sejado setor ou nao  */}
                    </SubMenu>
                </Menu>
            </Sider>
            <ProjectList />
        </Layout>
    );
}

export default SiderLayout;