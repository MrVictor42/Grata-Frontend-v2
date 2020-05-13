import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, notification } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

import { getUserToken } from '../../../store/user';
import { saveSector, getSectors } from '../../../store/sector';

class FormSectorCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            token: null,
            sectors: []
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const sectors = await getSectors(token);

        this.setState({ 
            sectors: sectors,
            token: token,
        });
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
    };

    async handleSubmit(values) {

        const sectors = this.state.sectors;

        let found = sectors.find(sector => {
            if(sector.name === values.name) {
                return true;
            } else {
                return undefined;
            }
        });

        if(found === 'undefined' || found === undefined) {
            const token = this.state.token;
            const initials = values.initials;
            const name = values.name;

            const sector = {
                name: name,
                initials: initials
            };
            const status = await saveSector(token, sector);

            if(status === true) {
                notification.open({ 
                    type: 'success',
                    message: 'Setor Criado',
                    description: 'Setor Criado Com Sucesso!',
                });
                this.props.history.push('/lista_de_setores');
            } else {
                notification.open({ 
                    type: 'error',
                    message: 'Ação Requerida',
                    description: 'Erro Inesperado.. Tente Novamente!',
                });
                this.props.history.push('/lista_de_setores');
            }
        } else {
            notification.open({ 
                type: 'error',
                message: 'Setor Não Criado',
                description: 'Já Existe um Setor Com Este Nome! Por Favor, Cadastre Outro!',
            });
        }
    }

    render() {
        const CreateFormSector = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = 'Registro de Setor' onClose = { this.onClose } width = { 720 }
                    visible = { this.state.visible } style = {{ height: 320 }}
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
                                <SaveOutlined /> Cadastrar Setor
                            </Button>
                        </div>
                    }
                >
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
                                    <Input maxLength = { 6 } placeholder = 'Iniciais' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        };
        return(
            <div>
                <span onClick = { this.showDrawer }> Adicionar Setor </span>
                <CreateFormSector />
            </div>
        );
    } 
}

export default withRouter(FormSectorCreate);