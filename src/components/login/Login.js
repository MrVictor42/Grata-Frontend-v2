import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';

import Loading from './Loading';

import { validateFields } from '../../services/userService';
import { authLogin } from '../../store/actions/auth';

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = values => {
        const username = values.username;
        const password = values.password;

        if(validateFields(username) === true) {

        } else {
            this.props.onAuth(username, password);
            this.props.history.push('/lista_de_projetos');
        }
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
            <div>
                {
                    this.props.loading ? (
                        <Loading/>
                    ) : (
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
                                            <Button className = 'buttonSubmit' type = 'primary' htmlType = 'submit'>
                                                <b> Entrar </b>
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(authLogin(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);