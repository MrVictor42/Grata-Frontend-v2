import React from 'react';
import { Card } from 'antd';

import DefaultUser from '../../img/default_user.png';

const { Meta } = Card;

const UserPhoto = (props) => {
    let image = null;

    if(props.image === null) {
        image = DefaultUser;
    } else {
        image = props.image;
    }
    
    return(
        <Card 
            cover = { <img alt = 'avatar' src = { image } /> } 
            hoverable className = 'imgAvatar'>
            <Meta title = 'Foto do Usuário' description = { `Foto de Perfil de ${ props.user.name }` } />
        </Card>
    );
};

export default UserPhoto;