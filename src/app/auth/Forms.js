import React,{useState} from 'react'
import {Error} from '../components/components'

export function LogInForm(props) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)

	return(
		<form className="auth-form">
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
				<input 
					type="email" 
					className="form-control" 
					id="exampleInputEmail1" 
					aria-describedby="emailHelp"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
				<input 
					type="password" 
					className="form-control" 
					id="exampleInputPassword1"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<Error message={message}/>
			<button 
				type="submit" 
				className="sub-btn btn btn-primary"
				onClick={(e) => {e.preventDefault(); props.login(email, password, setMessage)}}
				>
					Log in
			</button>
			<button 
				type="submit" 
				className="sub-btn btn btn-primary"
				onClick={(e) => {e.preventDefault(); props.toggle(false)}}
				>
					Create account
			</button>
		</form>
	)		
}

export function RegisterForm(props) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password_, setPassword_] = useState('')
	const [message, setMessage] = useState(null)

	return(
		<form className="auth-form">
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">Your name</label>
				<input 
					type="text" 
					className="form-control"  
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
				<input 
					type="email" 
					className="form-control" 
					aria-describedby="emailHelp"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
				<input 
					type="password" 
					className="form-control" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">Password</label>
				<input 
					type="password" 
					className="form-control" 
					value={password_}
					onChange={(e) => setPassword_(e.target.value)}
				/>
			</div>
			<Error message={message}/>
			<button 
				type="submit" 
				className="sub-btn btn btn-primary"
				onClick={(e) => {
					e.preventDefault(); 
					if(password!==password_){
						setMessage("Passwords error")
					}else{
						props.register(name, email, password, setMessage)
					}
				}}
				>
					Create account
			</button>
			<button 
				type="submit" 
				className="sub-btn btn btn-primary"
				onClick={(e) => {e.preventDefault(); props.toggle(true)}}
				>
					Back to logIn
			</button>
		</form>
	)		
}

