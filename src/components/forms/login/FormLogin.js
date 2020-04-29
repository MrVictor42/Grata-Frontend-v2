import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { validateFields } from '../../../services/userService';
import { authLogin } from '../../../store/auth';

class FormLogin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.visibleForm = this.visibleForm.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    visibleForm() {
        this.setState({ visible: true });
    }

    cancel() {
        this.setState({ visible: false });
    }

    handleSubmit(values) {
        const username = values.username;
        const password = values.password;

        if(validateFields(username) === true) {

        } else {
            this.props.onAuth(username, password);
            this.props.history.push('/lista_de_projetos');
        }
    }

    render() {
        const CollectionCreateForm = () => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible = { this.state.visible } title = 'Realize o Login' okText = 'Entrar'
                    cancelText = 'Cancelar' onCancel = { this.cancel }
                    onOk = {() => {
                        form.validateFields().then(values => {
                            form.resetFields();
                            this.handleSubmit(values);
                        }).catch(info => {
                            console.log('Validate Failed:', info);
                        });
                    }}
                >
                    <Form form = { form } layout = 'vertical'>
                        <Form.Item 
                            label = 'Usuário' name = 'username' className = 'inputFormLogin'
                            rules = {[{ required: true, message: 'Por Favor, Insira o Seu Usuário!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label = 'Senha' name = 'password' className = 'inputFormLogin'
                            rules = {[{ required: true, message: 'Por Favor, Insira a Sua Senha!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form>
              </Modal>
            );
        };
        return(
            <div>
                <a className = 'textNavbar' onClick = { this.visibleForm }> Login </a>
                <CollectionCreateForm />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { };
};

const mapDispatchToProps = dispatch => {
    return { 
        onAuth: (username, password) => dispatch(authLogin(username, password)) 
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormLogin));