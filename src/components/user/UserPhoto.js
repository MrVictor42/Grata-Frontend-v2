import React, { Component } from 'react';
import { Card } from 'antd';

import DefaultUser from '../../img/default_user.png';

import { getCurrentUser, getUserToken, getUserId } from '../../store/actions/user';


const { Meta } = Card;

class UserPhoto extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
        }
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    }

    render() {
        const { currentUser } = this.state;
        let image = '';
        if(currentUser.image !== null) {
            image = currentUser.image;
        } else {
            image = DefaultUser
        }
        return(
            <Card 
                cover = { <img alt = 'avatar' src = { image } /> } 
                hoverable className = 'imgAvatar'>
                <Meta title = 'Foto do Usuário' description = 'Essa é Sua Foto de Usuário' />
            </Card>
        );
    }
}

export default UserPhoto;