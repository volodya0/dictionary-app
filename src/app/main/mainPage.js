import store from '../../store/store'
import React,{useContext} from 'react';
import {AuthContext} from '../../context/Context'

function MainPage(){

	const context = useContext(AuthContext)

		return(
			<>
				<div>
					<h1>Welcome</h1>
					<h1> {context.auth.user.name}</h1>
					<h1> {context.auth.user.email}</h1>
					<h1> {context.auth.user.id}</h1>
					{/* <h1> {context.auth.user.metadata.length}</h1> */}
				</div>
			</>
		)
}

export default MainPage