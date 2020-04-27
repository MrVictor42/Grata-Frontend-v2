import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';

import { getUserToken } from '../../store/user';

class FormSector extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const token = getUserToken();
        const initials = values.initials;
        const name = values.sector;

        
        // console.log(this.props)
        // console.log(values)
    }

    render() {
        let visible = this.props.visibleSector;
        let cancel = this.props.onClose;
        const CreateFormSector = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = 'Registro de Setor' onClose = { cancel } width = {720}
                    visible = { visible } style = {{ height: 300 }}
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
                            <Col span = { 12 }>
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
                                    <Input placeholder = 'Insira o Nome do Setor' />
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

export default FormSector;