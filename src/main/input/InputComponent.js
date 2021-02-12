import React from 'react'
 
export function InputComponent(props){
	// console.info(`input-${props.id} render`)
	return (
		<>
			<input 
				id={props.id} 
				type="text" 
				className="htmlForm-control" 
				placeholder={props.placeholder} 
				value={props.value} 
				onChange={(e) => {props.setValue(e.target.value)}}
			/>
		</>
	)
}