import React, { Component } from 'react';
import { Comment, List } from 'antd';

import { getComments } from '../../../store/comments';
import { getUserToken, getUsersInMeeting } from '../../../store/user';
import { getImage } from '../../../store/images';

import DefaultUser from '../../../img/default_user.jpg';

class CommentList extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			comments: [],
			token: null
		}
	}

	async componentDidMount() {
		const token = getUserToken();
		const meetingID = this.props.meeting.meetingID;
		const projectID = this.props.meeting.project;
		const comments = await getComments(token, meetingID);
		const users = await getUsersInMeeting(token, meetingID, projectID);
		let imageUser = null;
		let imageFinal = null;
		let comment_list = { comments: [] };

		for(let auxComment = 0; auxComment < comments.length; auxComment ++) {
			for(let auxUsers = 0; auxUsers < users.length; auxUsers ++) {
				if(comments[auxComment].user === users[auxUsers].name) {
					if(users[auxUsers].image === null) {
						imageFinal = DefaultUser;
					} else {
						imageUser = await getImage(token, users[auxUsers].image);
                		imageFinal = imageUser.image;
					}
				}
			}
			comment_list.comments.push({
				id: comments[auxComment].id,
				user: comments[auxComment].user,
				description: comments[auxComment].description,
				image: imageFinal
			});
		}

        this.setState({ 
			comments: comment_list.comments,
			token: token 
		});
	}
	
	async componentDidUpdate(prevProps) {
		if(prevProps.comments !== this.state.comments) {
			const token = this.state.token;
			const meetingID = this.props.meeting.meetingID;
			const projectID = this.props.meeting.project;
			const comments = await getComments(token, meetingID);
			const users = await getUsersInMeeting(token, meetingID, projectID);
			let imageUser = null;
			let imageFinal = null;
			let comment_list = { comments: [] };

			for(let auxComment = 0; auxComment < comments.length; auxComment ++) {
				for(let auxUsers = 0; auxUsers < users.length; auxUsers ++) {
					if(comments[auxComment].user === users[auxUsers].name) {
						if(users[auxUsers].image === null) {
							imageFinal = DefaultUser;
						} else {
							imageUser = await getImage(token, users[auxUsers].image);
							imageFinal = imageUser.image;
						}
					}
				}
				comment_list.comments.push({
					id: comments[auxComment].id,
					user: comments[auxComment].user,
					description: comments[auxComment].description,
					image: imageFinal
				});
			}

			this.setState({ comments: comment_list.comments });
		}
	}

    render() {
		let comment_list = { comments: [] };

		for(let aux = 0; aux < this.state.comments.length; aux ++) {
			comment_list.comments.push({
				key: this.state.comments[aux].id,
				content: this.state.comments[aux].description,
				author: this.state.comments[aux].user,
				image: this.state.comments[aux].image
			});
		}

        return (
            <List
				className = 'comment-list'
				header = { `${ comment_list.comments.length } Comentários` }
				itemLayout = 'horizontal'
				dataSource = { comment_list.comments }
				style = {{ marginLeft: 450, marginTop: -230 }}
				renderItem = { item => (
					<li>
						<Comment
							author = { item.author }
							avatar = { item.image }
							content = { item.content }
						/>
					</li>
				)}
			/>
        );
    }
}

export default CommentList;