import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

class MeetingAgenda extends Component {

    render() {
        return (
            <Form form = { this.props.form }>
                <h2 align = 'center'> Pautas da Reunião </h2>
                <Form.List name = 'agendas'>
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                { fields.map((field, index) => (
                                    <Form.Item
                                        { ...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                                        label = { index === 0 ? 'Tópicos' : ''}
                                        required = { true }
                                        key = { field.key }
                                        className = 'formList'
                                    >
                                        <Form.Item
                                            { ...field }
                                            validateTrigger = {['onChange', 'onBlur']}
                                            rules = {[{
                                                required: true,
                                                whitespace: true,
                                                message: 'Por Favor, Adicione Pelo Menos um Tópico ' + 
                                                        'a Reunião, ou Exclua Este Campo!' 
                                            }]}
                                            noStyle
                                        >
                                            <Input 
                                                placeholder = 'Tópico da Pauta' 
                                                style = {{ width: '60%' }} 
                                                maxLength = { 40 } 
                                                required = { true }
                                            />
                                        </Form.Item>
                                        { fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className = 'dynamic-delete-button'
                                                style = {{ margin: '0 8px' }}
                                                onClick = {() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null }
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type = 'dashed' onClick = {() => { add() }}
                                        style = {{ width: '60%', marginLeft: 120 }}
                                    >
                                        <PlusOutlined /> Adicionar Tópicos
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            </Form>
        );
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 20, offset: 0 },
        sm: { span: 20, offset: 0 },
    },
};

export default MeetingAgenda;