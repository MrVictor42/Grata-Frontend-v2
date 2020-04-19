import React, { Component } from 'react';
import { Alert } from 'antd';


class Alerts extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: true,
        }

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visible: false
            });
        }, 5000);
    }

    handleClose() {
        this.setState({
            visible: false
        });
    }

    render() {
        const visible = this.state.visible;
        return (
            <div>
                { visible ? (
                    <Alert
                        className = 'alert' 
                        message = { this.props.message } 
                        type = { this.props.type } 
                        closable
                        showIcon 
                        afterClose = { this.handleClose } 
                    />
            ) : null}
            </div>
        );
    }
}

export default Alerts;