import {Loader} from '../../components/components'
import Parse from './Parse'
import React from 'react'
import styled from 'styled-components'
import colors from '../../../colors'
import { EditTexts as Text } from '../../../languages'

function Table({status, items, remove, theme, lang}){ 

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
					items.length === 0 ? <h4 className='empty-message'>{Text.empty_text[lang]}</h4>: 
						<TableStyled className="table">
							<thead>
								<tr>
									<th className="Num_col">№</th>
									<th className="Orig_col">{Text.orig_table_text[lang]}</th>
									<th className="Tran_col">{Text.tran_table_text[lang]}</th>
									<th className="Desc_col">{Text.desc_table_text[lang]}</th>
									<th className="Date_col">{Text.date_table_text[lang]}</th>
									<th className="Opt_col">{Text.remove_table_text[lang]}</th>
								</tr>
							</thead>
							<tbody>
								{
									items.map((item,number) => 
										<Parse 
										  lang = {lang}
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