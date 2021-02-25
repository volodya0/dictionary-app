import React,{useState, useReducer} from 'react'
import AuthContainer from './auth/AuthContainer'
import MainPage from './main/mainContainer';
import Dictionaries from './dictionaries/DictionariesContainer';
import Edit from './edit/EditContainer'
import {Loader} from './components/components'
import {BrowserRouter,Switch,Route, Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux'
import {mapStateToPropsGen} from '../store/store'



function Routes(props){

	if(!props.authorized){
		return <AuthContainer/>
	}else{
		return(
			<BrowserRouter>
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
			</BrowserRouter>
		)
	}			  
}

const Routes_w = connect(mapStateToPropsGen('routes'))(Routes)

export default Routes_w