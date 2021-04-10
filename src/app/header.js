import React from 'react'
import {connect} from 'react-redux'
import {Button} from './components/components'
import {mapStateToPropsGen, mapDispatchToPropsGen} from '../store/store'
import styled from 'styled-components'
import colors from '../colors'
import { headerTexts as Text } from '../languages'

function Header(props){
	const Styled = styled.div`
    background-color: ${colors.header[+props.theme]} ;
		${(props.page === 'login')? 'width: 40% ; margin: 40px auto 0' : ''}
  `
	return(
		<Styled>
			<div className='header-wrapper'>
				<div>
					<div className='form-check form-switch'>
						<label className='form-check-label' htmlFor='flexSwitchCheckDefault'>{Text.mode_button_text[props.lang]}</label>
						<input 
							className='form-check-input' 
							type='checkbox' 
							id='flexSwitchCheckDefault'
							defaultChecked={props.theme}
							onChange={(e)=>props.themeToggle(e.target.checked)}
						/>
					</div>
				</div>
				<div className='languages-wrapper'>

					<input 
						type='radio' 
						className='btn-check' 
						name='options-outlined' 
						id='English-lang' 
						autoComplete='off' 
						onChange={(e)=>props.languageToggle('EN')}
						/>
					<label className={`btn btn-outline-light`} htmlFor='English-lang'>{Text.languageEN_button_text[props.lang]}</label>

					<input 
						type='radio' 
						className='btn-check' 
						name='options-outlined' 
						id='Russian-lang' 
						onChange={(e)=>props.languageToggle('RU')}
						autoComplete='off'/>
					<label className={`btn btn-outline-light`} htmlFor='Russian-lang'>{Text.languageRU_button_text[props.lang]}</label>
				
				</div>
				{(props.page !== 'login')? 
					<div className='header-user_info'>
						<span>{props.email}</span>
						<Button options={{
							outline: true,
							color: 'light',
							text: `${Text.logout_button_text[props.lang]}`,
							onClick:props.logOut
						}}/>
					</div>
					: <></>}
			</div>
		</Styled>
	)
}

const Header_w = connect(mapStateToPropsGen('header'), mapDispatchToPropsGen('header'))(Header)

export default Header_w