import { Head } from "./head"
import { Body } from "./body"
import React from 'react'

function Table(props){
	
	return(<div className="list">
		<table className="table">
			<Head />
			<Body store={props.store}/>
		</table>
		</div>
	)
}

export default Table