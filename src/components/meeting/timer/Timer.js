import React, { useState } from 'react';

import { finishMeeting } from '../../../store/meeting';

import BtnComponent from './ButtonTimerMeeting';

function Timer(props) {

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

	const finish = () => {
		stop();
		const token = props.token;
		const duration_time = document.getElementById('time').innerText;
		const meetingID = props.meeting.meetingID;
		const projectID = props.meeting.project;
		const userID = props.meeting.userID;
		const title = props.meeting.title;
		const status = 'Finalizada';
		const initial_date = props.meeting.initial_date;
		const initial_hour = props.meeting.initial_hour;
		const subject_matter = props.meeting.subject_matter;
		const real_hour = props.atualHour;
		const real_date = props.atualDate;

		const meeting = {
			meetingID: meetingID,
			projectID: projectID,
			userID: userID,
			title: title,
			status: status,
			subject_matter: subject_matter,
			initial_date: initial_date,
			initial_hour: initial_hour,
			duration_time: duration_time,
			real_hour: real_hour,
			real_date: real_date
		};

		finishMeeting(token, meeting);
		window.location.reload(false);
	}

    return (
		<span align = 'center'>
			<h1> Tempo de Reunião </h1>
			<h1 id = 'time'>
				{ (time.hour >= 10)? time.hour : '0' + time.hour }:
				{ (time.minutes >= 10)? time.minutes : '0' + time.minutes }:
				{ (time.seconds >= 10)? time.seconds : '0' + time.seconds }
			</h1>
			<BtnComponent 
				status = { status } resume = { resume } finish = { finish }
				reset = { reset } stop = { stop } start = { start } 
			/>
		</span>
    );
}

export default Timer;