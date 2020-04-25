import React, { Component } from 'react';
import { Modal, Card } from 'antd';

class UserInfo extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    
    showModal() {
        this.setState({ visible: true });
    };

    handleOk() {
        this.setState({ visible: false });
    };

    handleCancel() {
        this.setState({ visible: false });
    };

    render() {
        return (
            <div>
                <a onClick = { this.showModal }> <b> Ver Mais </b></a>
                <Modal
                    title = {`Informações do: ${ this.props.user.Nome }`}
                    visible = { this.state.visible }
                    onOk = { this.handleOk }
                    onCancel = { this.handleCancel }
                >
                    <p><b> Nome: </b> { this.props.user.Nome } </p>
                    <p><b> Email: </b> { this.props.user.Email } </p>
                    <p><b> Setor: </b> { this.props.user.Setor } </p>
                    <p><b> Ramal: </b> { this.props.user.Ramal } </p>
                    <p><b> Permissão: </b> { this.props.user.Permissao } </p>
                    <Card 
                        cover = { <img alt = 'avatar' src = { this.props.user.image } /> } 
                        hoverable className = 'imgUserInfo'>
                    </Card>
                </Modal>
            </div>
        );
    }
}

export default UserInfo;