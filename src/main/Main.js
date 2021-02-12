import Table from "./table/table"
import Input from "./input/Input"
import React from 'react'
import Alert from './alert'
import store from './store'

const StoreContext = React.createContext()

const Main = () => {
	return (
		<div className = 'container' >
			<Input store = {store}/>
			<Alert/>	
			<Table store = {store}/>	
		</div>
	)
}

export default Main