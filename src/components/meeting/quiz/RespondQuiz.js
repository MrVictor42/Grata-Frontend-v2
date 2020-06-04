import React, { Component } from 'react';
import { Button, Card, Drawer, notification } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';

import Questions from '../../forms/meeting/quiz/Questions';
import Choices from '../../forms/meeting/quiz/Choices';

import { getQuestions } from '../../../store/quiz';
import { getQuesttionaire } from '../../../store/questtionaire';
import { size } from '../../../services/utils'; 

class RespondQuiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            title: null,
            questions: [],
            answers: {},
            visible: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            visible: true
        });
    };
    
    onClose = () => {
        this.setState({
            visible: false
        });
    };

    onChange = (e, qId) => {
        const { answers } = this.state;
        answers[qId] = e.target.value;
        this.setState({ answers });
    };

    handleSubmit() {
        const answers = this.state.answers;
        const questions = this.state.questions;
        let sizeAnswers = size(answers);

        if(sizeAnswers -1 !== questions.length) {
            notification.open({
                type: 'error',
                message: 'Alguma Questão Está Faltando!',
                description: 'O Número de Questões Respondidas Não Bate Com o Número de Perguntas! ' +
                             'Responda Todas as Questões'   
            });
        } else {
            // for(let auxChoices = 0; auxChoices < this.state.choices.length; auxChoices ++) {
            //     for(let auxAnswers = 0; auxAnswers < sizeAnswers; auxAnswers ++) {
            //         if(this.state.choices[auxChoices].title === answers[auxAnswers]) {
            //             console.log(answers[auxAnswers])
            //             console.log(this.state.choices[auxChoices].id)
            //         }
            //     }
            // }
        }
    }

    render() {
        const { title ,questions, answers } = this.state;
        return (
            <span>
                <Button type = 'danger' ghost onClick = { this.showDrawer }>
                    <HighlightOutlined /> <b> Responder Questionário </b> 
                </Button>
                <Drawer
                    title= { `Questionário: ${ title }` } width = { 'auto' }
                    onClose = { this.onClose } visible = { this.state.visible }
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
                </Drawer>
            </span>
        );
    }
}

export default RespondQuiz;