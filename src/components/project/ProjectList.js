import React, { Component } from 'react';
import { Button, Table, Tag, Space } from 'antd';

import MeetingMembers from '../meeting/MeetingMembers';
import FormAddMembersMeeting from '../forms/meeting/FormAddMembersMeeting';
import FormRemoveMembersMeeting from '../forms/meeting/FormRemoveMembersMeeting';
import FormEditMeeting from '../forms/meeting/FormEditMeeting';
import StartMeeting from '../meeting/MeetingDetail';
import Items from '../forms/meeting/items/Items';

import { getUserId, getUserToken, getCurrentUser } from '../../store/user';
import { getMeetings } from '../../store/meeting';
import { sort } from '../../services/sortService';

export class ProjectList extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			currentUser: {},
			meetings: []
		}
	}

	async componentDidMount() {
        const token = getUserToken();
        const slug = this.props.match.params.slug;
        const userId = getUserId();
		const user = await getCurrentUser(token, userId);
		const meetings = await getMeetings(token, slug);

        this.setState({ 
			currentUser: user,
			meetings: meetings 
		});
	}
	
  	render() {
        const { currentUser } = this.state;
		let data_meeting = { meeting: [] };

		for(let aux = 0; aux < this.state.meetings.length; aux ++) {
			data_meeting.meeting.push({
                key: this.state.meetings[aux].id,
                title: this.state.meetings[aux].title,
                slug: this.state.meetings[aux].slug,
                status: this.state.meetings[aux].status,
                tags: [ this.state.meetings[aux].status ],
            });
		}

        data_meeting.meeting.sort(sort('title'));
		return (
            <Table 
                dataSource = { data_meeting.meeting } bordered className = 'userList'
                pagination = {{ defaultPageSize: 4 }} 
                columns = {
                    [{
                        title: 'Título da Reunião',
                        dataIndex: 'title',
                        key: 'title',
                    },
                    {
                        title: 'Status',
                        key: 'tags',
                        dataIndex: 'tags',
                        render: tags => (
                            <span>
                                {
                                tags.map(tag => {
                                    let color = null;

                                    if (tag === 'Pendente') {
                                        color = 'orange';
                                    } else if(tag === 'Cancelada') {
                                        color = 'red'
                                    } 
                                    else {
                                        color = 'green';
                                    }

                                    return (
                                        <Tag color = { color } key = { tag } >
                                            <b> { tag.toUpperCase() } </b> 
                                        </Tag>
                                    );
                                })
                            }
                            </span>
                        ),
                    },{
						title: 'Opções',
						key: 'action',
						render: (record) => (
                            <span>
                                {
                                    currentUser.is_administrator === false ? (
                                        null
                                    ) : (
                                        <span>
                                            {
                                                record.status === 'Cancelada' ? (
                                                    null 
                                                ) : (
                                                    <Space size = 'middle'>
                                                        <FormAddMembersMeeting meeting = { record } />
                                                        <FormRemoveMembersMeeting meeting = { record } />
                                                        <MeetingMembers meeting = { record } />
                                                        <Items meeting = { record }/>
                                                        <StartMeeting meeting = { record } />
                                                        <FormEditMeeting meeting = { record } />
                                                    </Space>
                                                )
                                            }
                                        </span>
                                    )
                                }
                            </span>
                        )
                    }   
                ]}
            />
        );
	}
}

export default ProjectList;
