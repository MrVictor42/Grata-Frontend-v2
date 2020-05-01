import React, { Component } from 'react';
import { Drawer, Divider, Col, Row, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

class UserInfo extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
		}
		
		this.showDrawer = this.showDrawer.bind(this);
		this.onClose = this.onClose.bind(this);
	}
	
	showDrawer = () => {
        this.setState({ visible: true });
	};

	onClose = () => {
        this.setState({ visible: false });
	};

    render() {
        return (
            <div>
				<Button type = 'primary' onClick = { this.showDrawer }> 
					<EyeOutlined /> <b> Ver Mais </b> 
				</Button>
				<Drawer
					width = { 640 }
					placement = 'right'
					closable = { false }
					onClose = { this.onClose }
					visible = { this.state.visible }
				>
					<p 
						className = 'site-description-item-profile-p' 
						style = {{ ...pStyle, marginBottom: 24 }}>
							<b> Perfil do Usuário: { this.props.user.name } </b>
					</p>
					<p className = 'site-description-item-profile-p' style = { pStyle }>
						<b> Perfil </b>
					</p>
					<Row>
						<Col span = { 12 }>
							<DescriptionItem title = 'Nome' content = { this.props.user.name } />
						</Col>
						<Col span = { 12 }>
							<DescriptionItem title = 'Usuario' content = { this.props.user.username } />
						</Col>
					</Row>
					<Row>
						<Col span = { 12 }>
							<DescriptionItem title = 'Ramal' content = { this.props.user.ramal } />
						</Col>
						<Col span = { 12 }>
							<DescriptionItem title = 'Permissão' content = { this.props.user.permission } />
						</Col>
					</Row>
					<Row>
						<Col span = { 24 }>
							<DescriptionItem
								title = 'Descrição' content = { this.props.user.description }
							/>
						</Col>
					</Row>
					<Divider/>
					<p className = 'site-description-item-profile-p' style = { pStyle }>
						<b> Setor </b>
					</p>
					<Row>
						<Col span = { 24 }>
							<DescriptionItem
								title = 'Nome do Setor' content = { this.props.user.sector }
							/>
						</Col>
					</Row>
					<Divider/>
					<p className = 'site-description-item-profile-p' style = { pStyle }>
						<b> Projetos Que Participa </b>
					</p>
					<Divider/>
            	</Drawer>
			</div>
        );
    }
}

const pStyle = { fontSize: 16, lineHeight: '24px', display: 'block', marginBottom: 16 };
const DescriptionItem = ({ title, content }) => (
    <div
      	className = 'site-description-item-profile-wrapper'
      	style = {{ fontSize: 14, lineHeight: '22px', marginBottom: 7 }}
    >
		<p 
			className = 'site-description-item-profile-p' 
		  	style = {{ marginRight: 8, display: 'inline-block' }}
      	>
    		{ title }:
      	</p>
      	{ content }
    </div>
);

export default UserInfo;