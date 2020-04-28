import React, { Component } from 'react';
import { List } from 'antd';

import FormSectorEdit from '../forms/sector/FormSectorEdit';

import SectorDelete from './SectorDelete';
import SectorMembers from './SectorMembers';
import SectorDetail from './SectorDetail';

import { getSectors } from '../../store/sector';
import { getUserToken, getUserId, getCurrentUser } from '../../store/user';
import { typeUser } from '../../services/userService';
import { sort } from '../../services/sortService';

class SectorList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
            sectors: []
		}
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        const sectors = await getSectors(token);
        let final_sector = { sector: [] };

        for(let aux = 0; aux < sectors.length; aux ++) {
            final_sector.sector.push({
                id: sectors[aux].id,
                name: sectors[aux].name,
                initials: sectors[aux].initials,
                slug: sectors[aux].slug,
            });
        }

        this.setState({
            currentUser: user, 
            sectors: final_sector.sector
        });
	}

    render() {
        const { currentUser } = this.state;
        const type = typeUser(currentUser.is_administrator);
        let data = { sectors: [] };

        for(let aux = 0; aux < this.state.sectors.length; aux ++) {
            data.sectors.push({
                key: this.state.sectors[aux].id,
                name: this.state.sectors[aux].name,
                initials: this.state.sectors[aux].initials,
                slug: this.state.sectors[aux].slug,
            });
        }

        data.sectors.sort(sort('name'));
        return (
            <div>
                {
                    type !== 'Administrador' ? (
                        <List
                            dataSource = { data.sectors } pagination = {{ defaultPageSize: 4 }} 
                            bordered className = 'userList'
                            renderItem = { sector => (
                                <List.Item
                                    key = { sector.key } 
                                    actions = {[
                                        <SectorDetail sector = { sector } />,
                                        <SectorMembers sector = { sector } />
                                    ]}
                                >
                                    <List.Item.Meta 
                                        title = { sector.initials } description = { sector.name } />
                                    <SectorMembers sector = { sector } />
                                </List.Item>
                            )}
                        /> 
                    ) : (
                        <List
                            dataSource = { data.sectors } pagination = {{ defaultPageSize: 4 }} 
                            bordered className = 'userList'
                            renderItem = { sector => (
                                <List.Item
                                    key = { sector.key } 
                                    actions = {[ 
                                        <SectorDetail sector = { sector } />,
                                        <SectorMembers sector = { sector } />,
                                        <FormSectorEdit sector = { sector } />,
                                        <SectorDelete sector = { sector } />,
                                    ]}
                                >
                                    <List.Item.Meta 
                                        title = { sector.initials } description = { sector.name } />
                                </List.Item>
                            )}
                        /> 
                    )
                }
          	</div>
        );
    }
}

export default SectorList;