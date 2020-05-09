import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, notification } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

import { getUserToken } from '../../../store/user';
import { getSectors } from '../../../store/sector';
import { saveProject } from '../../../store/project';

const { Option } = Select;

class FormProjectCreate extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            token: null,
            sectors: [],
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
            token: token 
        });
    }

    async handleSubmit(values) {
        const token = this.state.token;
        const title = values.title;
        const sector = values.sector;
        const statusProject = 'Pendente';
        const project = {
            title: title,
            sector: sector,
            status: statusProject
        }
        const status = await saveProject(token, project);

        if(status !== false) {
            notification.open({ 
                type: 'success',
                message: 'Projeto Criado',
                description: `O Projeto ${ project.title } Foi Salvo Com Sucesso!`,
            });
            this.props.history.push('/lista_de_setores');
        } else {
            notification.open({ 
                type: 'error',
                message: 'Projeto Não Foi Criado',
                description: 'Não Foi Possível Cadastrar o Projeto! Tente Novamente!',
            });
            notification.open({
                type: 'info',
                message: 'Ação Requerida',
                description: 'Se o Problema Persistir, Entre em Contato Com o Desenvolvedor!',
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
        let data = { sectors: [] };

        for(let aux = 0; aux < this.state.sectors.length; aux ++) {
            data.sectors.push({
                key: this.state.sectors[aux].id,
                name: this.state.sectors[aux].name,
            });            
        }

        const CreateFormProject = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = 'Registro de Projeto' onClose = { this.onClose } width = { 680 } 
                    visible = { this.state.visible } style = {{ height: 420 }}
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
                                <SaveOutlined /> Cadastrar Projeto
                            </Button>
                        </div>
                    }
                >
                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 20 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'title' label = 'Nome do Projeto'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira o Nome do Projeto',
                                    }]}
                                >
                                    <Input maxLength = { 100 } placeholder = 'Insira o Nome do Projeto'/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'sector' label = 'Setor' 
                                    rules = {[{ 
                                        required: true,
                                        message: 'Por Favor, Escolha o Setor', 
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

                        <Row gutter = { 8 }>
                            <Col span = { 8 }>
                                <Form.Item
                                    name = 'status' label = 'Status do Projeto'
                                    rules = {[{ 
                                        required: false, 
                                    }]}
                                >
                                    <Input disabled = { true } placeholder = 'Pendente'/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        };
        return(
            <div>
                <span onClick = { this.showDrawer }> Adicionar Projeto </span>
                <CreateFormProject />
            </div>
        );
    }
}

export default withRouter(FormProjectCreate);