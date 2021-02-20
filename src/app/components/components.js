import {NavLink, useHistory} from 'react-router-dom';
import React,{useContext} from 'react'
import {AuthContext} from '../../context/Context'
import {authRequests} from '../../requests/request-database'


export function Header(){
	const context = useContext(AuthContext);
	const history = useHistory()
	
	return (
			<div className='header'>
				<div className='nav-links'>
					<NavLink to='/main' className='link' activeClassName='selected'>
						Main
					</NavLink>
					<NavLink to='/dictionaries' className='link'  activeClassName='selected'>
						Dictionaries
					</NavLink>
					<NavLink to='/Learn' className='link'  activeClassName='selected'>
						Learn
					</NavLink>
				</div>

				<div className='nav-username-wrapper'>
					<h4 className='nav-username'>{context.user.email}</h4>
						<Button options={{	
							text:'LogOut',
							class: 'logout-btn',
							onClick: () => {
								authRequests.logOut();
								history.push('/auth') 
							}
						}}/>
				</div>
			</div>
	)
}

export function Button(props) {
	let options = props.options
	return(
		<button 
			type={options.type||'submit'} 
			className={`sub-btn my-btn btn btn-${options.color||'primary'} ${options.class||''}`}
			onClick={(e) => {e.preventDefault(); options.onClick(e)}}
			disabled={options.disabled||false}
			>
				{options.text}
		</button>
	)	
}

export function Loader(props) {
	let options = {
		class:'',
		color:'',
		size:30,
		text:'',
		...props.options
	}
	return (
		<div className='my-loader-wrapper'>
			<div 
			className={`${options.class} my-loader spinner-border text-${options.color||'primary'}`} 
			style={{width: options.size+'px', height: options.size+'px'}}
			role='status'>
				<span className='visually-hidden'>{options.text}</span>
		</div>
		</div>
	)
}

export function Error(props) {
	if(props.message){
			return(<p className='text-danger'>{props.message}</p>)
		}else{
			return null
		}
}

export function Input(props){
	return (
		<>
			<input 
				id={props.id} 
				type={props.type||'text'} 
				disabled={props.disabled}
				className={props.class} 
				required={props.required}
				placeholder={props.placeholder} 
				value={props.value} 
				onChange={props.onChange}
			/>
		</>
	)
}

