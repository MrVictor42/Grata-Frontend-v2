import React, { Component } from 'react';
import { Form, Input, Button, InputNumber ,message } from 'antd';

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
    

    handleSubmit = values => {
        console.log(values);
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
                    name = { 'sector' } label = 'Setor' 
                    rules = {[{ required: false }]} 
                >
                    <Input style = {{ width: 500, marginBottom: 10 }}/>
                </Form.Item>

                <Form.Item  
                    name = { 'ramal' } label = 'Ramal' 
                    rules = {[{ type: 'number', required: false }]} 
                >
                    <InputNumber style = {{ width: 80, marginBottom: 10 }}/>
                </Form.Item>

                {/* <div className = 'upload'>
                    <input type = 'file' onChange = { this.fileSelectHandler }/>
                </div> */}

                <Form.Item wrapperCol = {{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type = 'primary' htmlType = 'submit'> Salvar Usuário </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default UserRegister;