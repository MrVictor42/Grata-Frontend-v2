import React, { Component } from 'react';
import { Layout, Input, Button, Form, Modal, message } from 'antd';
import { Link } from 'react-router-dom';

import UserPhoto from './UserPhoto';
import Alert from '../alert/Alert';

import { getCurrentUser, getUserToken, getUserId, deleteUser } from '../../store/user';
import { typeUser } from '../../services/userService';

const { Content } = Layout;
const { confirm } = Modal;

class UserDetail extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            alert: null
        }

        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        const alert = this.props.location.state;

        if(alert !== undefined) {
            this.setState({ 
                currentUser: user,
                alert: alert 
            });
        } else {
            this.setState({ currentUser: user });
        }        
    }

    async showDeleteConfirm(props) {
        const { currentUser } = this.state;
        const name = currentUser.name;
        const userId = currentUser.id;
        const token = getUserToken();

        confirm ({
			title: 'Exclusão de Conta',
			content: 'Tem Certeza Que Deseja Excluir Sua Conta, Caro(a) ' + name  + '?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {
                deleteUser(token, userId);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Conta Excluída Com Sucesso!',
				});
				props.history.push('/')
			},
			onCancel() {
				message.success('Exclusão de Conta Cancelada Com Sucesso!');
			},
		});
    }

    render() {
        const layout = { labelCol: { span: 3, }, wrapperCol: { span: 14, }, };
        const { currentUser } = this.state;
        const type = typeUser(currentUser.is_administrator);
        const props = this.props;
        let message = null;
        let typeAlert = null;
        if(this.state.alert === true) {
            message = 'Informações Alteradas Com Sucesso!';
            typeAlert = 'success';
        } else if(this.state.alert === false){
            message = 'Algo de Ruim Aconteceu! Tente Novamente.';
            typeAlert = 'error';
        }
        return (
            <div>
                {
                    message !== null ? (
                        <Alert message = { message } type = { typeAlert } />
                    ) : (
                        null
                    )
                }
                <Content className = 'painelContent'>
                    <Form {...layout} name = 'nest-messages'>
                        <Form.Item label = 'Nome' className = 'inputsUserDetail'>
                            <Input disabled = { true } value = { currentUser.name }/>
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
                                style = {{ marginLeft: 420, marginBottom: 60 }}>
                            <Link to = { '/edicao_usuario' }> Editar Informações </Link>
                        </Button>

                        <Button type = 'primary' className = 'delete' style = {{ marginLeft: 20 }} 
                                onClick = { () => this.showDeleteConfirm(props) }>
                            Excluir Usuário
                        </Button>            
                    </Form>
                </Content>
                <Content style = {{ marginTop: -470, marginLeft: 230 }}>
                    <UserPhoto />
                </Content>
            </div>
        );
    }
}

export default UserDetail;