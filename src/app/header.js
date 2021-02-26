import React from 'react'
import {connect } from 'react-redux'
import {Button} from './components/components'
import {mapStateToPropsGen, mapDispatchToPropsGen} from '../store/store'

function Header(props){
	return(
		<div className='header-wrapper'>
			<div>
				<div className='form-check form-switch'>
					<label className='form-check-label' htmlFor='flexSwitchCheckDefault'>Dark mode</label>
					<input className='form-check-input' type='checkbox' id='flexSwitchCheckDefault'/>
				</div>
			</div>
			<div className='languages-wrapper'>
				<input type='radio' className='btn-check' name='options-outlined' id='English-lang' autocomplete='off' checked/>
				<label className='btn btn-outline-light' htmlFor='English-lang'>English</label>

				<input type='radio' className='btn-check' name='options-outlined' id='Russian-lang' autocomplete='off'/>
				<label className='btn btn-outline-light' htmlFor='Russian-lang'>Russian</label>
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
	)
}

const Header_w = connect(mapStateToPropsGen('header'), mapDispatchToPropsGen('header'))(Header)

export default Header_w