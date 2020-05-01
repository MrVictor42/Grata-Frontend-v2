import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';
import { withRouter } from 'react-router';

import { 
    getUserToken, deleteUser, deleteUserLogout, getCurrentUser, getUserId } 
from '../../../store/user';

const { confirm } = Modal;

class FormUserDelete extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {}
        }

        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);

        this.setState({ currentUser: user });
    }
    

    showDeleteConfirm() {
        const { currentUser } = this.state;
        const name = currentUser.name;
        const userId = currentUser.id;
        const token = getUserToken();
        const propsForms = this.props;

        if(currentUser.name === this.props.user.name) {
            confirm ({
                title: 'Exclusão de Conta',
                content: 'Tem Certeza Que Deseja Excluir Sua Conta, Caro(a) ' + name  + '?',
                okText: 'Sim',
                okType: 'danger',
                cancelText: 'Não',
            
                onOk() {
                    deleteUserLogout(token, userId);
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
                    deleteUser(token, userId);
                    Modal.success({
                        title: 'Ação Concluída!',
                        content: 'Conta Excluída Com Sucesso!',
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
                <b> Excluir Conta </b> 
            </Button>
        );
    }
}

export default withRouter(FormUserDelete);