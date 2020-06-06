import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { Form } from '@ant-design/compatible';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import Hoc from '../../../../hoc/hoc';

const FormItem = Form.Item;

let id = 0;

class QuestionForm extends Component {

    remove = k => {

		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		
		if (keys.length === 1) return;
		
		form.setFieldsValue({
			keys: keys.filter(key => key !== k)
		});
	};

  	add = () => {
		
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(++id);
		
		form.setFieldsValue({
			keys: nextKeys
		});
  	};

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
		const formItems = keys.map((k, index) => (
			<FormItem label = { index === 0 ? 'Escolhas' : ''} key = { k }>
				{
					getFieldDecorator(`questions[${ this.props.id }]choices[${ k }]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [{
							required: false,
							whitespace: true,
							message: 'Por Favor, Adicione Uma Opção Para Resposta.'
						}]
					})(
						<Input 
							placeholder = 'Escolha a Resposta'
							style = {{ marginLeft: 20, width: 335 }}
						/>
					)
				}

				{ keys.length > 1 ? (
					<MinusCircleOutlined
						style = {{ marginLeft: 20 }}
						disabled = { keys.length === 1 }
						onClick = {() => this.remove(k)}
					/>
				) : null }
			</FormItem>
		));
        return (
            <Hoc>
                <FormItem label = 'Pergunta: '>
				{
					getFieldDecorator(`question[${ this.props.id }]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [{
							required: true,
							message: 'Por Favor, Insira Uma Pergunta'
						}]
					})(
						<Input 
							placeholder = 'Adicionar Uma Pergunta'
							style = {{ marginLeft: 20, width: 335, marginBottom: 10 }}
						/>
					)
				}
				</FormItem>
				
				{ formItems }

				<Form.Item>
					<div align = 'center'>
						<Button 
							type = 'primary' onClick = { this.add } ghost 
							style = {{ marginLeft: 90, marginTop: 10 }}>
							<PlusOutlined/><b> Adicione Uma Opção de Resposta </b>
						</Button>
					</div>
                </Form.Item>
            </Hoc>
        );
    }
}

export default QuestionForm;