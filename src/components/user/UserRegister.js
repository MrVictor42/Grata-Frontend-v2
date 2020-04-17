import React, { Component } from 'react';
import { Form, Input, Button, InputNumber,message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { getUserToken, getCurrentUser, getUserId, authSignup } from '../../store/actions/user';
import { typeUserValidate } from '../../services/userService';
import { saveImage } from '../../store/actions/images';

import '../../css/forms.css';

class UserRegister extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            selectedFile: null,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    };

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isJpgOrPng) {
            message.error('Você Só Pode Carregar Arquivos JPG/PNG!');
        }

        if (!isLt2M) {
            message.error('Imagem Deve Ser Menor Que 2MB!');
        }

        return isJpgOrPng && isLt2M;
    }

    fileSelectHandler = event => {
        const file = event.target.files[0];

        if(this.beforeUpload(file)) {
            this.setState({ selectedFile: file });
        } else {
            
        }
    }

    async handleSubmit(values) {
        const token = getUserToken();
        const image = new FormData();
        const is_administrator_valid = typeUserValidate(values.type_user);
        let imageUser = null;
        let imageID = null;

        if(this.state.selectedFile === null) {

        } else {
            image.append('image', this.state.selectedFile, this.state.selectedFile.name);
            imageUser = await saveImage(token, image);
            console.log(imageUser)
            imageID = imageUser.id;
        }

        const user = {
            email: values.email,
            username: values.username,
            name: values.name,
            ramal: values.ramal,
            is_administrator: is_administrator_valid,
            is_participant: !is_administrator_valid,
            password1: values.password1,
            password2: values.password2,
            image: imageID
        };

        const status = await authSignup(user);
        if(status === true ) {
            message.success(`O Usuário ${ values.username } Foi Adicionado Com Sucesso!`)
            this.props.history.push('/informacoes_usuario');
        } else {
            message.success('Houve um Erro ao Registrar o Usuário! Entre em Contato com ' + 
                            'o Desenvolvedor!');
        }
    };

    render() {
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 16, }};
        const validateMessages = {
            required: 'O Campo ${label} é Obrigatório!',
            types: {
                email: 'Este Não é um Formato de Email Válido! Ex: grata@grata.com.',
                number: 'O ${label} É Numérico! Ex: 1912.'
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

                <div className = 'uploadImg'>
                    <span> Imagem de Perfil: </span>
                    <input type = 'file' onChange = { this.fileSelectHandler }/>
                </div>

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