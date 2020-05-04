import React, { Component } from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

class SectorDetail extends Component {
    
    render() {
        return (
            <Button type = 'primary'> 
                <EyeOutlined /> <b> Ver Projetos </b> 
            </Button>
        );
    }
}

export default SectorDetail;