import React, { Component } from 'react';
import { Button, Drawer, Descriptions, Badge } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import Timer from './timer/Timer';

class MeetingDetail extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			visible: false,
			atualHour: null,
			atualDate: null,
		}

		this.showDrawer = this.showDrawer.bind(this);
		this.onClose = this.onClose.bind(this);
		this.checkTime = this.checkTime.bind(this);
	}

	checkTime(i) {
		if (i < 10) {
			i = '0' + i;
		}
		return i;
	}

	showDrawer = () => {
		let today = new Date();
		let hour  = today.getHours();
		let minutes = today.getMinutes();
		let seconds = today.getSeconds();
		let day = today.getDate();
		let month = today.getMonth();
		let year = today.getUTCFullYear();

		minutes = this.checkTime(minutes);
		seconds = this.checkTime(seconds);

		this.setState({ 
			visible: true,
			atualHour: hour + ':' + minutes + ':' + seconds,
			atualDate: day + '/' + month + '/' + year
		});
    };
    
    onClose = () => {
        this.setState({ visible: false });
    };
	
	render() {
		console.log(this.props.meeting.rules)
		return (
			<span>
				<Button className = 'save' onClick = { this.showDrawer }>
                    <CaretRightOutlined/> <b> Começar Reunião </b>
                </Button>
                <Drawer
                    title = { `Reunião: ${ this.props.meeting.title } ` } closable = { false }
					onClose = { this.onClose } visible = { this.state.visible } width = { '100%' }
                >
					<Timer /> <br />
					<Descriptions 
						title = { `Informações da Reunião: ${ this.props.meeting.title }` }
						bordered column = {{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
					>
						<Descriptions.Item label = { <b> Título </b> }>
							{ this.props.meeting.title }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Líder da Reunião </b> }>
							{ this.props.meeting.meeting_leader }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Status da Reunião </b> }>
							<Badge status = 'processing' text = { this.props.meeting.status } />
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Horário Programado da Reunião </b> }>
							{ this.props.meeting.initial_hour }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Horário de Inicio Real da Reunião </b> }>
							{ this.state.atualHour }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Data Programada da Reunião </b>}>
							{ this.props.meeting.initial_date }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Data Real da Reunião </b> }>
							{ this.state.atualDate }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Ementa </b> }>
							{ this.props.meeting.subject_matter }
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Usuários na Reunião </b> }>
							<ul>
								{
									this.props.meeting.users.map(user => 
										<li key = { user.key }> { user.title } </li> 
									)
								}
							</ul>
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Pautas da Reunião </b> }>
							<ul>
								{
									this.props.meeting.agendas.map(agenda => 
										<li key = { agenda.key }> { agenda.title } </li> 
									)
								}
							</ul>
						</Descriptions.Item>
						<Descriptions.Item label = { <b> Regras da Reunião </b> }>
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

export default MeetingDetail;