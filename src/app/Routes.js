import React from 'react'
import AuthContainer from './auth/AuthContainer'
import MainPage from './main/mainContainer';
import Dictionaries from './dictionaries/DictionariesContainer';
import Edit from './edit/EditContainer'
import {Switch,Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {mapStateToPropsGen} from '../store/store'
import Header from './header'



function Routes(props){

	if(!props.authorized){
		return <AuthContainer/>
	}else{
		return(
			<div>
				<Header />
				<Switch>
					<Route path='/main'>
						<MainPage/>
					</Route>
					<Route path='/dictionaries'>
						<Dictionaries/>
					</Route>
					<Route path='/edit/:id'>
						<Edit />
					</Route>
					<Route path='/'>
						<Redirect to='/main'/>
					</Route>
				</Switch>
			</div>
		)
	}			  
}

const Routes_w = connect(mapStateToPropsGen('routes'))(Routes)

export default Routes_w