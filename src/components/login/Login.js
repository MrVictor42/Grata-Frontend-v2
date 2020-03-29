import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.enterLoading = this.enterLoading.bind(this);
    }

    state = {
        loading: false,
        iconLoading: false,
    };

    enterLoading = () => {
        this.setState({ loading: true });
    };
    
    handleSubmit = values => {
        const username = values.username;
        const password = values.password;
        console.log(username + ' ' + password);
    }
    
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        
        return (
            <div className = 'backgroundLogin'>
                <div className = 'container'>
                    <div className = 'op1'> 
                        <p className = 'textContent'> 
                            <b>
                            Bem Vindo ao sistema de Gerenciamento de Reuniões e Atas (Grata)!
                            Realize o login ao lado para acessar as funcionalidades do sistema.
                            Caso não tenha um usuário ainda, entre em contato com algum administrador
                            do sistema ou com o desenvolvedor deste projeto.    
                            </b> 
                        </p> 
                    </div>
                    <div className = 'op2'> 
                        <h3 className = 'texth1'> <b> Login </b> </h3>
                        <Form { ...layout } name = 'basic' onFinish = { this.handleSubmit } >
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

                            <Form.Item {...tailLayout}>
                                <Button
                                    className = 'buttonSubmit'
                                    type = 'primary' 
                                    loading = { this.state.loading } 
                                    onClick = { this.enterLoading } 
                                    htmlType = 'submit'>
                                    <b> Entrar </b>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;