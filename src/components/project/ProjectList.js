import React, { Component } from 'react'

export class ProjectList extends Component {

	// async componentDidMount() {
    //     const token = getUserToken();
    //     const slug = this.props.match.params.slug;
    //     const userId = getUserId();
    //     const user = await getCurrentUser(token, userId);
    //     const sector = await getSector(token, slug);
    //     const projects = await getProjects(token, sector.id);

    //     this.setState({ 
    //         sector: sector,
    //         projects: projects,
    //         currentUser: user 
    //     });
    // }
  	render() {
		return (
			<div>
				Lista de Reuniões		
			</div>
		);
	}
}

export default ProjectList;
