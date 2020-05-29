import React, { Component } from 'react';
import { Layout, Descriptions, Divider } from 'antd';

import UserPhoto from './UserPhoto';
import FormUserEdit from '../forms/user/FormUserEdit';
import FormUserDelete from '../forms/user/FormUserDelete';

import { getCurrentUser, getUserToken, getUserId } from '../../store/user';
import { getImage } from '../../store/images';
import { typeUser } from '../../services/userService';

const { Content } = Layout;

class UserDetail extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            image: null
        }
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

    render() {
        const { currentUser } = this.state;
        const type = typeUser(currentUser.is_administrator);
        return (
            <div className = 'itemsatuais'>
                <h1 className = 'h1Content'> Informações Pré-Cadastradas de { currentUser.name } </h1>
                <div className = 'item'>
                    <Content className = 'painelContent'>
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
                    </Content>

                    <Content className = 'contentBottomEdit'>
                        <FormUserEdit user = { currentUser } />
                    </Content>

                    <Content className = 'contentBottomDelete'>
                        <FormUserDelete user = { currentUser } />
                    </Content>
                </div>
                <div class = 'item2'>
                     <Content> 
                        <UserPhoto user = { currentUser } image = { this.state.image }/>
                     </Content>
                </div>
            </div>
        );
    }
}

export default UserDetail;