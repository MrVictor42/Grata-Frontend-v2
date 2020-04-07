import React, { Component } from 'react';
import { Layout, Input, Button, Form, Card } from 'antd';
import { Link } from 'react-router-dom';
import DefaultUser from '../../img/default_user.png';

import { getCurrentUser, getUserToken, getUserId } from '../../store/actions/user';
import { typeUser } from '../../services/userService';

const { Content } = Layout;
const { Meta } = Card;

class UserDetail extends Component {

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
    };

    render() {
        const layout = { labelCol: { span: 3, }, wrapperCol: { span: 14, }, };
        const { currentUser } = this.state;
        const type = typeUser(currentUser.is_administrator);
        return (
            <Content className = 'painelContent'>
                <Form {...layout} name = 'nest-messages'>
                    <Form.Item label = 'Nome' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { currentUser.name } />
                    </Form.Item>

                    <Form.Item label = 'Usuário' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { currentUser.username } />
                    </Form.Item>

                    <Form.Item label = 'Setor' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { 'Não feito ainda' } />
                    </Form.Item>

                    <Form.Item label = 'Ramal' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { currentUser.ramal } />
                    </Form.Item>

                    <Form.Item label = 'Tipo de Usuário' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { type } />
                    </Form.Item>  

                    <Button type = 'primary' className = 'edit' 
                            style = {{ marginLeft: 300, marginBottom: 60 }}>
                        <Link to = { '/edicao_usuario' }> Editar Informações </Link>
                    </Button>

                    <Button type = 'primary' className = 'delete' style = {{ marginLeft: 20 }}>
                        <Link to = { '/edicao_usuario' }> Excluir Usuário </Link>
                    </Button>            
                </Form>
                <Content>
                    <Card
                        cover = { <img alt = 'avatar' src = { DefaultUser } /> }
                        hoverable 
                        className = 'imgAvatar'
                    >
                        <Meta title = 'Foto do Usuário' description = 'Essa é Sua Foto de Usuário' />
                    </Card>
                </Content>                
            </Content>
        );
    }
}

export default UserDetail;