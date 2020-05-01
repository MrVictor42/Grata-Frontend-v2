import React, { Component } from 'react';
import { Input, Button, Form, message, Drawer, Col, Row, Select, InputNumber } from 'antd';
import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';

import { getCurrentUser, getUserId, getUserToken, updateUser } from '../../../store/user';
import { saveImage, editImage, getImage } from '../../../store/images';
import { getSectors } from '../../../store/sector';
import { validateUpdate, typeUser, typeUserValidate } from '../../../services/userService';
import { sort } from '../../../services/sortService';

const { Option } = Select;

class FormUserEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            sectors: [],
            sectorID: null,
            visible: false,
            image: null,
        }

        global.image = null;
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const sectors = await getSectors(token);
        let user = this.props.user;
        console.log(user)
        let imageUser = null;
        let final_sector = { sector: [] };
        
        if(user.image === null) {

        } else {
            imageUser = await getImage(token, user.image);
            this.setState({ image: imageUser.image });
        }

        for(let aux = 0; aux < sectors.length; aux ++) {
            if(user.sector === null) {

            } else {
                if(user.sector === sectors[aux].name) {
                    this.setState({ sectorID: sectors[aux].id });
                }
            }
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
            global.image = file;
        } else {
            
        }
    }

    async handleSubmit(values) {
        const token = getUserToken();
        const { currentUser } = this.state;
        const image = new FormData();
        const type = typeUserValidate(values.type);
        let imageUser = null;
        let imageID = '';
        let sector = values.sector;

        if(global.image === null) {

        } else {
            if(currentUser.image !== null) {
                imageID = currentUser.image;
                image.append('image', global.image, global.image.name);
                imageUser = await editImage(token, image, imageID);
            } else {
                image.append('image', global.image, global.image.name);
                imageUser = await saveImage(token, image);
                imageID = imageUser.id;
            }
        }

        if(sector === undefined || sector === null) {
            sector = this.state.sectorID;
        } else {

        }

        let user = {
            id: currentUser.id,
            email: currentUser.email,
            username: currentUser.username,
            ramal: values.ramal,
            name: values.name,
            sector: sector,
            is_administrator: type,
            is_participant: !type,
            description: values.description,
            image: imageID
        };

        user = validateUpdate(user, currentUser);
        const status = await updateUser(token, user);
        global.image = null;
        if(status === true) {
            message.success('Informações Atualizadas com Sucesso!');
            message.info('Atualize a Página');
        } else {
            message.error('Houve um Erro ao Atualizar as Informações do Usuário');
        }
    }

    render() {
        const { currentUser } = this.state;
        const type = typeUser(currentUser.is_administrator);
        let data = { sectors: [] };

        for(let aux = 0; aux < this.state.sectors.length; aux ++) {
            data.sectors.push({
                key: this.state.sectors[aux].id,
                name: this.state.sectors[aux].name,
            });
        }

        data.sectors.sort(sort('name'));
        const FormUserEdit = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = { `Edição da Conta de ${ currentUser.name }` }
                    width = { 720 } onClose = { this.onClose } visible = { this.state.visible }
                    bodyStyle = {{ paddingBottom: 80 }}
                    footer = {
                        <div style ={{ textAlign: 'center' }}>
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
                                <SaveOutlined /> Salvar Alterações
                            </Button>
                        </div>
                    }
                >
                    <h4 style = {{ color: 'red', marginLeft: 30 }} align = 'center'> 
                        Caso Não Queira Alterar um Campo, Basta Deixa-lo Em Branco. 
                    </h4>
                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 16 }>
                            <Col span = { 12 }>
                                <Form.Item 
                                    name = 'name' label = 'Nome' rules = {[{ required: false }]}
                                >
                                    <Input maxLength = { 40 } />
                                </Form.Item>
                            </Col>

                            <Col span = { 4 }>
                                <Form.Item
                                    name = 'ramal' label = 'Ramal' rules = {[{ required: false }]}
                                >
                                    <InputNumber maxLength = { 6 } />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 16 }>
                            {
                                type === 'Administrador' ? (
                                    <Col span = { 8 }>
                                        <Form.Item 
                                            name = 'type' label = 'Tipo de Usuário' 
                                            rules = {[{ required: false }]}
                                        >
                                            <Select>
                                                <Option key = '1' value = { 'Administrador' }> 
                                                    Administrador 
                                                </Option>
                                                <Option key = '2' value = { 'Participante' }>
                                                    Participante
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                ): null
                            }
                        </Row>
                        
                        <Row gutter = { 18 }>
                            <Col span = { 18 }>
                                <Form.Item
                                    name = 'sector' label = 'Setor' rules = {[{ required: false }]}
                                >
                                    <Select>
                                        { data.sectors.map(sector =>
                                            <Option value = { sector.key } key = { sector.key }> 
                                                { sector.name } 
                                            </Option> 
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <input type = 'file' onChange = { this.fileSelectHandler }/>

                        <Row gutter = { 16 }>
                            <Col span = { 24 }>
                                <Form.Item 
                                    name = 'description' label = 'Descrição'
                                    rules = {[{ required: false }]}
                                >
                                    <Input.TextArea rows = { 4 } maxLength = { 500 } />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        }

        return(
            <div>
                <Button type = 'ghost' className = 'edit' onClick = { this.showDrawer }> 
                    <EditOutlined /> Editar Informação 
                </Button>
                <FormUserEdit />
            </div>
        );
    }
}

export default FormUserEdit;