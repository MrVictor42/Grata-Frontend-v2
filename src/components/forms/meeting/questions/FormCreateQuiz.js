import React, { Component } from 'react';
import { Button, Input, Divider, notification } from 'antd';
import { Form } from '@ant-design/compatible';
import { PlusOutlined, MinusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

import QuestionForm from './QuestionForm';
import Hoc from '../../../../hoc/hoc';

import { addQuesttionaire } from '../../../../store/meeting';
import { getUserToken } from '../../../../store/user';

class FormCreateQuiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            formCount: 1,
            formLayout: 'vertical'
        }
        
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    add = () => {
        const { formCount } = this.state;
        this.setState({
            formCount: formCount + 1
        });
    };
    
    remove = () => {
        const { formCount } = this.state;
        this.setState({
            formCount: formCount - 1
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const questions = [];
                const token = getUserToken();
                const slugProjet = this.props.match.params.slugProjeto;
                let status = null;

                for (let aux = 0; aux < values.questions.length; aux ++) {
                    questions.push({

                        title: values.question[aux],
                        choices: values.questions[aux].choices.filter(el => el !== null)
                    });
                }

                const questtionaire = {
                    title: values.title,
                    questions
                }

                const meeting = {
                    slug: this.props.match.params.slug,
                    questtionaire: questtionaire
                }

                status = addQuesttionaire(token, meeting);
                if(status === true) {
                    notification.open({
                        type: 'success',
                        message: 'Questionário Criado!',
                        description: 'O Questionário Foi Criado Com Sucesso!',
                    });
    				this.props.history.push(`/projeto/${ slugProjet }`);
                } else {
                    notification.open({
                        type: 'error',
                        message: 'Questionário Não Criado!',
                        description: 'O Questionário Não Foi Criado! Tente Novamente!',
                    });
                    notification.open({
                        type: 'info',
                        message: 'Ação Requerida!',
                        description: 'Caso o Problema Persista, Entre em Contato Com o Desenvolvedor!',
                    });
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const questions = [];

        for (let aux = 0; aux < this.state.formCount; aux ++) {
            questions.push(
                <Hoc key = { aux }>
                    { questions.length > 0 ? (
                        <MinusCircleOutlined
                            className = 'dynamic-delete-button'
                            disabled = { questions.length === 0 }
                            onClick={() => this.remove()}
                        />
                    ) : null }
                    <QuestionForm id = { aux } { ...this.props } />
                    <Divider />
                </Hoc>
            );
        }

        return (
            <span className = 'quizComponent'>
                <Form onSubmit = { this.handleSubmit } style = {{ width: 'auto', height: 'auto' }}>
                    <h1 align = 'center'> Criar Questionário </h1>
                    <Form.Item label = { 'Título do Questionário: '}>
                        {
                            getFieldDecorator(`title`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    message: 'Por Favor, Coloque o Título ao Questionário'
                                }]
                            })(
                                <Input 
                                    placeholder = 'Adicione um Títúlo ao Questionário'
                                    maxLength = { 50 } 
                                    style = {{ marginLeft: 20, width: 250, marginBottom: 10 }}
                                />
                            )
                        }
                    </Form.Item>

                    { questions }

                    <Form.Item>
                        <Button 
                            type = 'primary' onClick = { this.add } ghost
                            style = {{ marginLeft: 125 }}
                        >
                            <PlusOutlined/><b> Adicione Outra Questão </b>
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type = 'primary' 
                            htmlType = 'submit' 
                            style = {{ marginBottom: 100, marginLeft: 140, marginTop: 10 }}
                            ghost
                        >
                            <SaveOutlined /><b> Salvar Questionário </b>
                        </Button>
                    </Form.Item>
                </Form>
            </span>
        );
    }
}

const QuizCreatorForm = Form.create()(FormCreateQuiz);

export default withRouter(QuizCreatorForm);