import { message } from 'antd';

export const validateFields = (username) => {
    if(username.length < 3) {
        message.warning('Os usuários não tem menos que 3 caracteres!');
        return true;
    } else {
        return false;
    }
}

export const typeUser = (is_administrator) => {
    if(is_administrator === true) {
        return 'Administrador';
    } else {
        return 'Participante';
    }
}

export const typeUserValidate = (is_administrator) => {
    if(is_administrator === 'Administrador') {
        return true;
    } else {
        return false;
    }
}

export const validateUpdate = (user, currentUser) => {
    if(user.name === '' || user.name === null || user.name === undefined) {
        user.name = currentUser.name;
    } if(user.username === '' || user.username === null || user.username === undefined){
        user.username = currentUser.username;
    } if(user.ramal === '' || user.ramal === null || user.ramal === undefined) {
        user.ramal = currentUser.ramal;
    } if(user.email === '' || user.email === null || user.email === undefined) {
        user.email = currentUser.email;
    } if(user.image === '' || user.image === null || user.image === undefined) {
        user.image = currentUser.image;
    }
    
    return user;
}