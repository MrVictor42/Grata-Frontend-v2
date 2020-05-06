import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

class FormProjectDelete extends Component {

    render() {
        return (
            <Button type = 'primary' onClick = { this.handleSubmit } danger>
                <DeleteOutlined /> <b> Excluir </b> 
            </Button>
        );
    }
}

export default FormProjectDelete;