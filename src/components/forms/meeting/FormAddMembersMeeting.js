import React, { Component } from 'react'
import { Button } from 'antd';
import { SaveOutlined, StopOutlined, UsergroupAddOutlined } from '@ant-design/icons';

class FormAddMembersMeeting extends Component {
    render() {
        return (
            <Button type = 'primary' ghost>
                <UsergroupAddOutlined /> <b> Adicionar Membros </b>
            </Button>
        );
    }
}

export default FormAddMembersMeeting;