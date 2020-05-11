import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, InputNumber, notification } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';

import { getUserToken, authSignup } from '../../../store/user';
import { getSectors } from '../../../store/sector';
import { typeUserValidate } from '../../../services/userService';

const { Option } = Select;

class FormUserCreate extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            sectors: []
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const sectors = await getSectors(token);

        this.setState({ sectors: sectors });
    }

    async handleSubmit(values) {
        let is_administrator_valid = typeUserValidate(values.type_user);
        let description = null;

        if(values.description === undefined || values.description === '') {
            description = 'Descrição Padrão';
        } else {
            description = values.description;
        }

        const user = {
            username: values.username,
            email: values.email,
            password1: values.password1,
            password2: values.password1,
            is_administrator: is_administrator_valid,
            is_participant: !is_administrator_valid,
            description: description,
            name: values.name,
            ramal: values.ramal,
            sector: values.sector,
        };

        const status = await authSignup(user);

        if(status !== false) {
            notification.open({ 
                type: 'success',
                message: 'Usuário Criado',
                description: `O Usuário ${ values.name } Foi Salvo Com Sucesso!`,
            });
            notification.open({
                type: 'info',
                message: 'Ação Requerida',
                description: 'O Usuário já Foi Adicionado, Verifique a Lista de Usuários.',
            });
        } else {
            notification.open({ 
                type: 'error',
                message: 'Usuário Não Cadastrado',
                description: 'Não Foi Possível Cadastrar o Usuário!',
            });
            notification.open({
                type: 'info',
                message: 'Ação Requerida',
                description: 'Se o Problema Persistir, Entre em Contato Com o Desenvolvedor.',
            });
        }

        this.setState({ visible: false });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    
    render() {
        let data = { sectors: [] };

        for(let aux = 0; aux < this.state.sectors.length; aux ++) {
            data.sectors.push({
                key: this.state.sectors[aux].id,
                name: this.state.sectors[aux].name,
            });            
        }

        const CreateFormUser = () => {
            const [form] = Form.useForm();
            return(
                <Drawer 
                    title = 'Registro de Usuário' onClose = { this.onClose } width = { 720 }
                    visible = { this.state.visible }
                    footer = { 
                        <div style = {{ textAlign: 'center' }}>
                            <Button onClick = { this.onClose } style = {{ marginRight: 8 }}>
                                <StopOutlined /> Cancelar
                            </Button>
                            <Button onClose = { this.onClose } type = 'primary' 
                                onClick = { () => {
                                    form.validateFields().then(values => {
                                        form.resetFields();
                                        this.handleSubmit(values);
                                    }).catch(info => {
                                        console.log('Validate Failed:', info);
                                    });
                                }}>
                                <SaveOutlined /> Cadastrar Usuário
                            </Button>
                        </div>
                    }
                >
                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 16 }>
                            <Col span = { 12 }>
                                <Form.Item
                                    name = 'name' label = 'Nome Completo'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira Seu Nome Completo' 
                                    }]}
                                >
                                    <Input 
                                        maxLength = { 100 } 
                                        placeholder = 'Por Favor, Insira Seu Nome Completo' 
                                    />
                                </Form.Item>
                            </Col>

                            <Col span = { 12 }>
                                <Form.Item
                                    name = 'email' label = 'Email'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira Seu Email' 
                                    }]}
                                >
                                <Input
                                    style = {{ width: '100%' }}
                                    placeholder = 'Por Favor, Insira Seu Email'
                                    maxLength = { 40 }
                                />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 8 }>
                                <Form.Item
                                    name = 'username' label = 'Usuário'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira Seu Usuário' 
                                    }]}
                                >
                                    <Input 
                                        maxLength = { 20 } 
                                        placeholder = 'Por Favor, Insira Seu Usuário' 
                                    />
                                </Form.Item>
                            </Col>

                            <Col span = { 4 }>
                                <Form.Item
                                    name = 'ramal' label = 'Ramal'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira Seu Ramal' 
                                    }]}
                                >
                                    <InputNumber 
                                        maxLength = { 6 } 
                                        placeholder = 'Ramal' 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 12 }>
                                <Form.Item
                                    name = 'password1' label = 'Senha'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira Sua Senha' 
                                    }]}
                                >
                                    <Input.Password 
                                        maxLength = { 40 } 
                                        placeholder = 'Por Favor, Insira Sua Senha' 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 20 }>
                            <Col span = { 6 }>
                                <Form.Item 
                                    name = 'type_user' label = 'Tipo de Usuário' 
                                    rules = {[{ required: true }]}
                                >
                                    <Select>
                                        <Option key = '1' value = { 'Administrador' }> 
                                            Administrador 
                                        </Option>
                                        <Option key = '2' value = { 'Participante' }>
                                            Participante
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'sector' label = 'Setor' 
                                    rules = {[{ 
                                        required: true,
                                        message: 'Por Favor, Escolha o Setor' 
                                    }]}
                                >
                                    <Select>
                                        { data.sectors.map(sector =>
                                            <Option value = { sector.key } key = { sector.key }> 
                                                { sector.name } 
                                            </Option> 
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 24 }>
                                <Form.Item
                                    name = 'description' label = 'Descrição (Opcional)'
                                    rules = {[{
                                        required: false,
                                        message: 'Por Favor, Insira Uma Descrição Sua',
                                    },
                                ]}
                                >
                                    <Input.TextArea 
                                        rows = { 4 } 
                                        placeholder = 'Por Favor, Insira Uma Descrição Sua' 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        };
        return (
            <div>
                <span onClick = { this.showDrawer }> Adicionar Usuário </span>
                <CreateFormUser />
            </div>
        );
    }
}

export default FormUserCreate; 