import {Error, Loader} from '../../components/components'
import Parse from './Parse'

function Table({status, items, remove}){ 
	return(
		<div className="list">
			{
				status === 'error'? <tr><td>ERROR</td></tr>: 
				status === 'request'? <tr><td><Loader /></td></tr>:
				status === 'success'?
					items === [] ? <h4>This dictionary is empty now</h4>: 
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
				: <></>
			}
		</div>
	)
}

export default Table