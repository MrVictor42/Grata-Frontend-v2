import React, { Component } from 'react';
import { Drawer, Button, List } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { getUserToken, getUsersInSector } from '../../store/user';
import { sort } from '../../services/sortService';

class SectorMembers extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            users: []
        }
    }
    
    async componentDidMount() {
        const token = getUserToken();
        const users = await getUsersInSector(token, this.props.sector.key);

        this.setState({ users: users });
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };
    
    onClose = () => {
        this.setState({ visible: false });
    };

    render() {
        let data = { users: [] };
        
        for(let aux = 0; aux < this.state.users.length; aux ++) {
            data.users.push({
                name: this.state.users[aux].name,
                email: this.state.users[aux].email,
                ramal: this.state.users[aux].ramal,
            });
        }

        data.users.sort(sort('name'));
        const FormSectorEdit = () => {
            return (
                <Drawer
                    title = { `Membros do Setor: ${ this.props.sector.name }` } 
                    onClose = { this.onClose } width = { 720 }
                    visible = { this.state.visible } style = {{ height: 559 }}
                    footer = { null }
                >
                    <List
                        dataSource = { data.users } pagination = {{ defaultPageSize: 4 }} 
                        bordered className = 'userMembers'
                        renderItem = { user => (
                            <List.Item key = { user.key } >
                                <List.Item.Meta
                                    title = { `Nome: ${ user.name }` } 
                                    description = {
                                        <div>
                                            <b> Email: </b> { user.email } <br/>
                                            <b> Ramal: </b> { user.ramal } <br/>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Drawer>
            );
        };
        return (
            <div>
                <Button type = 'primary' onClick = { this.showDrawer }> 
                    <EyeOutlined/> <b> Ver Membros </b> 
                </Button>
                <FormSectorEdit />
            </div>
        );
    }
}

export default SectorMembers;