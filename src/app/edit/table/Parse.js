import React from 'react'
import { EditTexts as Text } from '../../../languages'

function Parse({number, item, remove, lang}){
	return(
		<tr>
			<th scope="row" className='Num_col'> {number}</th>
			<td className='Orig_col'>{item.original}</td>
			<td className='Trans_col'> {item.translate}</td>
			<td className='Desc_col'>{item.description}</td>
			<td className='date Date_col'>{new Date(+item.date).toLocaleString().slice(0, 17)}</td>
			<td className='Opt_col'>
				<button 
					type="button" 
					className="btn btn-danger	ms-3 fs-7 p-1"
					onClick={() => remove(item.date)}
					>
						{Text.remove_table_text[lang]}
				</button>
			</td>
		</tr>
	)
}

export default Parse
