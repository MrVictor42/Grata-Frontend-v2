import React, { Component } from 'react';
import { Button, Card, Drawer, Rate, Modal, notification } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';

import Questions from '../../forms/meeting/questions/Questions';
import Choices from '../../forms/meeting/questions/Choices';

import { getQuestions } from '../../../store/questions';
import { getQuesttionaire } from '../../../store/questtionaire';
import { getChoices } from '../../../store/choices';
import { saveGradedQuesttionaire } from '../../../store/gradedQuesttionaire';
import { size } from '../../../services/utils'; 

class RespondQuiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            title: null,
            questions: [],
            answers: {},
            visibleDrawer: false,
            visibleModal: false,
            value: 3
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveGraded = this.saveGraded.bind(this);
    }
    
    async componentDidMount() {
        const token = this.props.token;
        const questtionaire_id = this.props.meeting.questtionaire;
        const questions = await getQuestions(token, questtionaire_id);
        const questtionaire = await getQuesttionaire(token, questtionaire_id);

        this.setState({
            questions: questions,
            title: questtionaire.title,
        });
    }

    showDrawer = () => {
        this.setState({
            visibleDrawer: true
        });
    };
    
    onClose = () => {
        this.setState({
            visibleDrawer: false
        });
    };

    onChange = (e, qId) => {
        const { answers } = this.state;
        answers[qId] = e.target.value;
        this.setState({ answers });
    };

    showModal = () => {
        this.setState({
          visibleModal: true,
        });
    };
    
    handleOk = e => {
        this.setState({
          visibleModal: false
        });
    };

    handleChange = value => {
        this.setState({ value });
    };

    async saveGraded() {
        const answers = this.state.answers;
        const questions = this.state.questions;
        let sizeAnswers = size(answers);
        let questionsID = { questions: [] };
        let choices = null;
        let listChoices = { choices: [] };
        let finalListChoices = { choices: [] };

        const history = this.props.history;
        const slug = this.props.slug;
        const userID = this.props.userID;
        const questtionaire_id = this.props.meeting.questtionaire;
        const token = this.props.token;
        let status = null;

        for(let aux = 0; aux < questions.length; aux ++) {
            questionsID.questions.push(questions[aux].id);
            choices = await getChoices(token, questions[aux].id);
            for(let auxChoices = 0; auxChoices < choices.length; auxChoices ++) {
                listChoices.choices.push({
                    id: choices[auxChoices].id,
                    title: choices[auxChoices].title
                });
            }
        }

        for(let auxChoices = 0; auxChoices < listChoices.choices.length; auxChoices ++) {
            for(let auxAnswers = 1; auxAnswers < sizeAnswers + 1; auxAnswers ++) {
                if(answers[auxAnswers] === listChoices.choices[auxChoices].title) {
                    finalListChoices.choices.push(listChoices.choices[auxChoices].id);
                }
            }
        }

        alert(this.state.value)
        
        const gradedQuesttionaire = {
            userID: userID,
            questtionaire_id: questtionaire_id,
            questionsID: questionsID.questions,
            answers: finalListChoices.choices,
            rate: this.state.value
        };

        status = saveGradedQuesttionaire(token, gradedQuesttionaire);
        if(status === true) {
            notification.open({
                type: 'success',
                message: 'Questionário Respondido!',
                description: 'O Questionário Foi Respondido Com Sucesso!',
            });
            this.props.history.push(`/projeto/${ slug }`);
        } else {
            notification.open({
                type: 'error',
                message: 'Questionário Não Respondido!',
                description: 'O Questionário Não Foi Respondido Com Sucesso! Tente Novamente!',
            });
            notification.open({
                type: 'info',
                message: 'Ação Requerida!',
                description: 'Caso o Problema Persista, Entre em Contato Com o Desenvolvedor!',
            });
        }
    }
    
    handleSubmit() {
        const answers = this.state.answers;
        const questions = this.state.questions;
        let sizeAnswers = size(answers);

        if(sizeAnswers !== questions.length) {
            notification.open({
                type: 'error',
                message: 'Alguma Questão Está Faltando!',
                description: 'O Número de Questões Respondidas Não Bate Com o Número de Perguntas! ' +
                             'Responda Todas as Questões!'   
            });
        } else {
            this.setState({ visibleModal: true });
        }
    }

    render() {
        const { title ,questions, answers, value } = this.state;
        return (
            <span>
                <Button type = 'danger' ghost onClick = { this.showDrawer }>
                    <HighlightOutlined /> <b> Responder Questionário </b> 
                </Button>
                <Drawer
                    title= { `Questionário: ${ title }` } width = { 'auto' }
                    onClose = { this.onClose } visible = { this.state.visibleDrawer }
                    bodyStyle = {{ paddingBottom: 80 }}
                >
                    <Card>
                        <h1> Questionário : { title } </h1>
                        <Questions
                            submit ={() => this.handleSubmit()}
                            questions = {questions.map(question => {
                                return (
                                    <Card
                                        style = {{ marginTop: 20, marginBottom: 20 }}
                                        type = 'inner'
                                        key = { question.id }
                                        title = {`${ question.order }. ${ question.title }`}
                                    >
                                        <Choices
                                            questionId = { question.order }
                                            choices = { question.choices }
                                            change = { this.onChange }
                                            answers = { answers }
                                        />
                                    </Card>
                                );
                            })}
                        />
                    </Card>
                    <Modal
                        title = 'Avaliação de Reunião' visible = { this.state.visibleModal }
                        onOk = { this.handleOk } closable = { false }
                        cancelButtonProps = {{ disabled: true }} afterClose = { this.saveGraded }
                    >
                        <div align = 'center'>
                            <Rate tooltips = { desc } onChange = { this.handleChange } value = { value }/>
                            { value ? <span className = 'ant-rate-text'> { desc[value - 1]}</span> : ''}
                        </div>
                    </Modal>
                </Drawer>
            </span>
        );
    }
}

const desc = ['Péssima', 'Ruim', 'Normal', 'Boa', 'Ótima'];

export default RespondQuiz;