import React, { Component } from 'react';
import { 
    Drawer, Form, Button, Col, Row, Input, DatePicker, TimePicker, 
    TreeSelect, Select 
} from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';

import { getUserToken, getUsers } from '../../../store/user';
import { getAllProjects } from '../../../store/project';

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
            initial_hour: null,
            initial_date: null,
            value: undefined
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeInitialDate = this.onChangeInitialDate.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const users = await getUsers(token);
        const projects = await getAllProjects(token);

        this.setState({ 
            users: users,
            token: token,
            projects: projects
        });
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
    };

    handleSubmit(values) {
        console.log(values['initial_hour'].format('HH:mm:ss'))
        console.log(values['initial_date'].format('DD/MM/YYYY'))
        console.log(values)
    }
    
    onChangeInitialDate(date, dateString) {
        this.setState({ initial_date: dateString });
    }
      
    onSearch(val) {
        console.log('search:', val);
    }

    render() {
        let data_users = { users: [] };
        let data_project = { projects: [] };

        for(let aux = 0; aux < this.state.users.length; aux ++) {
            data_users.users.push({
                key: this.state.users[aux].id,
                name: this.state.users[aux].name
            });
        }

        for(let aux = 0; aux < this.state.projects.length; aux ++) {
            if(this.state.projects[aux].status === 'Cancelada') {

            } else {
                data_project.projects.push({
                    key: this.state.projects[aux].id,
                    title: this.state.projects[aux].sector,
                    children: [{
                        title: this.state.projects[aux].title
                    }]
                });
            }
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
                                        defaultValue = { moment('09/07/2020', 'DD/MM/YYYY')} 
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
                                        defaultOpenValue = { moment('00:00:00', 'HH:mm:ss')}
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
                                        treeData = { data_project.projects }
                                        placeholder = 'Selecione o Projeto'
                                        treeDefaultExpandAll
                                        onChange = { this.onChange }
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