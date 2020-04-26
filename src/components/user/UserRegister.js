import React, { Component } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { getUserToken, getCurrentUser, getUserId, authSignup } from '../../store/user';
import { typeUserValidate } from '../../services/userService';

import '../../css/forms.css';

const { TextArea } = Input;

class UserRegister extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            selectedFile: null,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    };

    async handleSubmit(values) {
        const is_administrator_valid = typeUserValidate(values.type_user);
        const user = {
            email: values.email,
            username: values.username,
            name: values.name,
            ramal: values.ramal,
            is_administrator: is_administrator_valid,
            is_participant: !is_administrator_valid,
            password1: values.password1,
            password2: values.password2,
            description: values.description
        };
        const status = await authSignup(user);

        if(status !== false ) {
            this.props.history.push({ pathname: '/lista_de_usuarios', state: true });
        } else {
            this.props.history.push({ pathname: '/lista_de_usuarios', state: false });
        }
    };

    render() {
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 16, }};
        const validateMessages = {
            required: 'O Campo ${label} é Obrigatório!',
            types: {
                email: 'Este Não é um Formato de Email Válido! Ex: grata@grata.com.',
                number: 'O ${label} É Numérico! Ex: 1912.',
            },
        };
        return(
            <Form 
                {...layout} name = 'nest-messages' className = 'formUser'
                onFinish = { this.handleSubmit } validateMessages = { validateMessages }
            >
                <h1 className = 'h1form'> Criação de Usuário </h1>
                <Form.Item  
                    name = { 'name' } label = 'Nome' 
                    rules = {[{ required: true }]} 
                >
                    <Input style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item  
                    name = { 'username' } label = 'Usuário' 
                    rules = {[{ required: true }]} 
                >
                    <Input style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item 
                    name = { 'email' } label = 'Email'
                    rules = {[{ type: 'email', required: true }]} 
                >
                    <Input style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item
                    name = { 'password1' } label = 'Senha'
                    rules = {[{ required: true, message: 'Por Favor, Coloque Uma Senha!'}]}
                >
                    <Input.Password style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item 
                    name = { 'password2' } label = 'Repita a Senha'
                    dependencies = {['password1']}
                    rules = {[{ 
                        required: true,
                        message: 'Por Favor, Confirme Sua Senha!',
                    },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password1') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('As Senhas Não Batem, Repita as Senhas!');
                            },
                        }),
                    ]}
                >
                    <Input.Password style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item  
                    name = { 'type_user' } label = 'Tipo de Usuário' 
                    rules = {[{ required: true }]} 
                >
                    <Input style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item  
                    name = { 'sector' } label = 'Setor' 
                    rules = {[{ required: false }]} 
                >
                    <Input style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item  
                    name = { 'ramal' } label = 'Ramal' 
                    rules = {[{ type: 'number', required: true }]} 
                >
                    <InputNumber style = {{ width: 80, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item  
                    name = { 'description' } label = 'Descrição (opcional)' 
                    rules = {[{ required: false }]} 
                >
                    <TextArea rows = { 4 } style = {{ width: 500 }} maxLength = { 500 }/>
                </Form.Item>

                <Form.Item wrapperCol = {{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type = 'primary' htmlType = 'submit' className = 'saveButton'> 
                        <SaveOutlined/> Salvar Usuário 
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default UserRegister;