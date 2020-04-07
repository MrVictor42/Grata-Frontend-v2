import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Layout, Input, Button, Form, Card } from 'antd';
import { Link } from 'react-router-dom';
import DefaultUser from '../../img/default_user.png';

import { getUser, getCurrentUser, getUserId } from '../../store/actions/user';
import { typeUser } from '../../services/userService';

const { Content } = Layout;
const { Meta } = Card;

class UserEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {}
        }
    }
    
    async componentDidMount() {
        const token = this.props.token;
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    };

    render() {
        const { currentUser } = this.state;
        return (
            <Content className = 'painelContent'>
                {currentUser.name}
                {currentUser.username}
            </Content>
        )
    

    // componentDidMount() {
    //     const token = this.props.token;

    //     if (token !== undefined && token !== null) {
    //         this.props.getUser(token, this.props.currentUser.userId);
	// 	}
    // }

    // render() {
    //     const layout = { labelCol: { span: 3, }, wrapperCol: { span: 14, }, };
    //     const { currentUser } = this.props;
    //     const type = typeUser(currentUser.is_administrator);
    //     return(
    //         <Content className = 'painelContent'>
    //             <h1 className = 'h1User'> Informações Cadastradas </h1>
    //             <Form {...layout} name = 'nest-messages'>
    //                 <Form.Item label = 'Nome' className = 'inputsUserDetail'>
    //                     <Input disabled = { true } value = { currentUser.name } />
    //                 </Form.Item>

    //                 <Form.Item label = 'Usuário' className = 'inputsUserDetail'>
    //                     <Input disabled = { true } value = { currentUser.username } />
    //                 </Form.Item>

    //                 <Form.Item label = 'Setor' className = 'inputsUserDetail'>
    //                     <Input disabled = { true } value = { 'Não feito ainda' } />
    //                 </Form.Item>

    //                 <Form.Item label = 'Ramal' className = 'inputsUserDetail'>
    //                     <Input disabled = { true } value = { currentUser.ramal } />
    //                 </Form.Item>

    //                 <Form.Item label = 'Tipo de Usuário' className = 'inputsUserDetail'>
    //                     <Input disabled = { true } value = { type } />
    //                 </Form.Item>  
    //             </Form>
    //             <Content>
    //                 <Card
    //                     cover = { <img alt = 'avatar' src = { DefaultUser } /> }
    //                     hoverable 
    //                     className = 'imgAvatar'
    //                 >
    //                     <Meta title = 'Foto do Usuário' description = 'Essa é Sua Foto de Usuário' />
    //                 </Card>
    //             </Content>
    //             <Content className = 'painelContent'>
    //                 <Form {...layout} name="nest-messages" onFinish={this.onFinish} >
    //                     <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
    //                         <Input value = { currentUser.name}/>
    //                     </Form.Item>

    //                     <Form.Item label="Email" rules={[{ type: 'email' }]}>
    //                         <Input value = { currentUser.email} name = {'email'}/>
    //                     </Form.Item>

    //                     <Form.Item name={['user', 'website']} label="Website">
    //                     <Input />
    //                     </Form.Item>
    //                     <Form.Item name={['user', 'introduction']} label="Introduction">
    //                     <Input.TextArea />
    //                     </Form.Item>
    //                     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
    //                     <Button type = 'primary' className = 'save' 
    //                         style = {{ marginLeft: 350, marginBottom: 60 }}>
    //                     <Link to = { '/edicao_usuario' }> Editar Informações </Link>
    //                 </Button>
    //                     </Form.Item>
    //                 </Form>
    //             </Content>                
    //         </Content>

            // <Content className = 'painelContent'>
            //     <Form {...layout} name="nest-messages" onFinish={this.onFinish} >
            //         <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
            //             <Input value = { currentUser.name}/>
            //         </Form.Item>

            //         <Form.Item label="Email" rules={[{ type: 'email' }]}>
            //             <Input value = { currentUser.email} name = {'email'}/>
            //         </Form.Item>
            //         <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
            //         <InputNumber />
            //         </Form.Item>
            //         <Form.Item name={['user', 'website']} label="Website">
            //         <Input />
            //         </Form.Item>
            //         <Form.Item name={['user', 'introduction']} label="Introduction">
            //         <Input.TextArea />
            //         </Form.Item>
            //         <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            //         <Button type="primary" htmlType="submit">
            //             Submit
            //         </Button>
            //         </Form.Item>
            //     </Form>
            // </Content>
        // );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentUser: state.auth.currentUser,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
	return {
		// getUser: (token, userId) => dispatch(getUser(token, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);