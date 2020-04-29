import React, { Component } from 'react';
import { Layout, Button, Modal, message, Descriptions, Divider } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import UserPhoto from './UserPhoto';

import { getCurrentUser, getUserToken, getUserId, deleteUser } from '../../store/user';
import { getImage } from '../../store/images';
import { typeUser } from '../../services/userService';

const { Content } = Layout;
const { confirm } = Modal;

class UserDetail extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            image: null
        }

        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        let imageUser = null;

        if(user.image === null) {

        } else {
            imageUser = await getImage(token, user.image);
            this.setState({ image: imageUser.image });
        }

        this.setState({ currentUser: user });
    }

    showDeleteConfirm() {
        const { currentUser } = this.state;
        const name = currentUser.name;
        const userId = currentUser.id;
        const token = getUserToken();

        confirm ({
			title: 'Exclusão de Conta',
			content: 'Tem Certeza Que Deseja Excluir Sua Conta, Caro(a) ' + name  + '?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {
                deleteUser(token, userId);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Conta Excluída Com Sucesso!',
				});
				this.props.history.push('/')
			},
			onCancel() {
				message.info('Exclusão de Conta Cancelada Com Sucesso!');
			},
		});
    }

    render() {
        const { currentUser } = this.state;
        const type = typeUser(currentUser.is_administrator);
        return (
            <Content className = 'painelContent'>
                <h1 className = 'h1Content'> Informações Pré-Cadastradas de { currentUser.name } </h1>
                <Descriptions 
                    className = 'descriptionTitle'
                    column = {{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label = { <b> Nome de Usuário </b> }> 
                        { currentUser.username }
                    </Descriptions.Item>
                    
                    <Descriptions.Item label = { <b> Tipo de Usuário </b> }> 
                        { type }
                    </Descriptions.Item>
                    <Divider/>
                    
                    <Descriptions.Item label = { <b> Nome Completo </b> }> 
                        { currentUser.name } 
                    </Descriptions.Item>
                    
                    <Descriptions.Item label = { <b> Ramal </b> }> 
                        { currentUser.ramal }
                    </Descriptions.Item>
                    <br></br>
                    
                    <Descriptions.Item label = { <b> Setor </b> }> 
                        { currentUser.sector }
                    </Descriptions.Item>
                    <br></br>
                    <br></br>
                    
                    <Descriptions.Item label = { <b> Descrição </b> }> 
                        { currentUser.description }
                    </Descriptions.Item>
                </Descriptions>

                <Content style = {{ marginTop: 140, marginLeft: 178, marginBottom: -40 }}> 
                    <UserPhoto user = { currentUser } image = { this.state.image }/>
                </Content>
                
                <Content>
                    <Button 
                        type = 'ghost' className = 'edit' 
                        style = {{ marginLeft: 340, marginBottom: 60, marginTop: 15 }}>
                            <Link to = { '/edicao_usuario' }> Editar Informações </Link>
                    </Button>

                    <Button type = 'primary' style = {{ marginLeft: 20 }} danger 
                            onClick = { this.showDeleteConfirm }>
                        Excluir Usuário
                    </Button>
                </Content>
            </Content>
        );
    }
}

export default withRouter(UserDetail);