import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider, Content } = Layout;
const SiderLayout = () => {
    return (
        <Content className = 'content'>
            <Layout className = 'site-layout-background' style = {{ padding: '10px 0', backgroundColor: 'white' }}>
                <Sider className = 'site-layout-background' width = { 200 }>
                    <Menu 
                        mode = 'inline'
                        defaultSelectedKeys = {['1']}
                        style = {{ height: '100%' }}
                    >
                        <SubMenu 
                            key = 'profile' 
                            title = {
                                <span>
                                    <UserOutlined /> <b> Perfil </b>
                                </span>
                            }
                        >
                            <Menu.Item key = 'view_profile'> Visualizar Perfil </Menu.Item>
                            <Menu.Item key = 'edit_profile'> Editar Perfil </Menu.Item>
                        </SubMenu>
                        <SubMenu 
                            key = 'sector' 
                            title = {
                                <span>
                                    <EnvironmentOutlined /> <b> Setor </b>
                                </span>
                            }
                        >
                            <Menu.Item key = 'information_sector'> Informações </Menu.Item>
                                {/* Talvez colocar comentários sobre o setor, e isso sendo pra qualquer
                            pessoa, sejado setor ou nao  */}
                        </SubMenu>
                    </Menu>
                </Sider>
            </Layout>
        </Content>
    );
}

export default SiderLayout;