import React, { Component } from 'react';
import { Drawer, Button, Transfer, Table, notification } from 'antd';
import { SaveOutlined, StopOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import difference from 'lodash/difference';

import { getUserToken, getUserNotInProject } from '../../../store/user';
import { addUsersProject } from '../../../store/project';
import { sort } from '../../../services/sortService';

class FormAddUsersProject extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			showSearch: true,
			visible: false, 
			targetKeys: [],
			users: [],
			token: null
		}

		this.showDrawer = this.showDrawer.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
        const token = getUserToken();
		const projectID = this.props.project.key;
		const users = await getUserNotInProject(token, projectID);

        this.setState({ 
			users: users,
			token: token 
		});
    }
	
    showDrawer = () => {
      	this.setState({ visible: true });
    };
  
    onClose = () => {
      	this.setState({ visible: false });
    };
  
    onChange = nextTargetKeys => {
        this.setState({ targetKeys: nextTargetKeys });
	};

	async handleSubmit() {
		if(this.state.targetKeys === undefined || this.state.targetKeys.length === 0) {
			notification.open({
				type: 'warning',
				message: 'Nenhuma Pessoa Selecionado',
                description: 'Por Favor, Adicione Pelo Menos Uma Pessoa ao Projeto',
			});
		} else {
			const token = this.state.token;
			const users = [];
			const idProject = this.props.project.key;
			const sector = this.props.sector.id;
			let status = null;

			for(let aux = 0; aux < this.state.targetKeys.length; aux ++) {
				users.push({ id: this.state.targetKeys[aux] });
			}

			const project = {
				projectID: idProject,
				sector: sector,
				title: this.props.project.title,
				status: this.props.project.status,
				users
			};

			status = await addUsersProject(token, project);

			if(status === true) {
				notification.open({
					type: 'success',
					message: 'Membros Adicionados',
					description: 'Os Usuários Foram Adicionados ao Projeto Com Sucesso!',
				});
				notification.open({
					type: 'info',
					message: 'Ação Requerida',
					description: 'Por Favor, Atualize a Página!',
				});
				this.props.history.push(`/setor/${ this.props.sector.slug }`);
			} else {
				notification.open({
					type: 'error',
					message: 'Erro ao Adicionar Membros',
					description: 'Erro Inesperado... Não Foi Possível Adicionar ' +  
								 'os Usuários ao Projeto!',
				});
				notification.open({
					type: 'info',
					message: 'Ação Requerida',
					description: 'Caso o Erro Persista, Entre em Contato Com o Desenvolvedor!',
				});
				this.props.history.push(`/setor/${ this.props.sector.slug }`);
			}
		}
	}
    
    render() {
		const { targetKeys, showSearch } = this.state;
		let users_data = { users: [] };

		for(let aux = 0; aux < this.state.users.length; aux ++) {
			users_data.users.push({
				key: this.state.users[aux].id,
				name: this.state.users[aux].name,
				sector: [this.state.users[aux].sector]
			});
		}

        users_data.users.sort(sort('name'));

		return (
			<div>
				<Button type = 'primary' onClick = { this.showDrawer } ghost>
					<UsergroupAddOutlined /> <b> Adicionar Membros </b>
				</Button>
				<Drawer
					title = { `Adicionar Usuários no Projeto: ${ this.props.project.title }` }
					width = { 'auto' }
					closable = { false }
					onClose = { this.onClose }
					visible = { this.state.visible }
					footer = { 
                        <div style = {{ textAlign: 'center' }}>
                            <Button onClick = { this.onClose } style = {{ marginRight: 8 }}>
                                <StopOutlined /> Cancelar
                            </Button>
                            <Button onClose = { this.onClose } type = 'primary' 
								onClick = { this.handleSubmit }
							>
                                <SaveOutlined /> Cadastrar Membros no Projeto
                            </Button>
                        </div>
                    }
				>
					<TableTransfer
						dataSource = { users_data.users }
						targetKeys = { targetKeys }
						operations = {[ 'Adicionar Usuários', 'Não Adicionar' ]}
						onChange = { this.onChange }
						showSearch = { showSearch }
						filterOption = {( inputValue, item ) =>
							item.name.toLowerCase().indexOf(inputValue) !== -1 || 
							item.sector.toString().toLowerCase().indexOf(inputValue) !== -1
						}
						leftColumns =  {[
							{
								dataIndex: 'name',
								title: 'Nome',
							},
							{
								dataIndex: 'sector',
								title: 'Setor',
							},
						]}
						rightColumns = {[
							{
								dataIndex: 'name',
								title: 'Nome',
							},
							{
								dataIndex: 'sector',
								title: 'Setor',
							},
						]}
					/>
				</Drawer>
			</div>
      	);
    }
}

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll = { false }>
      	{({
			direction, filteredItems, onItemSelectAll,
			onItemSelect, selectedKeys: listSelectedKeys, disabled: listDisabled,
      	}) => {
        	const columns = direction === 'left' ? leftColumns : rightColumns;
			const rowSelection = {
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
					rowSelection = { rowSelection }
					columns = { columns }
					dataSource = { filteredItems }
					size = 'small'
					pagination = {{ defaultPageSize: 6 }}
					style = {{ pointerEvents: listDisabled ? 'none' : null }}
					onRow = {({ key }) => ({
						onClick: () => {
							onItemSelect(key, !listSelectedKeys.includes(key));
						},
					})}
				/>
			);
		}}
    </Transfer>
);
  
export default withRouter(FormAddUsersProject);