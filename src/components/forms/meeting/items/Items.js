import React, { Component } from 'react';
import { Button, Drawer, Tabs, Form, notification } from 'antd';
import { 
    OrderedListOutlined, BookOutlined, AccountBookOutlined, SaveOutlined, StopOutlined 
} from '@ant-design/icons';

import MeetingAgenda from './MeetingAgenda';
import RulesMeeting from './RulesMeeting';

import { addItemsMeeting } from '../../../../store/meeting';
import { getUserToken } from '../../../../store/user';

const { TabPane } = Tabs;

class Items extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    async handleSubmit(values) {
        const token = getUserToken();
        let agendas = [];
        let rules = [];
        let status = null;

        if(values.agendas === undefined || values.rules === undefined) {
            notification.open({ 
                type: 'warning',
                message: 'Espaços Brancos!',
                description: 'O Campo de Pauta ou de Regras Estão Vazios! Adicione Pelo Menos ' +
                             'um Campo Neles!'
            });
        } else {

            for(let aux = 0; aux < values.agendas.length; aux ++) {
                agendas.push({ title: values.agendas[aux] });
            }

            for(let aux = 0; aux < values.rules.length; aux ++) {
                rules.push({ title: values.rules[aux] });
            }

            const meeting = {
                meetingID: this.props.meeting.key,
                status: 'Agendada',
                userID: this.props.meeting.userID,
                projectID: this.props.meeting.project,
                title: this.props.meeting.title,
                initial_date: this.props.meeting.initial_date,
                initial_hour: this.props.meeting.initial_hour,
                subject_matter: this.props.meeting.subject_matter,
                agendas,
                rules
            };
    
            status = await addItemsMeeting(token, meeting);
    
            if(status !== true) {
                notification.open({ 
                    type: 'success',
                    message: 'Itens Adicionados!',
                    description: 'Os itens Foram Adicionados a Reunião Com Sucesso!',
                });
                notification.open({
                    type: 'info',
                    message: 'Ação Requerida!',
                    description: 'Por Favor, Atualize a Página.',
                });
            } else {
                notification.open({ 
                    type: 'error',
                    message: 'Erro em Ação!',
                    description: 'Erro ao Adicionar os Itens a Reunião, Tente Novamente!.',
                });
                notification.open({
                    type: 'info',
                    message: 'Ação Requerida!',
                    description: 'Caso o Problema Persista, Entre em Contato com o Desenvolvedor!',
                });
            }
        }
    }

    render() {
        const FormItems = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = { `Itens Para Composição da Reunião: ${ this.props.meeting.title }` } 
                    onClose = { this.onClose } width = { '50%' }
                    visible = { this.state.visible } 
                    footer = { 
                        <div style = {{ textAlign: 'center' }}>
                            <Button onClick = { this.onClose } style = {{ marginRight: 8 }}>
                                <StopOutlined /> Cancelar
                            </Button>
                            <Button onClose = { this.onClose } type = 'primary' 
                                onClick = { () => {
                                    form.validateFields().then(values => {
                                        this.handleSubmit(values);
                                    }).catch(info => {
                                        console.log('Validate Failed:', info);
                                    });
                                }}>
                                <SaveOutlined /> Cadastrar Itens
                            </Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark layout = 'vertical'>
                        <Tabs defaultActiveKey = '1'>
                            <TabPane
                                tab = { <span><BookOutlined /> Pautas da Reunião </span> }
                                key = '1'
                            >
                                <MeetingAgenda form = { form } />
                            </TabPane>

                            <TabPane
                                tab = { <span><AccountBookOutlined /> Regras da Reunião </span> }   
                                key = '2'
                            >
                                <RulesMeeting form = { form } />
                            </TabPane>
                        </Tabs>
                    </Form>
                </Drawer>
            );
        }
        return (
            <span>
                <Button onClick = { this.showDrawer }>
                    <OrderedListOutlined /> <b> Items </b>
                </Button>
                <FormItems />
            </span>
        );
    }
}

export default Items;