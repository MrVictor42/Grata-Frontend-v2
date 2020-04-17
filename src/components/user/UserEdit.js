import React, { Component } from 'react';
import { Layout, Input, Button, Form, message } from 'antd';
import { Link } from 'react-router-dom';

import UserPhoto from './UserPhoto';

import { getCurrentUser, getUserId, getUserToken, updateUser } from '../../store/actions/user';
import { saveImage, editImage } from '../../store/actions/images';
import { validateUpdate } from '../../services/userService';
import { typeUser } from '../../services/userService';

const { Content } = Layout;

class UserEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            selectedFile: null,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    };

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isJpgOrPng) {
            message.error('Você Só Pode Carregar Arquivos JPG/PNG!');
        }

        if (!isLt2M) {
            message.error('Imagem Deve Ser Menor Que 2MB!');
        }

        return isJpgOrPng && isLt2M;
    }

    fileSelectHandler = event => {
        const file = event.target.files[0];
        
        if(this.beforeUpload(file)) {
            this.setState({ selectedFile: file });
        } else {
            
        }
    }

    async handleSubmit(values) {
        const token = getUserToken();
        const { currentUser } = this.state;
        const image = new FormData();
        let imageUser = null;
        let imageID = '';

        if(this.state.selectedFile === null) {

        } else {
            if(currentUser.image !== null) {
                imageID = currentUser.image;
                image.append('image', this.state.selectedFile, this.state.selectedFile.name);
                imageUser = await editImage(token, image, imageID);
            } else {
                image.append('image', this.state.selectedFile, this.state.selectedFile.name);
                imageUser = await saveImage(token, image);
                imageID = imageUser.id;
            }
        }

        const user = {
            id: currentUser.id,
            email: currentUser.email,
            username: currentUser.username,
            ramal: values.ramal,
            name: values.name,
            is_administrator: currentUser.is_administrator,
            is_participant: !currentUser.is_administrator,
            image: imageID
        };

        user = validateUpdate(user, currentUser);
        const status = await updateUser(token, user);
        if(status === true) {
            message.success('Informações Alteradas Com Sucesso!');
            this.props.history.push('/informacoes_usuario');
        } else {
            message.error('Algo de Ruim Aconteceu! Tente Novamente.')
            this.props.history.push('/edicao_usuario');
        }
    }

    render() {
        const { currentUser } = this.state;
        const layout = { labelCol: { span: 3, }, wrapperCol: { span: 14, }, };
        const type = typeUser(currentUser.is_administrator);
        return (
            <Content className = 'painelContent' style = {{ position: 'flex' }}>
                <h1 className = 'h1User'> Informações Cadastradas </h1>
                <Form {...layout} name = 'nest-messages'>
                    <Form.Item label = 'Nome' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { currentUser.name } />
                    </Form.Item>

                    <Form.Item label = 'Usuário' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { currentUser.username } />
                    </Form.Item>

                    <Form.Item label = 'Setor' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { 'Não feito ainda' } />
                    </Form.Item>

                    <Form.Item label = 'Ramal' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { currentUser.ramal } />
                    </Form.Item>

                    <Form.Item label = 'Tipo de Usuário' className = 'inputsUserDetail'>
                        <Input disabled = { true } value = { type } />
                    </Form.Item>  
                </Form>
                <Content style = {{ marginTop: -360, marginLeft: 180 }}>
                    <UserPhoto />
                </Content>

                <Content>
                    <br></br>
                    <h1 className = 'h1User'> Informações a Serem Alteradas </h1>
                    <h4 style = {{ color: 'red', marginLeft: -320 }} align = 'center'> 
                        Caso Não Queira Alterar um Campo, Basta Deixa-lo Em Branco. 
                    </h4>
                    <Form {...layout} name = 'nest-messages' onFinish = { this.handleSubmit }>
                        <Form.Item name = {'name'} label = 'Nome'>
                            <Input style = {{ width: 760 }}/>
                        </Form.Item>

                        <Form.Item name = {'username'} label = 'Usuário'>
                            <Input style = {{ width: 760 }}/>
                        </Form.Item>

                        <Form.Item name = {'sector'} label = 'Setor'>
                            <Input style = {{ width: 760 }}/>
                        </Form.Item>

                        <Form.Item name = {'ramal'} label = 'Ramal'>
                            <Input style = {{ width: 760 }}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type = 'primary' htmlType = 'submit' className = 'save' 
                                    style = {{ marginLeft: 360, marginBottom: 60 }}>
                                Alterar Informações
                            </Button>
                            <Button type = 'primary' htmlType = 'submit' 
                                    style = {{ marginLeft: 40, marginBottom: 60, fontWeight: 'bold' }}>
                                <Link to = { '/informacoes_usuario' }> Voltar </Link>
                            </Button>
                        </Form.Item>

                        <div className = 'upload'>
                            <input type = 'file' onChange = { this.fileSelectHandler }/>
                        </div>
                    </Form>
                </Content>
            </Content>
        );
    }
}

export default UserEdit;