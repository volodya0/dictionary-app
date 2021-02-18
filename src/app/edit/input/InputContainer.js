import AdvancedContainer  from './AdvancedContainer'
// import DefaultContainer from './DefaultContainer'
import React,{useState} from 'react'


function InputContainer(props){
	const [type, setType] = useState(true)
	const toggle = () => setType(!type)

	return(
		<div className="input-section">
			<h1>Header</h1>
				<AdvancedContainer add={props.add} toggle={toggle} />
		</div>
	)
}

export default InputContainer

