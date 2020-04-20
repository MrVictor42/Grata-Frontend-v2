import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import AutoComplete from './AutoComplete';

import '../../css/layout.css';
import '../../css/icon.css';
import '../../css/text.css';
import '../../css/project.css';
import '../../css/user.css';
import '../../css/buttons.css';
import '../../css/img.css';
import '../../css/alert.css';
import '../../css/forms.css';

const { Footer, Content } = Layout;

class CustomLayout extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Layout>
				<Navbar isLogged = { this.props.token }/>
				<Content>
					{
						this.props.token !== null ? (
							<AutoComplete />
						) : null
					}
					{ this.props.children }
				</Content>
				<Footer className = 'footer'>
					<b> 
						Grata - Gerenciamento de Reuniões e Atas ©2020 
						Criado por Victor Hugo Lopes Mota. 
					</b>
				</Footer>
			</Layout>
		);
	}
}

const mapStateToProps = state => {
    return { token: state.auth.token };
};

export default withRouter(connect(mapStateToProps)(CustomLayout));