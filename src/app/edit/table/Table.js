import {Loader} from '../../components/components'
import Parse from './Parse'
import React from 'react'


function Table({status, items, remove}){ 
	return(
		<div className="list">
			{
				status === 'error'? <h5>Error</h5>: 
				status === 'request'? <Loader />:
				status === 'success'?
					items.length === 0 ? <h4 className='empty-message'>This dictionary is empty</h4>: 
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
								<tr><th></th></tr>
							</tbody>
						</table> 
				: <></>
			}
		</div>
	)
}

export default Table