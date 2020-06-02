import React, { Component } from 'react';
import { Steps, Button } from 'antd';

const Step = Steps.Step;

class Questions extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            current: 0
        }
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }    

    render() {
        const { current } = this.state;
        const { questions } = this.props;
        return (
            <div>
                <Steps progressDot current = { current }>
                    { questions.map((q, index) => (
                        <Step key = { index } />
                    ))}
                </Steps>
                
                <div>
                    { questions[ current ] }
                </div>

                <div>
                    { current < questions.length - 1 && (
                        <Button type = 'primary' onClick={() => this.next()}>
                            Próximo
                        </Button>
                    )}

                    { current === questions.length - 1 && (
                        <Button type = 'primary' onClick={() => this.props.submit()}>
                            Concluir
                        </Button>
                    )}

                    { current > 0 && (
                        <Button style ={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Voltar
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default Questions;