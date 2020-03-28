import React, { Component } from 'react';
import { Form, Input, Button, Layout } from 'antd';

const { Content } = Layout;

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
            <Content className = 'contentLogin'>
                <h1 className = 'texth1'> <b> Login </b> </h1>
                <Form { ...layout } name = 'basic' onFinish = { this.handleSubmit } >
                    <Form.Item 
                        label = 'Usuário' name = 'username' className = 'inputFormLoginUser'
                        rules = {[{ required: true, message: 'Por Favor, Insira o Seu Usuário!' }]}
                    >
                        <Input />
                    </Form.Item>
            
                    <Form.Item
                        label = 'Senha' name = 'password' className = 'inputFormLoginUser'
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
            </Content>
        );
    }
}

export default Login;