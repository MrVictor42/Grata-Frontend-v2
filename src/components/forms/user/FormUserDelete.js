import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';
import { withRouter } from 'react-router';
import { DeleteOutlined } from '@ant-design/icons';

import { 
    getUserToken, deleteUser, deleteUserLogout, getCurrentUser, getUserId } 
from '../../../store/user';

const { confirm } = Modal;

class FormUserDelete extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            token: null
        }

        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);

        this.setState({ 
            currentUser: user,
            token: token 
        });
    }
    

    showDeleteConfirm() {
        const { currentUser } = this.state;
        const token = this.state.token;
        const propsForms = this.props;
        let name = this.props.user.name
        let userID = this.props.user.key;

        if(currentUser.name === this.props.user.name) {
            confirm ({
                title: 'Exclusão de Conta',
                content: 'Tem Certeza Que Deseja Excluir Sua Conta, Caro(a) ' + name  + '?',
                okText: 'Sim',
                okType: 'danger',
                cancelText: 'Não',
            
                onOk() {
                    deleteUserLogout(token, userID);
                    Modal.success({
                        title: 'Ação Concluída!',
                        content: 'Conta Excluída Com Sucesso!',
                    });
                    propsForms.history.push('/')
                },
                onCancel() {
                    message.info('Exclusão de Conta Cancelada Com Sucesso!');
                },
            });
        } else {
            confirm ({
                title: 'Exclusão de Conta',
                content: 'Tem Certeza Que Deseja Excluir A Conta de ' + name  + '?',
                okText: 'Sim',
                okType: 'danger',
                cancelText: 'Não',
            
                onOk() {
                    deleteUser(token, userID);
                    Modal.success({
                        title: 'Ação Concluída!',
                        content: 'Conta Excluída Com Sucesso! Atualize a Página!',
                    });
                },
                onCancel() {
                    message.info('Exclusão de Conta Cancelada Com Sucesso!');
                },
            });
        }
    }

    render() {
        return (
            <Button type = 'primary' danger onClick = { this.showDeleteConfirm }> 
                <DeleteOutlined /> <b> Excluir Conta </b> 
            </Button>
        );
    }
}

export default withRouter(FormUserDelete);