import React,{useContext} from 'react';
import {AuthContext} from '../../context/Context'

function MainPage(){

	const context = useContext(AuthContext)

		return(
			<>
				<div className='main-section'>
					<h1>Welcome {context.user.email}</h1>
					{/* <h1> {context.auth.user.metadata.length}</h1> */}
				</div>
			</>
		)
}

export default MainPage