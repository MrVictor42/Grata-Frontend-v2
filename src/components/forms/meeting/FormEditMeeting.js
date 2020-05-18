import React, { Component } from 'react';
import { 
    Drawer, Form, Button, Col, Row, Input, DatePicker, TimePicker, 
    Select, Modal, notification 
} from 'antd';
import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';

import { getUserToken } from '../../../store/user';
import { getAllMeetings, editMeeting } from '../../../store/meeting';

const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

class FormEditMeeting extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            token: null,
            meetings: []
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const meetings = await getAllMeetings(token);

        this.setState({ 
            token: token,
            meetings: meetings 
        });
    }

    async handleSubmit(values) {

        const meetings = this.state.meetings;

        let found = meetings.find(meeting => {
            if(meeting.title === values.title) {
                return true;
            } else {
                return undefined;
            }
        });
        
        if(found === 'undefined' || found === undefined 
        || values.title === '' || values.title === undefined) {
            const meetingID = this.props.meeting.key;
            const token = this.state.token;
            const userID = this.props.meeting.userID;
            const projectID = this.props.meeting.project;
            let title = null;
            let subject_matter = null;
            let initial_date = null;
            let initial_hour = null;
            let statusMeeting = null;

            if(values.title === '' || values.title === undefined) {
                title = this.props.meeting.title;
            } else {
                title = values.title;
            }

            if(values.subject_matter === '' || values.subject_matter === undefined) {
                subject_matter = this.props.meeting.subject_matter;
            } else {
                subject_matter = values.subject_matter;
            }

            if(values.initial_date === '' || values.initial_date === undefined) {
                initial_date = this.props.meeting.initial_date;
            } else {
                initial_date = values['initial_date'].format('DD/MM/YYYY');
            }

            if(values.initial_hour === '' || values.initial_hour === undefined) {
                initial_hour = this.props.meeting.initial_hour;
            } else {
                initial_hour = values['initial_hour'].format('HH:mm:ss');
            }

            if(values.status === undefined || values.status === 'pending' 
            || values.status === 'empty') {

                const meeting = {
                    meetingID: meetingID,
                    status: 'Pendente',
                    userID: userID,
                    projectID: projectID,
                    title: title,
                    subject_matter: subject_matter,
                    initial_date: initial_date,
                    initial_hour: initial_hour
                };

                statusMeeting = await editMeeting(token, meeting);

                if(statusMeeting !== true) {
                    notification.open({ 
                        type: 'success',
                        message: 'Reunião Atualizado',
                        description: 'A Reunião Foi Atualizada Com Sucesso!.',
                    });
                    notification.open({
                        type: 'info',
                        message: 'Ação Requerida',
                        description: 'Por Favor, Atualize a Página.',
                    });
                } else {
                    notification.open({ 
                        type: 'error',
                        message: 'Erro em Ação',
                        description: 'Erro ao Atualizar a Reunião, Tente Novamente!.',
                    });
                    notification.open({
                        type: 'info',
                        message: 'Ação Requerida',
                        description: 'Caso o Problema Persista, Entre em Contato com o Desenvolvedor!',
                    });
                }
            } else {
                confirm ({
                    title: 'Cancelamento de Reunião',
                    content: 'Tem Certeza Que Deseja Cancelar Esta Reunião? ' + 
                    'Está Ação Não Poderá Ser Desfeita!',
                    okText: 'Sim',
                    okType: 'danger',
                    cancelText: 'Não',
                
                    onOk() {
                        const meeting = {
                            meetingID: meetingID,
                            status: 'Cancelada',
                            userID: userID,
                            projectID: projectID,
                            title: title,
                            subject_matter: subject_matter,
                            initial_date: initial_date,
                            initial_hour: initial_hour
                        };

                        editMeeting(token, meeting);
                        
                        Modal.success({
                            title: 'Ação Concluída!',
                            content: 'Reunião Cancelada Com Sucesso!',
                        });
                        notification.open({
                            type: 'info',
                            message: 'Ação Requerida',
                            description: 'Por Favor, Atualize a Página.',
                        });
                    },
                    onCancel() {
                        notification.open({
                            type: 'success',
                            message: 'Ação Cancelada',
                            description: 'Cancelamento de Reunião Cancelada Com Sucesso!',
                        });
                    },
                });
            }
        } else {
            notification.open({ 
                type: 'error',
                message: 'Reunião Não Atualizada',
                description: 'Já Existe Uma Reunião Com Este Nome/Título Neste ou em Outro Setor. ' +
                            'Utilize Outro Nome!'
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
        console.log(this.props.meeting)
        const FormMeetingEdit = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = { `Editar a Reunião: ${ this.props.meeting.title }` } 
                    onClose = { this.onClose } width = { 650 }
                    visible = { this.state.visible } 
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
                                }} >
                                <SaveOutlined /> Salvar Alterações
                            </Button>
                        </div>
                    }
                >
                    <Form layout = 'vertical' hideRequiredMark>
                        <h1> Informações Cadastradas </h1>
                        <Row gutter = { 16 }>
                            <Col span = { 10 }>
                                <Form.Item label = 'Título da Reunião'>
                                    <Input 
                                        disabled = { true } 
                                        placeholder = { this.props.meeting.title } 
                                    />
                                </Form.Item>
                            </Col>

                            <Col span = { 6 }>
                                <Form.Item label = 'Status da Reunião'>
                                    <Input 
                                        disabled = { true } 
                                        placeholder = { this.props.meeting.status }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 16 }>
                                <Form.Item label = 'Ementa da Reunião'>
                                    <TextArea 
                                        rows = { 4 } disabled = { true } 
                                        placeholder = {`${ this.props.meeting.subject_matter }`}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span = { 16 }>
                                <Form.Item label = 'Líder da Reunião'>
                                    <Input 
                                        disabled = { true }
                                        placeholder = { this.props.meeting.meeting_leader }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 10 }>
                                <Form.Item label = 'Data da Reunião'>
                                    <Input 
                                        disabled = { true }
                                        placeholder = { this.props.meeting.initial_date }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span = { 6 }>
                                <Form.Item
                                    name = 'initial_hour' label = 'Hora de Início'
                                >
                                    <Input
                                        disabled = { true }
                                        placeholder = { this.props.meeting.initial_hour }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <h1> Informações a Serem Alteradas </h1>
                        <Row gutter = { 16 }>
                            <Col span = { 10 }>
                                <Form.Item
                                    name = 'title' label = 'Título da Reunião'
                                    rules = {[{ required: false }]}
                                >
                                    <Input 
                                        maxLength = { 40 } 
                                        placeholder = 'Insira o Título da Reunião'
                                    />
                                </Form.Item>
                            </Col>

                            <Col span = { 6 }>
                                <Form.Item
                                    name = 'status' label = 'Status da Reunião'
                                    rules = {[{ required: false }]}
                                >
                                    <Select>
                                        <Option value = 'empty'> </Option>
                                        <Option value = 'pending'> Pendente </Option>
                                        <Option value = 'canceled'> Cancelar Reunião </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'subject_matter' label = 'Ementa da Reunião'
                                    rules = {[{ required: false }]}
                                >
                                    <TextArea rows = { 4 } maxLength = { 500 }/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 10 }>
                                <Form.Item
                                    name = 'initial_date' label = 'Data da Reunião'
                                    rules = {[{ required: false }]}
                                >
                                    <DatePicker
                                        locale = { locale }
                                        initialValues = { moment('09/07/2020', 'DD/MM/YYYY')} 
                                        format = { dateFormatList } 
                                    />
                                </Form.Item>
                            </Col>
                            <Col span = { 6 }>
                                <Form.Item
                                    name = 'initial_hour' label = 'Hora de Início'
                                    rules = {[{ required: false }]}
                                >
                                    <TimePicker 
                                        use24Hours
                                        initialValues = { moment('00:00:00', 'HH:mm:ss')}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        };
        return (
            <div>
                <Button type = 'default' className = 'edit' onClick = { this.showDrawer }> 
                    <EditOutlined/> Editar 
                </Button>
                <FormMeetingEdit />
            </div>
        );
    }
}

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default FormEditMeeting;