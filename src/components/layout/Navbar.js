import React, { Component, useState } from 'react';
import { Layout, Menu, Modal, Form, Input, Button, Radio } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';

import { logout } from '../../store/auth';

const { Header } = Layout;

class Navbar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.visibleForm = this.visibleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    visibleForm() {
        this.setState({ 
            visible: true 
        });
    }

    handleSubmit(values) {
        console.log(values)
    }

    render() {
        let visible = this.state.visible;
        return (
            <Header className = 'header'>
                <Menu className = 'menu' mode = 'horizontal'>
                    {
                        this.props.isLogged === null ? (
                            null
                        ) : (
                            <Menu.Item>
                                <Dropdown />
                            </Menu.Item>
                        )
                    }
                    {
                        this.props.isLogged === null ? (
                            <Menu.Item>
                                <span 
                                    onClick = { this.visibleForm }
                                    className = 'textNavbar'>
                                        Login
                                </span>
                                <CollectionCreateForm
                                    visible = { visible }
                                    onCreate = { this.handleSubmit }
                                    onCancel = { () => {
                                        this.setState({ visible: false });
                                    }}
                                />
                            </Menu.Item>
                        ) : (
                            <Menu.Item onClick = { this.props.logout }>
                                <Link to = '/'><p className = 'textNavbar'> Logout </p></Link>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </Header>
        );
    }
}

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible = { visible } title = 'Login' okText = 'Entrar'
            cancelText = 'Cancelar' onCancel = { onCancel }
            onOk = {() => {
                form.validateFields().then(values => {
                    form.resetFields();
                    onCreate(values);
                }).catch(info => {
                    console.log('Validate Failed:', info);
                });
            }}
        >
        <Form
            form = { form } layout = 'vertical'
            name = 'form_in_modal' initialValues = {{ modifier: 'public' }}
        >
            <Form.Item
                name = "title"
                label="Title"
                rules={[
                {
                    required: true,
                    message: 'Please input the title of collection!',
                },
                ]}
            >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
};

const mapStateToProps = state => {
    
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));