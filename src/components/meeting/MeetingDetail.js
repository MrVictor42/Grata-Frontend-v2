// import React, { Component } from 'react';
// import { Button, Drawer } from 'antd';
// import { CaretRightOutlined } from '@ant-design/icons';

// class MeetingDetail extends Component {

//     constructor(props) {
//         super(props)
    
//         this.state = {
//             visible: false,
//             hour: 0,
//             minutes: 59,
//             seconds: 55
//         }

//         this.showDrawer = this.showDrawer.bind(this);
//         this.onClose = this.onClose.bind(this);
//         this.pause = this.pause.bind(this);
//     }

//     componentDidMount() {
//         setInterval(() => {
//             return this.setState((state, props) => {
//                 return {
//                     seconds: state.seconds === 59 ? 0: state.seconds + 1,
//                     // minutes: (state.seconds === 59 && state.minutes === 59) ? state.minutes + 1: state.minutes ? state.seconds === 59 ? state.minutes + 1: state.minutes,

//                     // minutes: state.seconds === 59 ? state.minutes + 1: state.minutes,
//                     // minutes: state.seconds === 59 && state.minutes === 59 ? 0: state.minutes,
//                     hour: state.seconds === 59 && state.minutes === 59 ? state.hour + 1: state.hour
//                 }
//             });
//         }, 1000);
//     }
    
//     showDrawer = () => {
//         this.setState({ visible: true });
//     };
    
//     onClose = () => {
//         this.setState({ visible: false });
//     };

//     pause = () => {

//     };

//     render() {
//         return (
//             <span>
//                 <span> {( this.state.hour >= 10 ) ? this.state.hour : '0' + this.state.hour }:
//                 {( this.state.minutes >= 10 ) ? this.state.minutes : '0' + this.state.minutes }:
//                 {( this.state.seconds >= 10 ) ? this.state.seconds : '0' + this.state.seconds } </span>
//                 {/* <Button className = 'save' onClick = { this.showDrawer }>
//                     <CaretRightOutlined/> <b> Começar Reunião </b>
//                 </Button>
//                 <Drawer
//                     title = { `Reunião: ${ this.props.meeting.title } ` }
//                     onClose = { this.onClose } visible = { this.state.visible } width = { '100%' }
//                 >
//                     <Button danger onClick = { this.pause }> Pausar </Button>
//                 </Drawer> */}
//             </span>
//         );
//     }
// }

// export default MeetingDetail;

import React, { useState } from 'react';

import DisplayComponent from './timer/DisplayComponent';
import BtnComponent from './timer/BtnComponent';

function MeetingDetail(props) {
    const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);

    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
      };
    
      var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;
    
      const run = () => {
        if(updatedM === 60){
          updatedH++;
          updatedM = 0;
        }
        if(updatedS === 60){
          updatedM++;
          updatedS = 0;
        }
        if(updatedMs === 100){
          updatedS++;
          updatedMs = 0;
        }
        updatedMs++;
        return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
      };
    
      const stop = () => {
        clearInterval(interv);
        setStatus(2);
      };
    
      const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ms:0, s:0, m:0, h:0})
      };
    
      const resume = () => start();
    
    
      return (
        <div className="main-section">
         <div className="clock-holder">
              <div className="stopwatch">
                  {/* <p> { props.meeting.title } </p> */}
                   <DisplayComponent time={time} />
                   <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
              </div>
         </div>
        </div>
      );
}

export default MeetingDetail;