import React from 'react';
import { Layout } from 'antd';

import Navbar from './Navbar';
import '../../css/layout.css';

const { Footer } = Layout;

const CUSTOMLAYOUT = (props) => {

	return (
		<Layout>
			<Navbar />
			{ props.children } 
			<Footer className = 'footer'>
				<b> Grata - Gerenciamento de Reuniões e Atas ©2020 
				Criado por Victor Hugo Lopes Mota. </b>
			</Footer>
		</Layout>
	);
}

export default CUSTOMLAYOUT;