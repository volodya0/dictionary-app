import React from 'react'

export function Parse(props){
	let item = props.item
	let number = props.number + 1
	return(
		<tr>
			<th scope="row">{number}</th>
			<td>{item.original}</td>
			<td>{item.translate}</td>
			<td>{item.description}</td>
			<td>{new Date(+item.date).toLocaleString()}</td>
			<td>
				<button 
					type="button" 
					className="btn btn-info ms-3 fs-7 p-1" 
					
					>
						Edit
				</button>
				<button 
					type="button" 
					className="btn btn-danger	ms-3 fs-7 p-1"
					
					>
						Remove
				</button>
			</td>
		</tr>
	)
}
