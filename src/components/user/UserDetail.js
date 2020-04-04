import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../store/actions/user';

class UserDetail extends Component {

    render() {
        const token = this.props.token;
        return (
        <p> token: {token}  </p>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentUser: state.users.currentUser
    };
};

export default connect(mapStateToProps)(UserDetail);