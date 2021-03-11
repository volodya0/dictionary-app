import React from 'react'

function Parse({number, item, remove}){
	return(
		<tr>
			<th scope="row">{number}</th>
			<td>{item.original}</td>
			<td>{item.translate}</td>
			<td>{item.description}</td>
			<td className='date'>{new Date(+item.date).toLocaleString().slice(0, 17)}</td>
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
