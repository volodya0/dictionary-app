import {Input, Button, Error} from '../../components/components'
import React from 'react'
import { EditTexts as Text } from '../../../languages'


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
						placeholder =  {Text.orig_field_text[props.lang]}
						value = {set.original}	
						onChange =	{e => set.setOriginal(e.target.value)}	
					/>
					<Input	
						disabled = {props.status === 'load'}
						id = {'input-translate'}	
						placeholder =  {Text.tran_field_text[props.lang]}
						value = {set.translate}	
						onChange =	{e => set.setTranslate(e.target.value)}	
					/>
					<Input	
						disabled = {props.status === 'load'}
						id = {'input-description'}	
						placeholder =  {Text.desc_field_text[props.lang]}
						value = {set.description}	
						onChange =	{e => set.setDescription(e.target.value)}	
					/>
				</div>
				<div className="input-buttons-row">
					<Button options = {{
						type:'button',
						text: `${Text.back_button_text[props.lang]}`,
						color:'secondary',
						linkTo:'/dictionaries'
					}}/>
					<Button options = {{
						type:'button',
						text:`${Text.auto_button_text[props.lang]}`,
						color:'primary',
						disabled: props.set.original === '' || props.status === 'success',
						onClick:props.translate
					}}/>
					<Button options = {{
						type:'button',
						color:'warning',
						text:`${Text.clear_button_text[props.lang]}`,
						onClick:props.clear,
						disabled: props.set.original+props.set.translate+props.set.description === ''
					}}/>
					<Button options = {{
						type:'submit',
						color:'success',
						text:`${Text.submit_button_text[props.lang]}`,
						onClick:props.submit,
						disabled: props.set.original === '' || props.set.translate === ''
					}}/>
				</div>
				{props.error? <Error message={props.error}/>:<></>}
			</form>
	)
}

export default InputPage