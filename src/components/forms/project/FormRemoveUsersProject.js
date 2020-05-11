import React, { Component } from 'react';
import { Button } from 'antd';
import { UsergroupDeleteOutlined } from '@ant-design/icons';

class FormRemoveUserProject extends Component {
    render() {
        return (
            <Button danger> 
                <UsergroupDeleteOutlined /> Remover Membros 
            </Button>
        )
    }
}

export default FormRemoveUserProject;