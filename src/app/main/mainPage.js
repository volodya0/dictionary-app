import React,{useState} from 'react';
import {Button, Loader} from '../components/components'
import styled from 'styled-components'
import colors from '../../colors'


function MainPage(props) {

	const AccountInfo = styled.div`
		border-color: ${colors.border[+props.theme]};
		background-color: ${colors.info[+props.theme]};
	`
	const Buttons = styled.div`
		border-color: ${colors.border[+props.theme]};
	`

	const [infoMode, setMode] = useState(false)
	
	return(
		<>
			<div className='main-section'>
				<h3>Welcome {props.user.name}</h3>
					{
						props.status === 'request' ? <Loader/> : <>
						<div className='statistic'>
							<p>Dictionaries: {props.dictCount}</p> 
							<p>Words: {props.itemsCount}</p>
						</div>
						<Buttons className='buttons'>
							<Button options={{
								text:'Go to dictionaries',
								linkTo: '/dictionaries'
							}}/>
							<Button options={{
								text:'Go learn',
								linkTo: '/learn'
							}}/>
							<Button options={{
								text:'Account info',
								onClick:() => setMode(!infoMode)
							}}/>
							<Button options={{
								text:'Log Out',
								onClick:props.logOut
							}}/>
							<Button options={{
								text:'View sources on gitHub',
								color:'success',
								onClick: (e) => {window.open('https://github.com/volodya0/dictionary-app')}
							}}/>
								{infoMode? 
									<AccountInfo className='account-info'>
										<div className='row-with-info'>
											<p>name: {props.user.name}</p>
										</div>
										<div className='row-with-info'>
											<p>email: {props.user.email}</p>
										</div>
										<div className='row-with-info'>
											<p>created: {new Date(+props.user.created).toLocaleString()}</p>
										</div>
										<div className='row-with-info'>
											<p>lastLogin: {new Date(+props.user.lastLogin).toLocaleString()}</p>
										</div>		
										<Button options={{
											text:'Close',
											onClick:() => setMode(false)
										}}/>						
									</AccountInfo>
								:<></>}
						</Buttons>
					</>}
			</div>
		</>
	)
}

export default MainPage