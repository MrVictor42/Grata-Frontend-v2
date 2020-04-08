import React, { Component } from 'react';
import { Layout, Input, Button, Form, Card, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import DefaultUser from '../../img/default_user.png';
import { Link } from 'react-router-dom'

import { getCurrentUser, getUserId, getUserToken, updateUser } from '../../store/actions/user';
import { validateUpdate } from '../../services/userService';
import { typeUser } from '../../services/userService';

const { Content } = Layout;
const { Meta } = Card;

class UserEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

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

    handleChange = info => {
        if (info.file.status === 'Carregando') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'Pronto') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({ imageUrl, loading: false })
            );
        }
    };
    
    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    };

    handleSubmit = values => {
        const token = getUserToken();
        const { currentUser } = this.state;
        let user = {
            id: currentUser.id,
            email: currentUser.email,
            username: currentUser.username,
            ramal: values.ramal,
            name: values.name,
            is_administrator: currentUser.is_administrator,
            is_participant: !currentUser.is_administrator,
        }

        user = validateUpdate(user, currentUser);
        if(updateUser(token, user) === undefined) {
            message.success('Informações Alteradas Com Sucesso!');
            this.props.history.push('/informacoes_usuario');
        } else {
            message.error('Algo de Ruim Aconteceu! Tente Novamente.')
            this.props.history.push('/edicao_usuario');
        }
    };

    render() {
        const { currentUser } = this.state;
        const layout = { labelCol: { span: 3, }, wrapperCol: { span: 14, }, };
        const type = typeUser(currentUser.is_administrator);
        const uploadButton = (
            <div>
                { this.state.loading ? <LoadingOutlined /> : <PlusOutlined /> }
                <div className = 'ant-upload-text'> Carregar Imagem </div>
            </div>
          );
          const { imageUrl } = this.state;
        return (
            <Content className = 'painelContent'>
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
                <Card
                    cover = { <img alt = 'avatar' src = { DefaultUser } /> }
                    hoverable 
                    className = 'imgAvatar'
                >
                    <Meta title = 'Foto do Usuário' description = 'Essa é Sua Foto de Usuário' />
                </Card>

                <Content>
                <h1 className = 'h1User'> Informações a Serem Alteradas </h1>
                <h4 style = {{ color: 'red', marginLeft: -80 }} align = 'center'> 
                    Caso Não Queira Alterar um Campo, Basta Deixa-lo Em Branco. 
                </h4>
                    <Form {...layout} name = 'nest-messages' onFinish = { this.handleSubmit }>
                        <Form.Item name = {'name'} label = 'Nome'>
                            <Input />
                        </Form.Item>

                        <Form.Item name = {'username'} label = 'Usuário'>
                            <Input />
                        </Form.Item>

                        <Form.Item name = {'sector'} label = 'Setor'>
                            <Input />
                        </Form.Item>

                        <Form.Item name = {'ramal'} label = 'Ramal'>
                            <Input />
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

                        <Upload 
                            name = 'avatar' listType = 'picture-card' className = 'upload'
                            showUploadList = { false } 
                            action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                            beforeUpload = { this.beforeUpload }
                            onChange = { this.handleChange }
                        >
                            { imageUrl ? 
                                <img 
                                    src = { imageUrl } alt = 'avatar' 
                                    style = {{ width: '100%' }} /> : uploadButton
                            }
                        </Upload>
                    </Form>
                </Content>
            </Content>
        );
    }
}

export default UserEdit;