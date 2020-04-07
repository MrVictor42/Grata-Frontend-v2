import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Input, Button, Form, Card } from 'antd';
import { Link } from 'react-router-dom';
import DefaultUser from '../../img/default_user.png';

import { getUser } from '../../store/actions/user';
import { typeUser } from '../../services/userService';

const { Content } = Layout;
const { Meta } = Card;

class UserDetail extends Component {

    componentDidMount() {
        const token = this.props.token;

        if (token !== undefined && token !== null) {
            this.props.getUser(token, this.props.currentUser.userId);
		}
    }

    render() {
        const layout = { labelCol: { span: 3, }, wrapperCol: { span: 14, }, };
        const { currentUser } = this.props;
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

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentUser: state.auth.currentUser,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
	return {
		getUser: (token, userId) => dispatch(getUser(token, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);