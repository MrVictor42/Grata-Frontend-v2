import React, { Component } from 'react';
import { Button, Drawer } from 'antd';
import { CommentOutlined, StopOutlined } from '@ant-design/icons';

import NewComment from '../../forms/meeting/comments/FormCommentCreate';
import CommentList from './CommentList';

export class Comment extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    
    showDrawer = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <span>
                <Button onClick = { this.showDrawer }>
                    <b><CommentOutlined /> Comentários </b>
                </Button>
                <Drawer
                    title = { `Comentários da Reunião: ${ this.props.meeting.title }` }
                    width = { 'auto' }
					closable = { true }
					onClose = { this.onClose }
					visible = { this.state.visible }
					footer = { 
                        <div style = {{ textAlign: 'center' }}>
                            <Button onClick = { this.onClose } style = {{ marginRight: 8 }}>
                                <StopOutlined /> Fechar
                            </Button>
                        </div>
                    }
				>
                    <NewComment meeting = { this.props.meeting }/>
                    <CommentList meeting = { this.props.meeting }/>
                </Drawer>
            </span>
        );
    }
}

export default Comment;