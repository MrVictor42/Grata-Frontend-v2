import React, { Component } from 'react';
import { Modal, Button, notification } from 'antd';
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
                notification.open({ 
                    type: 'success',
                    message: 'Setor Excluído',
                    description: 'Setor Excluído Com Sucesso!',
                });
                notification.open({
                    type: 'info',
                    message: 'Ação Requerida',
                    description: 'Por Favor, Atualize a Página!',
                });
			},
			onCancel() {
                notification.open({
                    type: 'info',
                    message: 'Ação Cancelada',
                    description: 'Exclusão de Setor Cancelada Com Sucesso!',
                });
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