import React, { Component } from 'react';
import { Button, Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

import FormProjectEdit from '../forms/project/FormProjectEdit';
import FormAddUsersProject from '../forms/project/FormAddUsersProject';
import FormRemoveUserProject from '../forms/project/FormRemoveUsersProject';
import ProjectMembers from '../project/ProjectMembers';

import { getSector } from '../../store/sector';
import { getUserToken, getUserId, getCurrentUser } from '../../store/user';
import { getProjects } from '../../store/project';
import { sort } from '../../services/sortService';

class SectorDetail extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            sector: {},
            projects: [],
            currentUser: {}
        }
    }
    
    async componentDidMount() {
        const token = getUserToken();
        const slug = this.props.match.params.slug;
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        const sector = await getSector(token, slug);
        const projects = await getProjects(token, sector.id);

        this.setState({ 
            sector: sector,
            projects: projects,
            currentUser: user 
        });
    }

    render() {
        const { currentUser } = this.state;
        let data = { projects: [] };

        for(let aux = 0; aux < this.state.projects.length; aux ++) {
            data.projects.push({
                key: this.state.projects[aux].id,
                title: this.state.projects[aux].title,
                slug: this.state.projects[aux].slug,
                status: this.state.projects[aux].status,
                tags: [ this.state.projects[aux].status ],
            });
        }

        data.projects.sort(sort('title'));
        return (
            <Table 
                dataSource = { data.projects } bordered className = 'userList'
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
                                        <Tag color = { color } key = { tag } 
                                            style = {{ marginLeft: 20, marginRight: -20 }}
                                        >
                                            <b> { tag.toUpperCase() } </b> 
                                        </Tag>
                                    );
                                })
                            }
                            </span>
                        ),
                    },
                    {
                        title: 'Opções',
                        key: 'action',
                        render: (record) => (
                            <span>
                                {
                                    currentUser.is_administrator === false ? (
                                        <Space 
                                            size = 'middle'
                                            style = {{ marginLeft: 180, marginRight: -30 }}
                                        >
                                            <ProjectMembers  project = { record } />
                                            <Button type = 'primary'> 
                                                <Link to = { `/projeto/${ record.slug }/`}>
                                                    <EyeOutlined /> <b> Ver Reuniões </b>
                                                </Link>
                                            </Button>
                                        </Space>
                                    ) : (
                                        <span>
                                            {
                                                record.status === 'Cancelada' ? (
                                                    null 
                                                ) : (
                                                    <Space 
                                                        size = 'middle' 
                                                        style = {{ marginLeft: 20, marginRight: -220 }}
                                                    >
                                                        <FormAddUsersProject 
                                                            project = { record }
                                                            sector = { this.state.sector } 
                                                        />
                                                        <FormRemoveUserProject project = { record } />
                                                        <ProjectMembers  project = { record } />
                                                        <Button type = 'primary'> 
                                                            <Link to = { `/projeto/${ record.slug }/`}>
                                                                <EyeOutlined /> <b> Ver Reuniões </b>
                                                            </Link>
                                                        </Button>
                                                        <FormProjectEdit 
                                                            project = { record } 
                                                            sector = { this.state.sector }
                                                        />
                                                    </Space>
                                                )
                                            }
                                        </span>
                                    )
                                }
                            </span>
                        ),
                    },
                ]}
            />
        )
    }
}

export default SectorDetail;