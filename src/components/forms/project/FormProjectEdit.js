import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Modal, notification } from 'antd';
import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';

import { getUserToken } from '../../../store/user';
import { editProject } from '../../../store/project';

const { Option } = Select;
const { confirm } = Modal;

class FormProjectEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            token: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();

        this.setState({ token: token });
    }

    async handleSubmit(values) {
        const idProject = this.props.project.key;
        const token = this.state.token;
        let title = null;
        let statusProject = null;

        if(values.title === undefined || values.title === '') {
            title = this.props.project.title;
        } else {
            title = values.title;
        }

        if(values.status === undefined || values.status === 'pending' || values.status === 'empty') {
            const project = {
                id: idProject,
                status: 'Pendente',
                title: title
            };

            statusProject = await editProject(token, project);

            if(statusProject === true) {
                notification.open({ 
                    type: 'success',
                    message: 'Projeto Atualizado',
                    description: 'O Projeto Foi Atualizado Com Sucesso!.',
                });
                notification.open({
                    type: 'info',
                    message: 'Ação Requerida',
                    description: 'Por Favor, Atualize a Página.',
                });
            } else {
                notification.open({ 
                    type: 'error',
                    message: 'Erro em Ação',
                    description: 'Erro ao Atualizar o Projeto, Tente Novamente!.',
                });
                notification.open({
                    type: 'info',
                    message: 'Ação Requerida',
                    description: 'Caso o Problema Persista, Entre em Contato com o Desenvolvedor!',
                });
            }
        } else {
            title = this.props.project.title;
            confirm ({
                title: 'Cancelamento de Projeto',
                content: 'Tem Certeza Que Deseja Cancelar Este Projeto? Todas as Reuniões e ' + 
                'Seus Documentos Serão Perdidos! do Projeto Serão Canceladas!',
                okText: 'Sim',
                okType: 'danger',
                cancelText: 'Não',
            
                onOk() {
                    const project = {
                        id: idProject,
                        title: title,
                        status: 'Cancelada'
                    }
                    editProject(token, project);
                    Modal.success({
                        title: 'Ação Concluída!',
                        content: 'Projeto Cancelado Com Sucesso!',
                    });
                    notification.open({
                        type: 'info',
                        message: 'Ação Requerida',
                        description: 'Por Favor, Atualize a Página.',
                    });
                },
                onCancel() {
                    notification.open({
                        type: 'info',
                        message: 'Ação Cancelada',
                        description: 'Cancelamento de Conta Cancelada Com Sucesso!',
                    });
                },
            });
        }
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };
    
    onClose = () => {
        this.setState({ visible: false });
    };    

    render() {
        const FormProjectEdit = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = { `Editar o Setor: ${ this.props.project.title }` } 
                    onClose = { this.onClose } width = { 720 }
                    visible = { this.state.visible } style = {{ height: 559 }}
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
                                }} >
                                <SaveOutlined /> Salvar Alterações
                            </Button>
                        </div>
                    }
                >
                    <Form layout = 'vertical' hideRequiredMark>
                        <h1> Informações Cadastradas </h1>
                        <Row gutter = { 16 }>
                            <Col span = { 16 }>
                                <Form.Item label = 'Nome do Projeto'>
                                    <Input 
                                        disabled = { true } placeholder = { this.props.project.title }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 8 }>
                            <Col span = { 8 }>
                                <Form.Item label = 'Status do Projeto'>
                                    <Input 
                                        disabled = { true } placeholder = { this.props.project.tags } 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 16 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'title' label = 'Nome do Projeto'
                                    rules = {[{ 
                                        required: false, 
                                        message: 'Por Favor, Insira o Nome do Projeto',
                                    }]}
                                >
                                    <Input maxLength = { 100 } placeholder = 'Insira o Nome do Projeto'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Row gutter = { 8 }>
                            <Col span = { 8 }>
                                <Form.Item
                                    name = 'status' label = 'Status do Projeto'
                                    rules = {[{ 
                                        required: false, 
                                        message: 'Por Favor, Escolha o Status do Projeto',
                                    }]}
                                >
                                    <Select>
                                        <Option value = 'empty'> </Option>
                                        <Option value = 'pending'> Pendente </Option>
                                        <Option value = 'canceled'> Cancelar Reunião </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        };
        return(
            <div>
                <Button type = 'default' className = 'edit' onClick = { this.showDrawer }> 
                    <EditOutlined/> Editar 
                </Button>
                <FormProjectEdit />
            </div>
        );
    }
}

export default FormProjectEdit;