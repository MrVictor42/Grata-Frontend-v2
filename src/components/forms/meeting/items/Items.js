import React, { Component } from 'react';
import { Button } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';

class Items extends Component {
    render() {
        return (
            <Button>
                <OrderedListOutlined /> <b> Items </b>
            </Button>
        );
    }
}

export default Items;