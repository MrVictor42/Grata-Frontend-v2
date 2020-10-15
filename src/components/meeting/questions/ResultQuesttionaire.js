import React, { Component } from 'react';
import { Button, Drawer } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons';

import ChartsQuesttionaire from '../../meeting/questions/ChartsQuesttionaire';

class ResultQuiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            visible: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    
    showDrawer = () => {
        this.setState({
            visible: true
        });
    };
    
    onClose = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <span>
                <Button type = 'primary' ghost onClick = { this.showDrawer }> 
                    <b><AreaChartOutlined /> Resultado do Questionário </b> 
                </Button>
                <Drawer
                    title = { `Resultados da Reunião: ${ this.props.meeting.title }` }
                    closable = { true } onClose = { this.onClose } visible = { this.state.visible }
                    width = { 'auto' }
                >
                    <ChartsQuesttionaire
                        token = { this.props.token } 
                        questtionaireID = { this.props.meeting.questtionaire }
                    />
                    {/* <NewComment 
                        token = { this.props.token }
                        questtionaireID = { this.props.meeting.questtionaire }
                    /> */}
                    {/* <CommentList 
                        token = { this.props.token }
                        meeting = { this.props.meeting }
                    /> */}
                </Drawer>
            </span>
        )
    }
}

export default ResultQuiz;