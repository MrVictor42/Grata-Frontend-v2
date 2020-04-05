import { message } from 'antd';

export const validateFields = (username) => {
    if(username.length < 3) {
        message.warning('Os usuários não tem menos que 3 caracteres!');
        return true;
    } else {
        return false;
    }
};

export const typeUser = (is_administrator) => {
    if(is_administrator === true) {
        return 'Administrador';
    } else {
        return 'Participante da Reunião'
    }
};