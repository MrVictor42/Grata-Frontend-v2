import React, { Component } from 'react';
import { 
    Drawer, Form, Button, Col, Row, Input, Select, Transfer, Table, Tag, notification 
} from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import difference from 'lodash/difference';

import { getUserToken, getUsers } from '../../../store/user';
import { getSectors } from '../../../store/sector';
import { saveProject } from '../../../store/project';

const { Option } = Select;

class FormProjectCreate extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false,
            token: null,
            sectors: [],
            mockData: [],
            targetKeys: originTargetKeys,
            users: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    async componentDidMount() {
        const token = getUserToken();
        const sectors = await getSectors(token);
        const users = await getUsers(token);

        this.setState({ 
            sectors: sectors,
            token: token,
            users: users 
        });
    }

    async handleSubmit(values) {
        const token = this.state.token;
        const title = values.title;
        const sector = values.sector;
        const statusProject = 'Pendente';
        const project = {
            title: title,
            sector: sector,
            status: statusProject
        }
        const status = await saveProject(token, project);

        if(status !== false) {
            notification.open({ 
                type: 'success',
                message: 'Projeto Criado',
                description: `O Projeto ${ project.title } Foi Salvo Com Sucesso!`,
            });
            this.props.history.push('/lista_de_setores');
        } else {
            notification.open({ 
                type: 'error',
                message: 'Projeto Não Foi Criado',
                description: 'Não Foi Possível Cadastrar o Projeto! Tente Novamente!',
            });
            notification.open({
                type: 'info',
                message: 'Ação Requerida',
                description: 'Se o Problema Persistir, Entre em Contato Com o Desenvolvedor!',
            });
        }
    }

    onChange = nextTargetKeys => {
        this.setState({ targetKeys: nextTargetKeys });
      };
    
      triggerDisable = disabled => {
        this.setState({ disabled });
      };
    
      triggerShowSearch = showSearch => {
        this.setState({ showSearch });
      };

    showDrawer = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
    };
    
    render() {
        const { targetKeys } = this.state;
        let sector_data = { sectors: [] };
        let users_data = { users: [] };

        for(let aux = 0; aux < this.state.sectors.length; aux ++) {
            sector_data.sectors.push({
                key: this.state.sectors[aux].id,
                name: this.state.sectors[aux].name,
            });            
        }

        for(let aux = 0; aux < this.state.users.length; aux ++) {
            users_data.users.push({
                key: this.state.users[aux].id,
                name: this.state.users[aux].name,
                sector: [this.state.users[aux].sector]
            });
        }

        const CreateFormProject = () => {
            const [form] = Form.useForm();
            return(
                <Drawer
                    title = 'Registro de Projeto' onClose = { this.onClose } width = { 'auto' }
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
                                <SaveOutlined /> Cadastrar Projeto
                            </Button>
                        </div>
                    }
                >
                    <Form form = { form } hideRequiredMark layout = 'vertical'>
                        <Row gutter = { 20 }>
                            <Col span = { 16 }>
                                <Form.Item
                                    name = 'title' label = 'Nome do Projeto'
                                    rules = {[{ 
                                        required: true, 
                                        message: 'Por Favor, Insira o Nome do Projeto',
                                    }]}
                                >
                                    <Input maxLength = { 100 } placeholder = 'Insira o Nome do Projeto'/>
                                </Form.Item>
                            </Col>
                            <Col span = { 4 }>
                                <Form.Item
                                    name = 'status' label = 'Status do Projeto'
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
                                    name = 'sector' label = 'Setor' 
                                    rules = {[{ 
                                        required: true,
                                        message: 'Por Favor, Escolha o Setor', 
                                    }]}
                                >
                                    <Select>
                                        { sector_data.sectors.map(sector =>
                                            <Option value = { sector.key } key = { sector.key }> 
                                                { sector.name } 
                                            </Option> 
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter = { 24 }>
                            <Col span = { 24 }>
                                <TableTransfer
                                    dataSource={users_data.users}
                                    targetKeys={targetKeys}
                                    showSearch={true}
                                    onChange={this.onChange}
                                    filterOption={(inputValue, item) =>
                                        item.name.toLowerCase().indexOf(inputValue) !== -1 || item.sector.indexOf(inputValue) !== -1
                                    }
                                    leftColumns={leftTableColumns}
                                    rightColumns={rightTableColumns}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            );
        };
        return(
            <div>
                <span onClick = { this.showDrawer }> Adicionar Projeto </span>
                <CreateFormProject />
            </div>
        );
    }
}

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
  
        const rowSelection = {
          getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };
  
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
          />
        );
      }}
    </Transfer>
)

const mockTags = ['cat', 'dog', 'bird'];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
    tag: mockTags[i % 3],
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
  {
    dataIndex: 'name',
    title: 'Nome',
  },
  {
    dataIndex: 'sector',
    title: 'Setor',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'name',
    title: 'Name',
  },
  {
    dataIndex: 'sector',
    title: 'Setor',
  },
];

export default withRouter(FormProjectCreate);