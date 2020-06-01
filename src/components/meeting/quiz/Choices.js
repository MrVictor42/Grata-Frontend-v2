import React, { Component } from 'react';
import { Radio } from 'antd';

class Choices extends Component {
    render() {
        const { questionId } = this.props;
		const { usersAnswers } = this.props;
        return (
            <Radio.Group
				onChange = {(e, qId) => this.props.change(e, questionId)}
				value = {
					usersAnswers[questionId] !== undefined &&
					usersAnswers[questionId] !== null
						? usersAnswers[questionId]
						: null
				}
			>
				{ this.props.choices.map((choice, index) => {
					return (
						<Radio style = { radioStyle } value = { choice } key = { index }>
						{ choice }
						</Radio>
					);
				})}
			</Radio.Group>
        );
    }
}

export default Choices;