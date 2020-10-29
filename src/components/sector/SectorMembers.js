import React, { Component } from 'react';
import { Drawer, Button, List, Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import DefaultUser from '../../img/default_user.jpg';

import { getUserToken, getUsersInSector } from '../../store/user';
import { getImage } from '../../store/images';
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
        let imageUser = null;
        let final_users = { users: [] };

        for(let aux = 0; aux < users.length; aux ++) {
            if(users[aux].image === null) {
                users[aux].image = DefaultUser;
            } else {
                imageUser = await getImage(token, users[aux].image);
                users[aux].image = imageUser.image;                
            }
            final_users.users.push({
                id: users[aux].id,
                name: users[aux].name,
                email: users[aux].email,
                ramal: users[aux].ramal,
                image: users[aux].image
            });
        }
        
        this.setState({ users: final_users.users });
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
                key: this.state.users[aux].id,
                name: this.state.users[aux].name,
                email: this.state.users[aux].email,
                ramal: this.state.users[aux].ramal,
                image: this.state.users[aux].image
            });
        }

        data.users.sort(sort('name'));
        const FormSectorMembers = () => {
            return (
                <Drawer
                    title = { `Membros do Setor: ${ this.props.sector.name }` } 
                    onClose = { this.onClose } width = { 720 }
                    visible = { this.state.visible } 
                    footer = { null }
                >
                    <List
                        dataSource = { data.users } pagination = {{ defaultPageSize: 4 }} 
                        bordered className = 'userMembers'
                        renderItem = { user => (
                            <List.Item key = { user.key } >
                                <List.Item.Meta
                                    avatar = { <Avatar src = { user.image } /> }
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
                <FormSectorMembers />
            </div>
        );
    }
}

export default SectorMembers;