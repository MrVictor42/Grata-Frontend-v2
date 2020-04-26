import React from 'react';
import { Card } from 'antd';

import DefaultUser from '../../img/default_user.png';

const { Meta } = Card;

const UserPhoto = (props) => {
    let image = null;

    if(props.user.image === null) {
        image = DefaultUser;
    } else {
        image = props.user.image;
    }
    
    return(
        <Card 
            cover = { <img alt = 'avatar' src = { image } /> } 
            hoverable className = 'imgAvatar'>
            <Meta title = 'Foto do Usuário' description = 'Essa é Sua Foto de Usuário' />
        </Card>
    );
};

export default UserPhoto;