import {Loader} from '../../components/components'
import Parse from './Parse'
import React from 'react'
import styled from 'styled-components'
import colors from '../../../colors'


function Table({status, items, remove, theme}){ 

	const ListStyled = styled.div`
		border-color: ${colors.border[+theme]};
	`
	const TableStyled = styled.table`
		color: ${colors.text[+theme]};
		border-color: ${colors.border[+theme]};
		
	`

	return(
		<ListStyled className="list">
			{
				status === 'error'? <h5>Error</h5>: 
				status === 'request'? <Loader />:
				status === 'success'?
					items.length === 0 ? <h4 className='empty-message'>This dictionary is empty</h4>: 
						<TableStyled className="table">
							<thead>
								<tr>
									<th className="col-1">#</th>
									<th className="col-3">Original</th>
									<th className="col-3">Translate</th>
									<th className="col-3">Description</th>
									<th className="col-1">Date</th>
									<th className="col-1">Options</th>
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
							</tbody>
						</TableStyled> 
				: <></>
			}
		</ListStyled>
	)
}

export default Table