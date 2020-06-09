import React, { Component } from 'react';
import { Button, Drawer } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell } from 'recharts';

import { getGradedInQuesttionaire } from '../../../store/gradedQuesttionaire';

import NewComment from '../../forms/meeting/comments/FormCommentCreate';
import CommentList from '../comments/CommentList';

export class ResultQuiz extends Component {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';

    constructor(props) {
        super(props)
    
        this.state = {
            graded: [],
            visible: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    
    async componentDidMount() {
        const token = this.props.token;
        const questtionaireID = this.props.meeting.questtionaire;
        const graded = await getGradedInQuesttionaire(token, questtionaireID);
        
        this.setState({
            graded: graded
        });
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
        for(let aux = 0; aux < this.state.graded.length; aux ++) {
            let vetor = [this.state.graded.length];
            
        }
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
                    <NewComment 
                        token = { this.props.token }
                        questtionaireID = { this.props.meeting.questtionaire }
                    />
                    <CommentList 
                        token = { this.props.token }
                        meeting = { this.props.meeting }
                    />
                    {/* <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                        <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                        <Pie
                        data={data}
                        cx={420}
                        cy={200}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                    </PieChart>  */}
                </Drawer>
            </span>
        )
    }
}

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
};

export default ResultQuiz;