import React, { Component } from 'react';
import { Drawer, Button, Transfer, Table } from 'antd';
import difference from 'lodash/difference';

import { getUserToken, getUsers } from '../../../store/user';
import { sort } from '../../../services/sortService';

class FormAddUsersProject extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			showSearch: true,
			visible: false, 
			targetKeys: [],
			users: []
		}

		this.showDrawer = this.showDrawer.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	async componentDidMount() {
        const token = getUserToken();
		const users = await getUsers(token);

        this.setState({ users: users });
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
    
    render() {
		const { targetKeys, showSearch } = this.state;
		console.log(this.state.users)
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
					Adicionar Membros
				</Button>
				<Drawer
					title = { `Adicionar/Remover Usuários do Projeto: ${ this.props.project.title }` }
					width = { 'auto' }
					closable = { false }
					onClose = { this.onClose }
					visible = { this.state.visible }
				>
					<TableTransfer
						dataSource = { users_data.users }
						targetKeys = { targetKeys }
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
  
export default FormAddUsersProject;