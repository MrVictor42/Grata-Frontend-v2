import React, { Component } from 'react';
import { Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

export class Comment extends Component {
    render() {
        return (
            <span>
                <Button>
                    <b><CommentOutlined /> Comentários </b>
                </Button>
            </span>
        );
    }
}

export default Comment;