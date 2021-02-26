import {Input, Button, Error} from '../../components/components'
import React from 'react'


function InputPage(props) {
	const set = props.set

	return (
		<form 
			className={'row gy-2 gx-3 align-items-center input-section'}
			onSubmit={e => {e.preventDefault(); props.submit()}}
		>
			<div className='input-inputs-row'>
				<Input
					disabled = {props.status === 'load'}
					id = {'input-original'}	
					placeholder =  {'Original'}
					value = {set.original}	
					onChange =	{e => set.setOriginal(e.target.value)}	
				/>
				<Input	
					disabled = {props.status === 'load'}
					id = {'input-translate'}	
					placeholder =  {'Translate'}
					value = {set.translate}	
					onChange =	{e => set.setTranslate(e.target.value)}	
				/>
				<Input	
				  disabled = {props.status === 'load'}
					id = {'input-description'}	
					placeholder =  {'Description'}
					value = {set.description}	
					onChange =	{e => set.setDescription(e.target.value)}	
				/>
			</div>
			<div className="input-buttons-row">
				<Button options = {{
					text:'Back to dictionaries',
					color:'secondary',
					linkTo:'/dictionaries'
				}}/>
				<Button options = {{
					text:'Auto-translate',
					color:'primary',
					disabled: props.set.original === '' || props.status === 'success',
					onClick:props.translate
				}}/>
				<Button options = {{
					color:'warning',
					text:'Clear',
					onClick:props.clear,
					disabled: props.set.original+props.set.translate+props.set.description === ''
				}}/>
				<Button options = {{
					color:'success',
					text:'Submit',
					onClick:props.submit,
					disabled: props.set.original === '' || props.set.translate === ''
				}}/>
			</div>
			{props.error? <Error message={props.error}/>:<></>}
		</form>
	)
}

export default InputPage