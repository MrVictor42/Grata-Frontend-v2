import React from 'react';
import { Button } from 'antd';

const ButtonTimerMeeting = (props) => {
  	return (
		<div>
			{
				(props.status === 0) ? (
					<Button type = 'primary' ghost onClick = { props.start }>
						Começar Reunião
					</Button>
				) : ''
			}

			{
				(props.status === 1) ? (
					<span>
						<Button type = 'primary' ghost onClick = { props.stop }>
							Parar Contador
						</Button> &nbsp;&nbsp;
						<Button danger onClick = { props.reset }>
							Reiniciar Contador
						</Button>
						&nbsp;&nbsp; <Button onClick = { props.finish }> Finalizar Reunião </Button>
					</span>
				) : ''
			}

			{
				(props.status === 2) ? (
					<span>
						<Button type = 'primary' ghost onClick = { props.resume }>
							Continuar
						</Button> &nbsp;&nbsp;
						<Button danger onClick = { props.reset }>
							Reiniciar Contador
						</Button>
						&nbsp;&nbsp; <Button onClick = { props.finish }> Finalizar Reunião </Button>
					</span>
				) : ''
			}
		</div>
  	);
}

export default ButtonTimerMeeting;