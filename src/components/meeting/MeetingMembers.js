import React, { Component } from 'react';
import { Drawer, Button, List, Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons'; 

class MeetingMembers extends Component {
    render() {
        return (
            <Button>
                <EyeOutlined /> <b> Membros da Reunião </b> 
            </Button>
        );
    }
}

export default MeetingMembers;
