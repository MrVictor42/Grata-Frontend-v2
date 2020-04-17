import React, { Component } from 'react';
import { Card } from 'antd';

import DefaultUser from '../../img/default_user.png';

import { getCurrentUser, getUserToken, getUserId } from '../../store/actions/user';
import { getImage } from '../../store/actions/images';

const { Meta } = Card;

class UserPhoto extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            image: null
        }
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
        let imageUser = null;

        if(user.image !== null) {
            imageUser = await getImage(token, user.image);
            this.setState({ image: imageUser.image });
        } else {

        }
    }

    render() {
        let image = null;
        if(this.state.image !== null) {
            image = this.state.image;
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