import React,{useState, useEffect} from 'react'
import Input from './Input' 

function InputContainer(props){

	const [original, setOriginal] = useState('')
	const [translate, setTranslate] = useState('')
	const [description, setDescription] = useState('')
	const [translatingStatus, setStatus] = useState('')

	useEffect(() => {
		if(translatingStatus === 'success'){setStatus('')}
	},[original, translate, translatingStatus])

	const clear = () => {
		setOriginal('')
		setTranslate('')
		setDescription('')
	}

	const translateFunc = () => {
		setStatus('load')
		props.translate(
			original,
			(translate) => {
				setStatus('success')
				setTranslate(translate)
				setDescription('Translated-auto')
			},
			(error) => setStatus('fail')
		)
	}

	const submit = () => {
		props.add(
			{original, translate, description},
			clear,
			(e)=> {}
		)
	}

	let set = {original,setOriginal,translate,setTranslate,description,setDescription}

	return(
			<Input
				lang={props.lang}
				theme={props.theme}
				set={set} 
				clear={clear} 
				submit={submit}
				translate={translateFunc}
				status = {translatingStatus}
				/>
	)
}

export default InputContainer