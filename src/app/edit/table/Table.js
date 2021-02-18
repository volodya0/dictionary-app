import {Error, Loader} from '../../components/components'
import Parse from './Parse'

function Table({state, items, remove}){ 
	return(
		<div className="list">
			{
				state.status === 'error'? <tr><td><Error message={state.message} /></td></tr>: 
				state.status === 'request'? <tr><td><Loader /></td></tr>: 
				state.status === 'success'?
					<table className="table">
					<thead>
						<tr>
							<th scope="col-1">#</th>
							<th scope="col-3">Original</th>
							<th scope="col-3">Translate</th>
							<th scope="col-2">Description</th>
							<th scope="col-1">Date</th>
							<th scope="col-2">Options</th>
						</tr>
					</thead>
					<tbody>
						{
							items.map((item,number) => 
								<Parse 
									item = {item} 
									number = {number+1} 
									key ={item.date} 
									remove={remove}
								/> )
						}
						<tr>It`s all</tr>
					</tbody>
				</table> 
				: <div><h5>This ditictionary is empty</h5></div>
			}
		</div>
	)
}

export default Table