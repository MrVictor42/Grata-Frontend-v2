import React, { Component } from 'react';
import { Button, Drawer, Tabs, Form, notification } from 'antd';
import { 
    OrderedListOutlined, BookOutlined, AccountBookOutlined, SaveOutlined, StopOutlined 
} from '@ant-design/icons';

import MeetingAgenda from './MeetingAgenda';
import RulesMeeting from './RulesMeeting';

const { TabPane } = Tabs;

class Items extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
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
                                        form.resetFields();
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