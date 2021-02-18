import {Input, Button, Error} from '../../components/components'
import {NavLink, useHistory} from "react-router-dom";

function Advanced(props) {
	const set = props.set
	const history = useHistory()

	return (
		<form 
			className={'row gy-2 gx-3 align-items-center advanced-form'}
			onSubmit={e => {e.preventDefault(); props.submit()}}
		>
			<div className='input-inputs-row'>
				<Input
					id = {'advanced-original'}	
					placeholder =  {'Original'}
					value = {set.original}	
					setValue =	{set.setOriginal}	
				/>
				<Input	
					id = {'advanced-translate'}	
					placeholder =  {'Translate'}
					value = {set.translate}	
					setValue =	{set.setTranslate}	
				/>
				<Input	
					id = {'advanced-description'}	
					placeholder =  {'Description'}
					value = {set.description}	
					setValue =	{set.setDescription}	
				/>
			</div>
			<div className="input-buttons-row">
				<Button options = {{
					text:'Back to dictionaries',
					color:'secondary',
					onClick:() => history.push('/dictionaries')
				}}/>
				<Button options = {{
					text:'Auto-translate',
					color:'primary',
					disabled: props.set.original === '',
					onClick:() => alert('auto-translate')
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

export default Advanced