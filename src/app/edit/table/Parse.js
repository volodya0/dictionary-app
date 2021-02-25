import React from 'react'

function Parse({number, item, remove}){
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
					className="btn btn-danger	ms-3 fs-7 p-1"
					onClick={() => remove(item.date)}
					>
						Remove
				</button>
			</td>
		</tr>
	)
}

export default Parse
