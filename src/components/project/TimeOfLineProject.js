import React, { Component } from 'react';
import { Button } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';

class TimeOfLineProject extends Component {
    render() {
        return (
            <Button className = 'save'>
                <FieldTimeOutlined /> <b> Linha do Tempo </b>
            </Button>
        )
    }
}

export default TimeOfLineProject;