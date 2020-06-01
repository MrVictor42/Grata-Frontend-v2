import React, { Component } from 'react';
import { Button, Drawer, Form, Col, Row, Input } from 'antd';
import { PlusOutlined, SaveOutlined, StopOutlined, MinusCircleOutlined } from '@ant-design/icons';

let id = 0;

export class FormCreateQuiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };
    
    onClose = () => {
        this.setState({ visible: false });
    };

    remove = k => {

        const { form } = this.props;
		const keys = [form.getFieldValue('keys')];
		
		if (keys.length === 1) return;
		
		form.setFieldsValue({
			keys: keys.filter(key => key !== k)
		});
	};

  	add = () => {
		
		const { form } = this.props;
		const keys = [form.getFieldValue('keys')];
		const nextKeys = keys.concat(++id);
		
		form.setFieldsValue({
			keys: nextKeys
		});
  	};

    render() {
        const CreateFormQuiz = () => {
            const [form] = Form.useForm();
            
            // const keysDecorator = form.setFieldsValue('keys', { initialValue: [] });
            // const keys = [form.getFieldValue(keysDecorator)];
            // const formItems = keys.map((k, index) => (
            //     <Form.Item 
            //         label = { index === 0 ? 'Escolhas' : ''} key = { k }
            //         name = { `questions[${ this.props.id }]choices[${k}]` }
            //         rules = {[{ 
            //             required: true, 
            //             message: 'Por Favor, Adicione Uma Opção Para Resposta.',
            //         }]}
            //     >
            //         <Input placeholder = 'Escolha a Resposta'/>

            //         { keys.length > 1 ? (
            //             <MinusCircleOutlined
            //                 className = 'dynamic-delete-button'
            //                 disabled = { keys.length === 1 }
            //                 onClick = {() => this.remove(k)}
            //             />
            //         ) : null }
            //     </Form.Item>
            // ));

            return (
                <Drawer 
                    title = { `Questionário da Reunião ${ this.props.meeting.title }` }
                    onClose = { this.onClose } visible = { this.state.visible } width = { 'auto' }
                    footer = { 
                        <div style = {{ textAlign: 'center' }}>
                            <Button onClick = { this.onClose } style = {{ marginRight: 8 }}>
                                <StopOutlined /> <b> Cancelar </b>
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
                                <SaveOutlined /> <b> Cadastrar Questionário </b>
                            </Button>
                        </div>
                    }
                >
                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 'auto' }>
                            <Col span = { 'auto' }>
                                <Form.Item
                                    name = 'title' 
                                    label = 'Título da Questionário'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira o Título da Questionário',
                                    }]}
                                >
                                    <Input 
                                        maxLength = { 40 } 
                                        placeholder = 'Insira o Título da Questionário'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        }
        return (
            <span>
                <Button type = 'primary' ghost onClick = { this.showDrawer }>
                    <b> <PlusOutlined /> Novo Questionário </b>
                </Button>
                <CreateFormQuiz />
            </span>
        );
    }
}

export default FormCreateQuiz;