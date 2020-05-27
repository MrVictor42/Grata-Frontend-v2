import React, { Component } from 'react';
import { Button, Drawer, Descriptions, Badge } from 'antd';
import { AuditOutlined } from '@ant-design/icons';
import { StopOutlined } from '@ant-design/icons';

class Record extends Component {

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
            <span>
                <Button type = 'primary' ghost onClick = { this.showDrawer }>
                    <b><AuditOutlined /> Visualizar Ata </b>
                </Button>
                <Drawer
				    title = { `Ata da Reunião: ${ this.props.meeting.title }` }
					width = { 'auto' }
					closable = { true }
					onClose = { this.onClose }
					visible = { this.state.visible }
					footer = { 
                        <div style = {{ textAlign: 'center' }}>
                            <Button onClick = { this.onClose } style = {{ marginRight: 8 }}>
                                <StopOutlined /> Fechar
                            </Button>
                        </div>
                    }
				>
                    <Descriptions 
						bordered column = {{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
					>
						<Descriptions.Item label = { <b> Título </b> }>
							{ this.props.meeting.title }
						</Descriptions.Item>
                        <Descriptions.Item label = { <b> Líder da Reunião </b> }>
							{ this.props.meeting.meeting_leader }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Status da Reunião </b> }>
							<Badge status = 'success' text = { this.props.meeting.status } />
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Horário Programado da Reunião </b> }>
							{ this.props.meeting.initial_hour }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Horário de Inicio Real da Reunião </b> }>
							{ this.props.meeting.real_hour }
						</Descriptions.Item>
                        <Descriptions.Item label = { <b> Duração da Reunião </b> }>
                            { this.props.meeting.duration_time }
                        </Descriptions.Item>
						<Descriptions.Item label = { <b> Data Programada da Reunião </b>}>
							{ this.props.meeting.initial_date }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Data Real da Reunião </b> } span = { 2 }>
							{ this.props.meeting.real_date }
						</Descriptions.Item>
                        <Descriptions.Item label = { <b> Ementa </b> } span = { 3 }>
							{ this.props.meeting.subject_matter }
						</Descriptions.Item>
                        <Descriptions.Item label = { <b> Usuários na Reunião </b> } span = { 3 }>
							<ul>
								{
									this.props.meeting.users.map(user => 
										<li key = { user.key }> { user.title } </li> 
									)
								}
							</ul>
						</Descriptions.Item>
                        <Descriptions.Item label = { <b> Pautas da Reunião </b> } span = { 3 }>
							<ul>
								{
									this.props.meeting.agendas.map(agenda => 
										<li key = { agenda.key }> { agenda.title } </li> 
									)
								}
							</ul>
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Regras da Reunião </b> } span = { 3 }>
							<ul>
								{
									this.props.meeting.rules.map(rules => 
										<li key = { rules.key }> { rules.title } </li> 
									)
								}
							</ul>
						</Descriptions.Item>
                    </Descriptions>
                </Drawer>
            </span>
        );
    }
}

export default Record;