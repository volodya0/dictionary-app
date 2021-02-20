import React from 'react'
import {Input} from '../components/components'

export function LoginInputs(props) {
	return(
		<>
			<div className='mb-3'>
				<label htmlFor='auth-email-input' className='form-label'>Email address</label>
				<Input
					id={'auth-email-input'} 
					type={'email'}
					disabled={props.disabled}
					class={'form-control'}
					value={props.values.email}
					onChange={e => props.set({...props.values , email:e.target.value })}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='auth-password-input' className='form-label'>Password</label>
				<Input
					id={'auth-password-input'} 
					type={'password'}
					disabled={props.disabled}
					class={'form-control'}
					value={props.values.password}
					onChange={e => props.set({...props.values , password:e.target.value})}
				/>
			</div>
		</>
	)		
}

export function RegisterInputs(props) {
	return(
		<>
			<div className='mb-3'>
				<label htmlFor='register-name-input' className='form-label'>Your name</label>
				<Input
					id={'register-name-input'} 
					type={'text'}
					disabled={props.disabled}
					class={'form-control'}
					value={props.values.name}
					onChange={e => props.set({...props.values , name:e.target.value })}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='register-email-input' className='form-label'>Email address</label>
				<Input
					id={'register-email-input'} 
					type={'email'}
					disabled={props.disabled}
					class={'form-control'}
					value={props.values.email}
					onChange={e => props.set({...props.values , email:e.target.value })}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='register-password-input' className='form-label'>Password</label>
				<Input
					id={'register-password-input'} 
					type={'password'}
					disabled={props.disabled}
					class={'form-control'}
					value={props.values.password}
					onChange={e => props.set({...props.values , password:e.target.value})}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='register-password-input' className='form-label'>Confirm password</label>
				<Input
					id={'register-rePassword-input'} 
					type={'password'}
					disabled={props.disabled}
					class={'form-control'}
					value={props.values.password_}
					onChange={e => props.set({...props.values , password_:e.target.value})}
				/>
			</div>
		</>
	)		
}

