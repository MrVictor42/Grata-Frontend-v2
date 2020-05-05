import React, { Component } from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

class SectorMembers extends Component {

    render() {
        return (
            <Button type = 'primary'> 
                <EyeOutlined /> <b> Ver Membros </b> 
            </Button>
        );
    }
}

export default SectorMembers;