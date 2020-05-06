import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

class FormProjectEdit extends Component {

    render() {
        return(
            <div>
                <Button type = 'default' className = 'edit' onClick = { this.showDrawer }> 
                    <EditOutlined/> Editar 
                </Button>
            </div>
        );
    }
}

export default FormProjectEdit;