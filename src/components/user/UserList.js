import React, { Component } from 'react';
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import { getUsers, getUserToken } from '../../store/user';
import { typeUser } from '../../services/userService';
import { getImage } from '../../store/images';

class UserList extends Component {

    state = {
        searchText: '',
        searchedColumn: '',
        users: []
    };

    async componentDidMount() {
        const token = getUserToken();
        const users = await getUsers(token);
        this.setState({ users: users });
    }

    // async componentDidMount() {
    //     const token = getUserToken();
    //     const users = await getUsers(token);
    //     let final_users = { users: [] }

    //     for(let aux = 0; aux < users.length; aux ++ ) {
    //         if(users[aux].image === null) {

    //         } else {
    //             users[aux].image = await getImage(token, users[aux].image);
    //         }
    //         final_users.users.push({
    //             key: users[aux].id,
    //             name: users[aux].name,
    //             email: users[aux].email,
    //             image: users[aux].image
    //         });
    //     }
    //     this.setState({ users: final_users });
    // }
    
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style = {{ padding: 8 }}>
                <Input
                    ref = { node => { this.searchInput = node }}
                    placeholder = {`Procure Por ${ dataIndex }`}
                    value = { selectedKeys[0] }
                    onChange = { e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter = {() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style = {{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type = 'primary'
                    onClick = {() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon = { <SearchOutlined /> }
                    size = 'small'
                    style ={{ width: 90, marginRight: 8 }}
                >
                    Procurar
                </Button>
                <Button 
                    onClick={() => this.handleReset(clearFilters)} 
                    size = 'small' 
                    style = {{ width: 90 }}
                >
                    Reiniciar
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style = {{ color: filtered ? 'red' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle = {{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords = {[ this.state.searchText] }
                autoEscape
                textToHighlight = { text.toString() }
            />
            ) : ( text )
        });
    
        handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
            });
        };
    
        handleReset = clearFilters => {
            clearFilters();
            this.setState({ searchText: '' });
        };

        render() {
            const columns = [{
                title: 'Nome',
                dataIndex: 'Nome',
                key: 'Nome',
                width: '20%',
                ...this.getColumnSearchProps('Nome'),
                },{
                    title: 'Email',
                    dataIndex: 'Email',
                    key: 'Email',
                    width: '20%',
                    ...this.getColumnSearchProps('Email'),
                },{
                    title: 'Setor',
                    dataIndex: 'Setor',
                    key: 'Setor',
                    width: '20%',
                    ...this.getColumnSearchProps('Setor'),
                },
                {
                    title: 'Ramal',
                    dataIndex: 'Ramal',
                    key: 'Ramal',
                    width: '10%',
                    ...this.getColumnSearchProps('Ramal'),
                },
                {
                    title: 'Permissão',
                    dataIndex: 'Permissao',
                    key: 'Permissao',
                    width: '10%',
                    ...this.getColumnSearchProps('Permissao'),
                },
                {
                    title: 'Opção',
                    key: 'option',
                    width: '10%',
                    render: (text, record) => (
                        <span>
                          <a style={{ marginRight: 16 }}>Invite {record.key}</a>
                        </span>
                    ),
                }
            ];
            let data = { users: [] };
            let typePermission = null;

            for(let aux = 0; aux < this.state.users.length; aux ++) {
                typePermission = typeUser(this.state.users[aux].is_administrator);
                data.users.push({
                    key: this.state.users[aux].id,
                    Nome: this.state.users[aux].name,
                    Email: this.state.users[aux].email,
                    Ramal: this.state.users[aux].ramal,
                    Setor: 'Não Feito',
                    Permissao: typePermission
                });
            }
        return (
            <Table 
                columns = { columns } className = 'userList' 
                dataSource = { data.users } pagination = {{ defaultPageSize: 5 }} 
            />
        )
    }
}

export default UserList;