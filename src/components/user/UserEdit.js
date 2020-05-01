import React, { Component } from 'react';
import { Layout, Input, Button, Form, message, Drawer, Col, Row, Divider, Select, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import UserPhoto from './UserPhoto';

import { getCurrentUser, getUserId, getUserToken, updateUser } from '../../store/user';
import { saveImage, editImage, getImage } from '../../store/images';
import { getSectors } from '../../store/sector';
import { validateUpdate, typeUser } from '../../services/userService';
import { sort } from '../../services/sortService';

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

class UserEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            sectors: [],
            visible: false,
            image: null,
            selectedFile: null,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const sectors = await getSectors(token);
        const user = await getCurrentUser(token, userId);
        let imageUser = null;
        let final_sector = { sector: [] };
        
        if(user.image === null) {

        } else {
            imageUser = await getImage(token, user.image);
            this.setState({ image: imageUser.image });
        }

        for(let aux = 0; aux < sectors.length; aux ++) {
            final_sector.sector.push({
                id: sectors[aux].id,
                name: sectors[aux].name,
            });
        }

        this.setState({ 
            currentUser: user,
            sectors: final_sector.sector 
        });
    };

    showDrawer = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
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

        let user = {
            id: currentUser.id,
            email: currentUser.email,
            username: currentUser.username,
            ramal: values.ramal,
            name: values.name,
            sector: values.sector,
            is_administrator: currentUser.is_administrator,
            is_participant: !currentUser.is_administrator,
            description: values.description,
            image: imageID
        };

        user = validateUpdate(user, currentUser);
        const status = await updateUser(token, user);
        if(status === true) {
            this.props.history.push('/informacoes_usuario');
            message.success('Informações Atualizadas com Sucesso!');
        } else {
            this.props.history.push('/informacoes_usuario');
            message.error('Houve um Erro ao Atualizar as Informações do Usuário');
        }
    }

    render() {
        const { currentUser } = this.state;
        const layout = { labelCol: { span: 3, }, wrapperCol: { span: 14, }, };
        const type = typeUser(currentUser.is_administrator);
        let data = { sectors: [] };

        for(let aux = 0; aux < this.state.sectors.length; aux ++) {
            data.sectors.push({
                key: this.state.sectors[aux].id,
                name: this.state.sectors[aux].name,
            });
        }

        data.sectors.sort(sort('name'));
        return (
            <div>
                <Button type = 'ghost' className = 'edit' onClick = { this.showDrawer }> 
                    Editar Informação 
                </Button>

                <Drawer
                    title = { `Edição da Conta de ${ currentUser.name }` }
                    width = { 720 } onClose = { this.onClose } visible = { this.state.visible }
                    bodyStyle={{ paddingBottom: 80 }}
                    footer = {
                        <div style ={{ textAlign: 'center' }}>
                            <Button onClick = { this.onClose } style = {{ marginRight: 8 }}>
                                Cancelar
                            </Button>
                            <Button onClick = { this.onClose } type = 'primary'>
                                Salvar Alterações
                            </Button>
                        </div>
                    }
                >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="url"
                  label="Url"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Owner"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
            </div>
            
            // <Content className = 'painelContent'>
            //     <h1 className = 'h1Content'> Informações Pré-Cadastradas de { currentUser.name } </h1>
            //     <Descriptions 
            //         className = 'descriptionTitle'
            //         column = {{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            //     >
            //         <Descriptions.Item label = { <b> Nome de Usuário </b> }> 
            //             { currentUser.username }
            //         </Descriptions.Item>
                    
            //         <Descriptions.Item label = { <b> Tipo de Usuário </b> }> 
            //             { type }
            //         </Descriptions.Item>
            //         <Divider/>
                    
            //         <Descriptions.Item label = { <b> Nome Completo </b> }> 
            //             { currentUser.name } 
            //         </Descriptions.Item>
                    
            //         <Descriptions.Item label = { <b> Ramal </b> }> 
            //             { currentUser.ramal }
            //         </Descriptions.Item>
            //         <br></br>
                    
            //         <Descriptions.Item label = { <b> Setor </b> }> 
            //             { currentUser.sector }
            //         </Descriptions.Item>
            //         <br></br>
            //         <br></br>
                    
            //         <Descriptions.Item label = { <b> Descrição </b> }> 
            //             { currentUser.description }
            //         </Descriptions.Item>
            //     </Descriptions>

            //     <Content style = {{ marginTop: 100, marginLeft: 178, marginBottom: -40 }}> 
            //         <UserPhoto user = { currentUser } image = { this.state.image }/>
            //     </Content>

            //     <Content>
            //         <h1 className = 'h1Content'> 
            //             Informações a Serem Cadastradas de { currentUser.name } 
            //         </h1>
            //         <h4 style = {{ color: 'red', marginLeft: -180 }} align = 'center'> 
            //              Caso Não Queira Alterar um Campo, Basta Deixa-lo Em Branco. 
            //          </h4>
            //         <Form {...layout} name = 'nest-messages' onFinish = { this.handleSubmit }>
            //             <Form.Item name = {'name'} label = 'Nome'>
            //                 <Input style = {{ width: 760 }}/>
            //             </Form.Item>

            //             <Form.Item name = {'username'} label = 'Usuário'>
            //                 <Input style = {{ width: 760 }}/>
            //             </Form.Item>

            //             <Form.Item name = {'sector'} label = 'Setor'>
            //                 <Select style = {{ width: 760 }}>
            //                     { data.sectors.map(sector =>
            //                         <Option value = { sector.key } key = { sector.key }> 
            //                             { sector.name } 
            //                         </Option> 
            //                     )}
            //                 </Select>
            //             </Form.Item>

            //             <Form.Item name = {'ramal'} label = 'Ramal'>
            //                 <Input style = {{ width: 760 }}/>
            //             </Form.Item>

            //             <Form.Item name = { 'description' } label = 'Descrição (opcional)' 
            //                 rules = {[{ required: false, maxLength: 500 }]} 
            //             >   
            //                 <TextArea rows = { 4 } style = {{ width: 760 }} maxLength = { 500 }/>
            //             </Form.Item>

            //             <Form.Item>
            //                 <Button type = 'primary' htmlType = 'submit' className = 'save' 
            //                         style = {{ marginLeft: 420, marginBottom: 60 }}>
            //                     Alterar Informações
            //                 </Button>
            //                 <Button type = 'primary' htmlType = 'submit' 
            //                         style = {{ marginLeft: 40, marginBottom: 60, fontWeight: 'bold' }}>
            //                     <Link to = { '/informacoes_usuario' }> Voltar </Link>
            //                 </Button>
            //             </Form.Item>

            //             <div className = 'upload'>
            //                 <input type = 'file' onChange = { this.fileSelectHandler }/>
            //             </div>
            //         </Form>
            //     </Content>
            // </Content>
        );
    }
}

export default UserEdit;