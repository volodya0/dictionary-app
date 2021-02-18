import React,{useState} from 'react'
import Advanced from './Advanced' 

function AdvancedContainer(props){

	const [original, setOriginal] = useState('')
	const [translate, setTranslate] = useState('')
	const [description, setDescription] = useState('')
	const [error, setError] = useState(null)

	const clear = () => {
		setOriginal('')
		setTranslate('')
		setDescription('')
	}

	const submit = () => {
		props.add(
			{original, translate, description},
			clear,
			setError
		)
	}

	let set = {original,setOriginal,translate,setTranslate,description,setDescription}

	return(
		<Advanced 
			set={set} 
			clear={clear} 
			submit={submit}
			toggle={props.toggle}
			error={error}
		/>)
}

export default AdvancedContainer