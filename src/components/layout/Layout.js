import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';

import '../../css/layout.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends Component {
  
	render() {
		return (
			<Layout>
				<Header className = 'header'>
					<Menu className = 'menu' mode = 'horizontal'>
						<Menu.Item key = '1' className = 'menu_text'> Login </Menu.Item>
					</Menu>
				</Header>
				
				<Content className = 'content'>
					<Layout className = 'site-layout-background' style = {{ padding: '24px 0' }}>
						{/* <Sider className = 'site-layout-background' width = { 200 }>
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
									 Talvez colocar comentários sobre o setor, e isso sendo pra qualquer
									pessoa, sejado setor ou nao 
								</SubMenu>
							</Menu>
						</Sider> */}
						<Content style = {{ padding: '0 24px', minHeight: 280 }}> 
							{ this.props.children } 
						</Content>
					</Layout>
				</Content>
				<Footer className = 'footer'>
					<b> Grata - Gerenciamento de Reuniões e Atas ©2020 
					Criado por Victor Hugo Lopes Mota. </b>
				</Footer>
			</Layout>
		);
	}
}

export default CustomLayout;