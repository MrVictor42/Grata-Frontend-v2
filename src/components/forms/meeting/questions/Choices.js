import React, { Component } from 'react';
import { Radio } from 'antd';

class Choices extends Component {

    render() {
        const { questionId } = this.props;
		const { answers } = this.props;
        return (
            <Radio.Group
				onChange = {(e, qId) => this.props.change(e, questionId)}
				value = {
					answers[questionId] !== undefined &&
					answers[questionId] !== null
						? answers[questionId]
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

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px'
};

export default Choices;