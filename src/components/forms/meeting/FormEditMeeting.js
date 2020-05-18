import React, { Component } from 'react';
import { Button } from 'antd';
import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';

class FormEditMeeting extends Component {
    render() {
        return (
            <Button type = 'default' className = 'edit' onClick = { this.showDrawer }> 
                <EditOutlined/> Editar 
            </Button>
        );
    }
}

export default FormEditMeeting;