import React, { Component } from 'react';
import { 
    Drawer, Form, Button, Col, Row, Input, DatePicker, TimePicker, 
    TreeSelect, Select, notification 
} from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';

import { getUserToken, getUsers } from '../../../store/user';
import { getSectors } from '../../../store/sector';
import { getAllProjects } from '../../../store/project';
import { saveMeeting, getAllMeetings } from '../../../store/meeting';

const { TextArea } = Input;
const { Option } = Select;

class FormMeetingCreate extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            token: null,
            projects: [],
            users: [],
            sector: [],
            meetings: []
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const users = await getUsers(token);
        const projects = await getAllProjects(token);
        const sector = await getSectors(token);
        const meetings = await getAllMeetings(token);

        this.setState({ 
            users: users,
            token: token,
            projects: projects,
            sector: sector,
            meetings: meetings
        });
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
    };

    async handleSubmit(values) {

        const meetings = this.state.meetings;

        let found = meetings.find(meeting => {
            if(meeting.title === values.title) {
                return true;
            } else {
                return undefined;
            }
        });

        if(found === 'undefined' || found === undefined) {
            const token = this.state.token;
            const meeting = {
                title: values.title,
                meeting_leader: values.meeting_leader,
                project: values.project,
                subject_matter: values.subject_matter,
                initial_date: values['initial_date'].format('DD/MM/YYYY'),
                initial_hour: values['initial_hour'].format('HH:mm:ss'),
                status: 'Pendente'
            };
            let slug = null;

            for(let aux = 0; aux < this.state.projects.length; aux ++) {
                if(this.state.projects[aux].id === values.project) {
                    slug = this.state.projects[aux].slug;
                }
            }
            
            const status = await saveMeeting(token, meeting);

            if(status !== true) {
                notification.open({ 
                    type: 'success',
                    message: 'Reunião Criada',
                    description: `A Reunião ${ meeting.title } Foi Salva Com Sucesso!`,
                });
                this.props.history.push(`/projeto/${ slug }`);
            } else {
                notification.open({ 
                    type: 'error',
                    message: 'Reunião Não Criada',
                    description: 'Não Foi Possível Cadastrar a Reunião! Tente Novamente!',
                });
                notification.open({
                    type: 'info',
                    message: 'Ação Requerida',
                    description: 'Se o Problema Persistir, Entre em Contato Com o Desenvolvedor!',
                });
            }            
        } else {
            notification.open({ 
                type: 'error',
                message: 'Reunião Não Criada',
                description: 'Já Existe Uma Reunião Com Este Nome/Título Neste ou em Outro Setor. ' +
                             'Cadastre Com Outro Nome!' 
            });
        }    
    }
    
    onSearch(val) {
        console.log('search:', val);
    }

    render() {
        let data_users = { users: [] };

        for(let aux = 0; aux < this.state.users.length; aux ++) {
            data_users.users.push({
                key: this.state.users[aux].id,
                name: this.state.users[aux].name
            });
        }

        let projects_list = [];
        let data = { projects: [] }
        let count = 0;

        for(let aux = 0; aux < this.state.sector.length; aux ++) {
            data.projects.push({
                id: this.state.sector[aux].id,
                title: this.state.sector[aux].name,
                disabled: true
            });
            for(let auxProject = 0; auxProject < this.state.projects.length; auxProject ++) {
                if(this.state.sector[aux].id === this.state.projects[auxProject].sector) {
                    if(this.state.projects[auxProject].status === 'Cancelada') {

                    } else {
                        data.projects.push({
                            pId: this.state.projects[auxProject].id,
                            value: this.state.projects[auxProject].id,
                            title: this.state.projects[auxProject].title
                        });
                    }
                    projects_list[count] = this.state.projects[auxProject];
                    count ++;
                }
            }
            count = 0;
            projects_list = [];
        }

        const CreateFormMeeting = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = 'Registro de Reunião' onClose = { this.onClose } width = { 650 }
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
                                }}>
                                <SaveOutlined /> Cadastrar Reunião
                            </Button>
                        </div>
                    }
                >
                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 16 }>
                            <Col span = { 10 }>
                                <Form.Item
                                    name = 'title' label = 'Título da Reunião'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira o Título da Reunião',
                                    }]}
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
                                    rules = {[{ 
                                        required: false, 
                                    }]}
                                >
                                    <Input disabled = { true } placeholder = 'Pendente'/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'subject_matter' label = 'Ementa da Reunião'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira a Ementa da Reunião',
                                    }]}
                                >
                                    <TextArea rows = { 4 } maxLength = { 500 }/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'meeting_leader' label = 'Líder da Reunião'
                                    rules = {[{
                                        required: true,
                                        message: 'Por Favor, Escolha o Líder da Reunião'
                                    }]}
                                >
                                    <Select
                                        showSearch
                                        style = {{ width: '100%' }}
                                        placeholder = 'Selecione o Líder da Reunião'
                                        optionFilterProp = 'children'
                                        onSearch = { this.onSearch }
                                        filterOption = {(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        { data_users.users.map(user =>
                                            <Option value = { user.key } key = { user.key }>
                                                { user.name }
                                            </Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 10 }>
                                <Form.Item
                                    name = 'initial_date' label = 'Data da Reunião'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira a Data de Abertura da Reunião',
                                    }]}
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
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira a Hora de Abertura da Reunião',
                                    }]}
                                >
                                    <TimePicker 
                                        use24Hours
                                        initialValues = { moment('00:00:00', 'HH:mm:ss')}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'project' label = 'Projeto'
                                >
                                    <TreeSelect
                                        style = {{ width: '100%' }}
                                        value = { this.state.value }
                                        dropdownStyle = {{ maxHeight: 400, overflow: 'auto' }}
                                        treeData = { data.projects }
                                        placeholder = 'Selecione o Projeto'
                                        treeDefaultExpandAll
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
                <span onClick = { this.showDrawer }> Adicionar Reunião </span>
                <CreateFormMeeting />
            </div>
        )
    }
}

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default withRouter(FormMeetingCreate);