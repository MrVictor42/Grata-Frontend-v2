import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, message } from 'antd';
import { withRouter } from 'react-router';

import { getUserToken } from '../../store/user';
import { saveSector } from '../../store/sector';

class FormSector extends Component {

    constructor(props) {
        super(props)
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(values) {
        const token = getUserToken();
        const initials = values.initials;
        const name = values.name;
        const sector = {
            name: name,
            initials: initials
        }
        const status = await saveSector(token, sector);

        if(status === true) {
            message.success('Setor Criado Com Sucesso!');
            this.props.history.push('/lista_de_setores');
        } else {
            message.error('Erro Inesperado.. Tente Novamente!');
            this.props.history.push('/lista_de_setores');
        }
    }

    render() {
        let visible = this.props.visibleSector;
        let cancel = this.props.onClose;
        const CreateFormSector = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = 'Registro de Setor' onClose = { cancel } width = { 720 }
                    visible = { visible } style = {{ height: 320 }}
                    footer = { 
                        <div style = {{ textAlign: 'center' }}>
                            <Button onClick = { cancel } style = {{ marginRight: 8 }}>
                                Cancelar
                            </Button>
                            <Button onClose = { cancel } type = 'primary' 
                                onClick = { () => {
                                    form.validateFields().then(values => {
                                        form.resetFields();
                                        this.handleSubmit(values);
                                    }).catch(info => {
                                        console.log('Validate Failed:', info);
                                    });
                                }} >
                                Cadastrar Setor
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
                                        max: 100 
                                    }]}
                                >
                                    <Input placeholder = 'Insira o Nome do Setor' />
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
                                        max: 6 
                                    }]}
                                >
                                    <Input placeholder = 'Iniciais' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            )
        };
        return(
            <CreateFormSector />
        );
    } 
}

export default withRouter(FormSector);