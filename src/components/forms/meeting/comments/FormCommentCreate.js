import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, Input } from 'antd';

import DefaultUser from '../../../../img/default_user.jpg';
import { getCurrentUser, getUserToken, getUserId } from '../../../../store/user';
import { getImage } from '../../../../store/images';
import { saveComment } from '../../../../store/comments';

const { TextArea } = Input;

class FormCommentCreate extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            value: null,
            token: null,
            currentUser: {},
            submitting: false
        }
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        let imageUser = null;

        if(user.image === null) {
            user.image = DefaultUser;
        } else {
            imageUser = await getImage(token, user.image);
            user.image = imageUser.image;
        }

        this.setState({ 
            currentUser: user,
            token: token
        });
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        } else {
            this.setState({ submitting: true });

            const userID = this.state.currentUser.id;
            const questtionaireID = this.props.questtionaireID;
            const description = this.state.value;
            const token = this.state.token;

            const comments = {
                questtionaire: questtionaireID,
                user: userID,
                description: description
            };

            saveComment(token, comments);

            setTimeout(() => {
                this.setState({ 
                    submitting: false,
                    value: '' 
                });
            }, 1000);
        }
    };
    
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { submitting, value } = this.state;
        const { currentUser } = this.state;
        console.log(this.props)
        return (
            <Comment
                avatar = {
                    <Avatar
                        src = { currentUser.image }
                        alt = { `Imagem de ${ currentUser.name }` }
                    />
                }
                content = {
                    <Editor
                        onChange = { this.handleChange }
                        onSubmit = { this.handleSubmit }
                        submitting = { submitting }
                        value = { value }
                    />
                }
            />
        );
    }
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <span>
        <Form.Item>
            <TextArea rows = { 5 } onChange = { onChange } value = { value } style = {{ width: 350}}/>
        </Form.Item>
        <Form.Item>
            <Button 
                htmlType = 'submit' loading = { submitting } onClick = { onSubmit } type = 'primary'
            >
                Adicionar Comentário
            </Button>
        </Form.Item>
    </span>
);

export default FormCommentCreate;