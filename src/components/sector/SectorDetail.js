import React, { Component } from 'react';
import { List, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

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
                status: this.state.projects[aux].status,
                slug: this.state.projects[aux].slug,
            });
        }

        data.projects.sort(sort('title'));
        return (
            <div>
                {
                    currentUser.is_administrator === 'true' ? (
                        <List
                            dataSource = { data.projects } pagination = {{ defaultPageSize: 4 }} 
                            bordered className = 'userList'
                            renderItem = { project => (
                                <List.Item
                                    key = { project.key } 
                                    actions = {[
                                        <Link to = { `/projeto/${ project.slug }` }>
                                            <Button type = 'primary'> 
                                                <EyeOutlined /> <b> Ver Reuniões </b> 
                                            </Button>
                                        </Link>,
                                    ]}
                                >
                                    <List.Item.Meta 
                                        title = { project.title } description = { project.title } 
                                    />
                                </List.Item>
                            )}
                        /> 
                    ) : (
                        <List
                            dataSource = { data.projects } pagination = {{ defaultPageSize: 4 }} 
                            bordered className = 'userList'
                            renderItem = { project => (
                                <List.Item
                                    key = { project.key } 
                                    actions = {[
                                        <Link to = { `/projeto/${ project.slug }` }>
                                            <Button type = 'primary'> 
                                                <EyeOutlined /> <b> Ver Reuniões </b> 
                                            </Button>
                                        </Link>,
                                    ]}
                                >
                                    <List.Item.Meta 
                                        title = { project.title } description = { project.title } 
                                    />
                                </List.Item>
                            )}
                        />
                    )
                }
            </div>
        );
    }
}

export default SectorDetail;