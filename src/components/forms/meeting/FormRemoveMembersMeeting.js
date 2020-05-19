import React, { Component } from 'react';
import { Drawer, Button, Transfer, Table, notification } from 'antd';
import { UsergroupDeleteOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import difference from 'lodash/difference';

import { getUserToken, getUsersInMeeting } from '../../../store/user';
import { removeUsersMeeting } from '../../../store/meeting';
import { sort } from '../../../services/sortService';

class FormRemoveMembersMeeting extends Component {

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
        const projectID = this.props.meeting.project;
        const meetingID = this.props.meeting.key;
		const users = await getUsersInMeeting(token, meetingID, projectID);

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

    async handleSubmit(values) {
        if(this.state.targetKeys === undefined || this.state.targetKeys.length === 0) {
			notification.open({
				type: 'warning',
				message: 'Nenhuma Pessoa Selecionada!',
				description: 'Por Favor, Adicione Pelo Menos Uma Pessoa Para Remover da Reunião! ' + 
							 'Ou Cancele Esta Ação de Retirar Usuário do Reunião!',
			});
		} else {
            const token = this.state.token;
			const users = [];
			const projectID = this.props.meeting.project;
            const meetingID = this.props.meeting.key;
            const initial_date = this.props.meeting.initial_date;
            const initial_hour = this.props.meeting.initial_hour;
            const subject_matter = this.props.meeting.subject_matter;
            const userID = this.props.meeting.userID;
            const title = this.props.meeting.title;
			let status = null;

			for(let aux = 0; aux < this.state.targetKeys.length; aux ++) {
				users.push({ id: this.state.targetKeys[aux] });
            }
            
            const meeting = {
                meetingID: meetingID,
                status: 'Pendente',
                userID: userID,
                projectID: projectID,
                title: title,
                subject_matter: subject_matter,
                initial_date: initial_date,
                initial_hour: initial_hour,
                users
            };

			status = await removeUsersMeeting(token, meeting);

			if(status === true) {
				notification.open({
					type: 'success',
					message: 'Membros Removidos!',
					description: 'Os Usuários Foram Removidos da Reunião Com Sucesso!',
				});
				notification.open({
					type: 'info',
					message: 'Ação Requerida!',
					description: 'Por Favor, Atualize a Página!',
				});
			} else {
				notification.open({
					type: 'error',
					message: 'Erro ao Remover Membros!',
					description: 'Erro Inesperado... Não Foi Possível Remover ' +  
								 'os Usuários da Reunião!',
				});
				notification.open({
					type: 'info',
					message: 'Ação Requerida!',
					description: 'Caso o Erro Persista, Entre em Contato Com o Desenvolvedor!',
				});
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
            <span>
                <Button onClick = { this.showDrawer } danger> 
                    <UsergroupDeleteOutlined /> <b> Remover Membros </b> 
                </Button>
                <Drawer
					title = { `Remover Usuários da Reunião: ${ this.props.meeting.title }` }
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
                                <SaveOutlined /> Remover Membros da Reunião
                            </Button>
                        </div>
                    }
				>
                    <TableTransfer
						dataSource = { users_data.users }
						targetKeys = { targetKeys }
						operations = {[ 'Remover Usuários', 'Não Remover' ]}
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
            </span>
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

export default FormRemoveMembersMeeting;