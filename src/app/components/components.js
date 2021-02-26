import React from 'react'
import { useHistory } from 'react-router-dom'

export function Button(props) {
	const history = useHistory()
	let options = props.options
	return(
		<button 
			type={options.type||'submit'} 
			className={`sub-btn my-btn btn btn${options.outline?'-outline':''}-${options.color||'primary'} ${options.class||''}`}
			onClick={(e) => {
				e.preventDefault()  
					if(options.onClick)
						options.onClick(e)
					if(options.linkTo)
						history.push(options.linkTo)
			}}
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

