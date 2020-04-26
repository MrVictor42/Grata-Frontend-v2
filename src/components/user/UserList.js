import React, { Component } from 'react';
import { List, Avatar } from 'antd';

import UserInfo from './UserInfo';
import DefaultUser from '../../img/default_user.png';
import Alert from '../alert/Alert';

import { getUsers, getUserToken } from '../../store/user';
import { getImage } from '../../store/images';
import { typeUser, sortUsers } from '../../services/userService';

class UserList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
            visible: false
		}
    }

    async componentDidMount() {
        const token = getUserToken();
        const alert = this.props.location.state;
        let users = await getUsers(token);
        let imageUser = null;
        let final_users = { users: [] };

        if(alert !== undefined) {
            this.setState({ alert: alert });
        }

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
                image: users[aux].image,
                username: users[aux].username,
                description: users[aux].description,
                setor: 'Não Feito',
                is_administrator: users[aux].is_administrator
            });
        }
        
        this.setState({ users: final_users.users });
	}
	
    render() {
        let data = { users: [] };
        let typePermission = null;
        let message = null;
        let typeAlert = null;

        if(this.state.alert === true) {
            message = 'O Usuário Foi Cadastrado Com Sucesso!';
            typeAlert = 'success';
        } else if(this.state.alert === false){
            message = 'Algo de Ruim Aconteceu! Tente Novamente.';
            typeAlert = 'error';
        }

        for(let aux = 0; aux < this.state.users.length; aux ++) {
            typePermission = typeUser(this.state.users[aux].is_administrator);
            data.users.push({
                key: this.state.users[aux].id,
                name: this.state.users[aux].name,
                email: this.state.users[aux].email,
                ramal: this.state.users[aux].ramal,
                image: this.state.users[aux].image,
                description: this.state.users[aux].description,
                sector: this.state.users[aux].sector,
                username: this.state.users[aux].username,
                permission: typePermission
            });
        }

        data.users.sort(sortUsers('name'));
        return (
            <div>
                {
                    message !== null ? (
                        <Alert message = { message } type = { typeAlert } />
                    ) : (
                        null
                    )
                }
                <List
                    dataSource = { data.users } pagination = {{ defaultPageSize: 4 }} 
                    bordered className = 'userList'
                    renderItem = { user => (
                        <List.Item
                            key = { user.key } actions = {[ <UserInfo user = { user } /> ]}
                        >
                        <List.Item.Meta
                            avatar = { <Avatar src = { user.image } /> }
                            title = { user.name} description = { user.description }
                        />
                        </List.Item>
                    )}
                />
          	</div>
        );
	}    
}
export default UserList;