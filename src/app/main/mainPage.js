import React,{useState} from 'react';
import {Button, Loader, NavCreate} from '../components/components'

function MainPage(props) {
	const [infoMode, setMode] = useState(false)
	
	return(
		<>
			<div className='main-section'>
				<h3>Welcome {props.user.name}</h3>
					{
						props.status === 'request' ? <Loader/> :
						props.status === 'error' ? <h3>ERROR</h3> :
						<div className='statistic'>
							<p>Dictionaries {props.dictCount}</p> 
							<p>Words {props.itemsCount}</p>
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
								{infoMode? 
									<>
									<div className='row-with-info'>
										<p>name: {props.user.name}</p>
									</div>
									<div className='row-with-info'>
										<p>email: {props.user.email}</p>
									</div>
									<div className='row-with-info'>
										<p>created: {props.user.created}</p>
									</div>
									<div className='row-with-info'>
										<p>lastLogin: {props.user.lastLogin}</p>
									</div>		
									<Button options={{
										text:'Close',
										onClick:() => setMode(false)
									}}/>						
									</>
								:<></>}
						</div>
					}
			</div>
		</>
	)
}

export default MainPage