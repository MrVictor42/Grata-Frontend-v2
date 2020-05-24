import React, { useState } from 'react';

import BtnComponent from './ButtonTimerMeeting';

function Timer() {

    const [ time, setTime ] = useState({ ms: 0, seconds: 0, minutes: 0, hour: 0 });
    const [interv, setInterv] = useState();
	const [status, setStatus] = useState(0);
	
	let updatedMs = time.ms;
	let updatedSeconds = time.seconds; 
	let updatedMinutes = time.minutes; 
	let updatedHour = time.hour;

    const start = () => {
    	run();
        setStatus(1);
        setInterv(setInterval(run, 10));
	};

	const run = () => {

        if(updatedMinutes === 60) {
          	updatedHour++;
          	updatedMinutes = 0;
		}
		
        if(updatedSeconds === 60) {
          	updatedMinutes++;
          	updatedSeconds = 0;
		}
		
        if(updatedMs === 100) {
          	updatedSeconds++;
          	updatedMs = 0;
		}
		
        updatedMs++;
		
		return setTime({
			ms:updatedMs, 
			seconds:updatedSeconds, 
			minutes:updatedMinutes, 
			hour:updatedHour
		});
	};
    
	const stop = () => {
        clearInterval(interv);
        setStatus(2);
	};
    
	const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, seconds: 0, minutes: 0, hour: 0 })
	};
    
	const resume = () => start();

    return (
		<span align = 'center'>
			<h1> Tempo de Reunião </h1>
			<h1>
				{ (time.hour >= 10)? time.hour : '0' + time.hour }:
				{ (time.minutes >= 10)? time.minutes : '0' + time.minutes }:
				{ (time.seconds >= 10)? time.seconds : '0' + time.seconds }
			</h1>
			<BtnComponent 
				status = { status } resume = { resume } 
				reset = { reset } stop = { stop } start = { start }
			/>
		</span>
    );
}

export default Timer;