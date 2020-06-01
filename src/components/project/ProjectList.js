import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';

import MeetingMembers from '../meeting/MeetingMembers';
import FormAddMembersMeeting from '../forms/meeting/FormAddMembersMeeting';
import FormRemoveMembersMeeting from '../forms/meeting/FormRemoveMembersMeeting';
import FormEditMeeting from '../forms/meeting/FormEditMeeting';
import StartMeeting from '../meeting/MeetingDetail';
import Items from '../forms/meeting/items/Items';
import Record from '../meeting/record/Record';
import Comment from '../meeting/comments/Comment';
import FormCreateQuiz from '../forms/meeting/quiz/FormCreateQuiz';
import RespondQuiz from '../meeting/quiz/RespondQuiz';
import ResultQuiz from '../meeting/quiz/ResultQuiz';

import { getUserId, getUserToken, getCurrentUser, getUsers } from '../../store/user';
import { getMeetings } from '../../store/meeting';
import { sort } from '../../services/sortService';

class ProjectList extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			currentUser: {},
            meetings: [],
            users: [],
            token: null
		}
	}

	async componentDidMount() {
        const token = getUserToken();
        const slug = this.props.match.params.slug;
        const userId = getUserId();
		const user = await getCurrentUser(token, userId);
        const meetings = await getMeetings(token, slug);
        const users = await getUsers(token);

        this.setState({ 
			currentUser: user,
            meetings: meetings,
            users: users,
            token: token 
		});
	}
	
  	render() {
        const { currentUser } = this.state;
        const token = this.state.token;
        let data_meeting = { meeting: [] };
        let meeting_leader = null;
        let userID = null;
        let slug = this.props.match.params.slug;
        let rules_meeting = { rules: [] };
        let agendas_meeting = { agendas: [] };
        let users_meeting = { users: [] };

		for(let aux = 0; aux < this.state.meetings.length; aux ++) {
            for(let auxUsers = 0; auxUsers < this.state.users.length; auxUsers ++) {
                if(this.state.meetings[aux].meeting_leader === this.state.users[auxUsers].id) {
                    meeting_leader = this.state.users[auxUsers].name;
                    userID = this.state.users[auxUsers].id;
                }
            }

            for(let auxRules = 0; auxRules < this.state.meetings[aux].rules.length; auxRules ++) {
                rules_meeting.rules.push({
                    key: this.state.meetings[aux].rules[auxRules].id,
                    title: this.state.meetings[aux].rules[auxRules]
                })
            }

            for(let auxAgendas = 0; auxAgendas < this.state.meetings[aux].agendas.length; auxAgendas ++) {
                agendas_meeting.agendas.push({
                    key: this.state.meetings[aux].id, 
                    title: this.state.meetings[aux].agendas[auxAgendas] 
                });
            }

            for(let auxUsers = 0; auxUsers < this.state.meetings[aux].users.length; auxUsers ++) {
                users_meeting.users.push({
                    key: this.state.meetings[aux].id,
                    title: this.state.meetings[aux].users[auxUsers]
                });
            } 

            data_meeting.meeting.push({
                key: this.state.meetings[aux].id,
                meetingID: this.state.meetings[aux].id,
                title: this.state.meetings[aux].title,
                slug: this.state.meetings[aux].slug,
                project: this.state.meetings[aux].project,
                subject_matter: this.state.meetings[aux].subject_matter,
                meeting_leader: meeting_leader,
                userID: userID,
                initial_date: this.state.meetings[aux].initial_date,
                initial_hour: this.state.meetings[aux].initial_hour,
                real_hour: this.state.meetings[aux].real_hour,
                real_date: this.state.meetings[aux].real_date,
                duration_time: this.state.meetings[aux].duration_time,
                status: this.state.meetings[aux].status,
                tags: [ this.state.meetings[aux].status ],
                rules: rules_meeting.rules,
                agendas: agendas_meeting.agendas,
                users: users_meeting.users
            });

            rules_meeting.rules = [];
            agendas_meeting.agendas = [];
            users_meeting.users = [];
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
                                        color = 'red';
                                    } else if(tag === 'Agendada') {
                                        color = 'blue';
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
                        title: 'Data da Reunião',
                        dataIndex: 'initial_date',
                        key: 'initial_date',
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
                                                    <span>
                                                        {
                                                            record.status === 'Agendada' ? (
                                                                <Space size = 'middle'>
                                                                    <StartMeeting 
                                                                        meeting = { record }
                                                                        token = { token }
                                                                        slug = { slug }
                                                                    />
                                                                </Space>
                                                            ) : (
                                                                <span>
                                                                    {
                                                                        record.status === 'Pendente' ? (
                                                                            <Space size = 'middle'>
                                                                                <FormAddMembersMeeting 
                                                                                    meeting = { record } 
                                                                                />
                                                                                <FormRemoveMembersMeeting 
                                                                                    meeting = { record } 
                                                                                />
                                                                                <MeetingMembers 
                                                                                    meeting = { record } 
                                                                                />
                                                                                <Items 
                                                                                    meeting = { record }
                                                                                />
                                                                                <FormEditMeeting 
                                                                                    meeting = { record } 
                                                                                    slug = { slug }
                                                                                />
                                                                            </Space>
                                                                        ) : (
                                                                            <Space size = 'middle'>
                                                                                <Record 
                                                                                    meeting = { record } 
                                                                                />
                                                                                <Comment
                                                                                    meeting = { record }
                                                                                />
                                                                                <FormCreateQuiz 
                                                                                    meeting = { record }
                                                                                />
                                                                                <RespondQuiz 
                                                                                    meeting = { record }
                                                                                />
                                                                                <ResultQuiz 
                                                                                    meeting = { record }
                                                                                />
                                                                            </Space>
                                                                        )
                                                                    }
                                                                </span>
                                                            )
                                                        }
                                                    </span>
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