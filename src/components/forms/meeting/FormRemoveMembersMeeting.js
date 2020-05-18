import React, { Component } from 'react';
import { Button } from 'antd';
import { UsergroupDeleteOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';

class FormRemoveMembersMeeting extends Component {
    render() {
        return (
            <Button danger> 
                <UsergroupDeleteOutlined /> <b> Remover Membros </b> 
            </Button>
        );
    }
}

export default FormRemoveMembersMeeting;