import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { getUserToken } from '../../../store/user';
import { deleteSector } from '../../../store/sector';

const { confirm } = Modal;

class SectorDelete extends Component {

    constructor(props) {
        super(props)
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const token = getUserToken();
        const sectorID = this.props.sector.key;
        const nameSector = this.props.sector.name;

        confirm ({
			title: 'Exclusão de Setor',
			content: `Tem Certeza Que Deseja Excluir o Setor: ${ nameSector } ?`,
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {
                deleteSector(token, sectorID);
                message.success('Setor Excluído Com Sucesso!');
                message.info('Atualize Esta Página!');
			},
			onCancel() {
                message.info('Ação de Exclusão de Setor Cancelada');
			},
		});
    }

    render() {
        return (
            <Button type = 'primary' onClick = { this.handleSubmit } danger>
                <DeleteOutlined /> <b> Excluir </b> 
            </Button>
        );
    }
}

export default SectorDelete;