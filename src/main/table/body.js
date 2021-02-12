import {Parse} from "./parse" 
import React,{useState} from 'react'


export function Body(props){	
	const [forUpdate, setUpdate] = useState(true)
	props.store.subscribe(() => {setUpdate(!forUpdate)})
	let items = props.store.getState().items
	return (
		<tbody>
			{
				items.map((item, number) => {return(
					<Parse 
						item = {item} 
						number = {number} 
						key ={number} 
					/>
				)})
			}	
		</tbody>
	)
}

