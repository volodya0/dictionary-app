import React,{useState} from 'react';
import {Button, Loader} from '../components/components'
import styled from 'styled-components'
import colors from '../../colors'
import { mainTexts as Text } from '../../languages'


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
				<h3>{Text.header_text[props.lang]} {props.user.name}</h3>
					{
						props.status === 'request' ? <Loader/> : <>
						<div className='statistic'>
							<p>{Text.dictionaries_text[props.lang]}: {props.dictCount}</p> 
							<p>{Text.words_text[props.lang]}: {props.itemsCount}</p>
						</div>
						<Buttons className='buttons'>
							<Button options={{
								text:`${Text.dict_button_text[props.lang]}`,
								linkTo: '/dictionaries'
							}}/>
							<Button options={{
								disabled: true,
								text:`${Text.learn_button_text[props.lang]}`,
								linkTo: '/learn'
							}}/>
							<Button options={{
								text: `${Text.info_button_text[props.lang]}`,
								onClick:() => setMode(!infoMode)
							}}/>
							<Button options={{
								text: `${Text.view_button_text[props.lang]}`,
								color:'success',
								onClick: (e) => {window.open('https://github.com/volodya0/dictionary-app')}
							}}/>
								{infoMode? 
									<AccountInfo className='account-info'>
										<div className='row-with-info'>
											<p>{Text.name_text[props.lang]}: {props.user.name}</p>
										</div>
										<div className='row-with-info'>
											<p>{Text.email_text[props.lang]}: {props.user.email}</p>
										</div>
										<div className='row-with-info'>
											<p>{Text.created_text[props.lang]}: {new Date(+props.user.created).toLocaleString()}</p>
										</div>
										<div className='row-with-info'>
											<p>{Text.last_text[props.lang]}: {new Date(+props.user.lastLogin).toLocaleString()}</p>
										</div>		
										<Button options={{
											text: `${Text.close_button_text[props.lang]}`,
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