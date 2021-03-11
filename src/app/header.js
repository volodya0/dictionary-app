import React from 'react'
import {connect} from 'react-redux'
import {Button} from './components/components'
import {mapStateToPropsGen, mapDispatchToPropsGen} from '../store/store'
import styled from 'styled-components'
import colors from '../colors'

function Header(props){
	const Styled = styled.div`
    background-color: ${colors.header[+props.theme]} ;
  `
	return(
		<Styled>
			<div className='header-wrapper'>
				<div>
					<div className='form-check form-switch'>
						<label className='form-check-label' htmlFor='flexSwitchCheckDefault'>Dark mode</label>
						<input 
							className='form-check-input' 
							type='checkbox' 
							id='flexSwitchCheckDefault'
							defaultChecked={props.theme}
							onChange={(e)=>props.toggle(e.target.checked)}
						/>
					</div>
				</div>
				<div className='languages-wrapper'>
					<input type='radio' className='btn-check' name='options-outlined' id='English-lang' autoComplete='off' defaultChecked/>
					<label className={`btn btn-outline-light`} htmlFor='English-lang'>English</label>

					<input type='radio' className='btn-check' name='options-outlined' id='Russian-lang' autoComplete='off'/>
					<label className={`btn btn-outline-light`} htmlFor='Russian-lang'>Russian</label>
				</div>
				<div className='header-user_info'>
					<span>{props.email}</span>
					<Button options={{
						outline: true,
						color: 'light',
						text:'Log Out',
						onClick:props.logOut
					}}/>
				</div>
			</div>
		</Styled>
	)
}

const Header_w = connect(mapStateToPropsGen('header'), mapDispatchToPropsGen('header'))(Header)

export default Header_w