import React, { Component } from 'react';
import { Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

class MeetingDetail extends Component {
    render() {
        return (
            <Button className = 'save'>
                <CaretRightOutlined/> <b> Começar Reunião </b>
            </Button>
        );
    }
}

export default MeetingDetail;