import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SiderLayout = (props) => {
    return(
        <Content style={{ padding: '0 50px', position: 'fixed' }}>
            <Layout className = 'site-layout-background' style = {{ marginLeft: '-20px' }}>
                <Sider className = 'site-layout-background' width = { 200 }>
                    <Menu
                        mode = 'inline'
                        defaultSelectedKeys = {['1']}
                        style = {{ height: '100%' }}
                    >
                        <SubMenu 
                            key = 'initial_page' 
                            title = {
                                <span><HomeOutlined /> 
                                    <b> 
                                        <Link to = { '/lista_de_projetos' }> Página Inicial </Link>
                                    </b>
                                </span>
                            }
                        >
                        </SubMenu>

                        <SubMenu 
                            key = 'profile' 
                            title = {
                                <span><UserOutlined /> <b> Perfil </b></span>
                            }
                        >
                            <Menu.Item key = 'view_profile'> 
                                <Link to = { '/informacoes_usuario' }> Visualizar Perfil </Link>
                            </Menu.Item>
                            <Menu.Item key = 'edit_profile'> 
                                <Link to = { '/edicao_usuario' }> Editar Perfil </Link>
                            </Menu.Item>
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
            </Layout>
        </Content>
    );
};

export default SiderLayout;