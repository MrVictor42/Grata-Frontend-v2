import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';

import Alert from '../alert/Alert';

import { validateFields } from '../../services/userService';
import { getUserToken } from '../../store/user';
import { authLogin } from '../../store/auth';

class FormLogin extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.visibleForm = this.visibleForm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    visibleForm() {
        this.setState({ 
            visible: true 
        });
    }

    cancel() {
        this.setState({ 
            visible: false 
        });
    }

    handleSubmit(values) {
        const username = values.username;
        const password = values.password;
        let status = getUserToken();

        if(validateFields(username) === true) {

        } else {
            this.props.onAuth(username, password);

            if(status === null) {

            } else {
                this.props.history.push('/lista_de_projetos');
            }
        }
    }

    render() {
        let visible = this.props.visible;
        let cancel = this.props.onCancel;
        const CollectionCreateForm = () => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible = { visible } title = 'Realize o Login' okText = 'Entrar'
                    cancelText = 'Cancelar' onCancel = { cancel }
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
            <CollectionCreateForm/>
        );
    }
}

export default FormLogin;