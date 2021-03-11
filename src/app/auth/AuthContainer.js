import {authRequests} from '../../requests/requests'
import {Error, Button, Loader} from '../components/components'
import {LoginInputs, RegisterInputs} from './Inputs'
import React,{useState, useEffect, useCallback} from 'react'
import {connect} from 'react-redux'
import { mapDispatchToPropsGen } from '../../store/store'
import { useHistory } from 'react-router-dom'
import './auth.css'

function AuthContainer(props){

	const [isTypeLogin, setType] = useState(true)
	const [message, setMessage] = useState(null)
	const [disabledBtn, setDisabled] = useState(true)
	const [loader, setLoader] = useState(false)
	const [values, set] = useState({name:'', email:'', password:'', password_:''})
	const history = useHistory()

	const mainButtonOptions = {
		color: 'success',
		disabled: loader || disabledBtn,
		text: isTypeLogin ? 'Log In' : 'Register' ,
		onClick: () => isTypeLogin ? login() : register() 
	}

	const toggleButtonOptions = {
		disabled:loader,
		color:'primary'	,
		text: isTypeLogin ? 'Create account' : 'Back to login',
		onClick: () => setType(!isTypeLogin)
	}

	function login() {
		setLoader(true)
		authRequests.logIn({
			email: values.email,
			password: values.password, 
			onSuccess: (res) => {
				history.push('/main')
				props.setUser({
					name : res.user.displayName,
					id : res.user.uid,
					photoURL : res.user.photoURL,
					email: res.user.email,
					phone: res.user.phoneNumber,
					lastLogin : res.user.metadata.b,
					created: res.user.metadata.a
				})
				setLoader(false)
			},
			onFail: (message) => {
				setMessage(message)
				setLoader(false)
			}
		})
	}
	
	function register() {
		setLoader(true)
		authRequests.create({
			name: values.name,
			email: values.email,
			password: values.password, 
			onSuccess: () => {
				login({
					email: values.email,
					password: values.password, 
					onSuccess: (user) => {
						props.onLogin(user)
						setLoader(false)
					},
					onFail: (message) => {
						setMessage(message)
						setLoader(false)
					}
				})
			},
			onFail: (message) => {
				setLoader(false)
				setMessage(message)
			}
		})
	}

	const validator = useCallback ((values) => {
		
		if([...Object.values(values)].every(val => val === '')) return null

		if(!isTypeLogin){

			const nameValid = values.name.length > 2
			const confirm = values.password === values.password_

			if(!nameValid)	return 'Invalid name'
			if(!confirm)	return 'Invalid password confirm'

		}

		const emailValid = /^.+@.+\..+$/.test(values.email)
		const passwordValid = values.password.length > 5

		if(!emailValid)	return 'Invalid email'
		if(!passwordValid)	return 'Invalid password'

		return null

	}, [isTypeLogin])

	useEffect(() => {
		let cleanupFunction = false;

		if (!cleanupFunction){
			if (validator(values)) {
				setMessage(validator(values))
				setDisabled(true)
			}else{
				setMessage(null)
				setDisabled(false)
			}
		}

		return () => cleanupFunction = true;
	}, [values.name, values.email,values.password,values._password, validator, values])

	return(
		<form className='auth-form'>

			{isTypeLogin 

			? 
				<LoginInputs
					set={set}
					values={values}
					disabled={loader}
				/>

			: 
				<RegisterInputs
					set={set}
					values={values}
					disabled={loader}
				/>
				
			}

			<Error message={message}/>

			<div className='auth-buttons-row'>

				<Button options={mainButtonOptions}/>

				{loader ? <span className='auth-button-loader'><Loader size={15}/></span> : <></>}

				<Button options={toggleButtonOptions}/>

			</div>

		</form>
	)

}

const Auth_w = connect(undefined, mapDispatchToPropsGen('auth'))(AuthContainer)

export default Auth_w