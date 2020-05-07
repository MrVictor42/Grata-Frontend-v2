import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, notification } from 'antd';
import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

import { getUserToken } from '../../../store/user';
import { editSector } from '../../../store/sector';

class FormSectorEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            token: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();

        this.setState({ token: token });
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };
    
    onClose = () => {
        this.setState({ visible: false });
    };

    async handleSubmit(values) {
        const token = this.state.token;
        const initials = values.initials;
        const name = values.name;
        const sector = {
            id: this.props.sector.key,
            name: name,
            initials: initials
        };
        const status = await editSector(token, sector);

        if(status === true) {
            notification.open({ 
                type: 'success',
                message: 'Setor Editado',
                description: 'Setor Editado Com Sucesso!',
            });
            notification.open({
                type: 'info',
                message: 'Ação Requerida',
                description: 'Por Favor, Atualize a Página!',
            });
            this.props.history.push('/lista_de_setores');
        } else {
            notification.open({
                type: 'error',
                message: 'Ação Cancelada',
                description: 'Erro Inesperado.. Tente Novamente!',
            });
            this.props.history.push('/lista_de_setores');
        }
    }

    render() {
        const FormSectorEdit = () => {
            const [form] = Form.useForm();
            return (
                <Drawer
                    title = { `Editar Setor: ${ this.props.sector.name }` } 
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
                        <Row gutter = { 6 }>
                            <Col span = { 16 }>
                                <Form.Item label = 'Nome'>
                                    <Input 
                                        disabled = { true } placeholder = { this.props.sector.name }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 6 }>
                            <Col span = { 4 }>
                                <Form.Item label = 'Iniciais'>
                                    <Input 
                                        disabled = { true } placeholder = { this.props.sector.initials } 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 6 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'name' label = 'Nome'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira o Nome do Setor',
                                    }]}
                                >
                                    <Input maxLength = { 100 } placeholder = 'Insira o Nome do Setor'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Row gutter = { 6 }>
                            <Col span = { 4 }>
                                <Form.Item
                                    name = 'initials' label = 'Iniciais do Setor'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira as Iniciais',
                                    }]}
                                >
                                    <Input maxLength = { 8 } placeholder = 'Iniciais' />
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
                <FormSectorEdit />
            </div>
        );
    }
}

export default withRouter(FormSectorEdit);