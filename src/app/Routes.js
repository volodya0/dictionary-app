import React from 'react'
import AuthContainer from './auth/AuthContainer'
import MainPage from './main/mainContainer';
import Dictionaries from './dictionaries/DictionariesContainer';
import Edit from './edit/EditContainer'
import {Switch,Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {mapStateToPropsGen} from '../store/store'
import Header from './header'
import colors from '../colors'
import styled from 'styled-components'


function Routes(props){

	const Window = styled.div`
	background-color: ${colors.windowBackground[+props.theme]};
	`
	const Container = styled.div`
	background-color: ${colors.containerBackground[+props.theme]};
	border-color:  ${colors.border[+props.theme]};
	color: ${colors.text[+props.theme]};  
	`	

	if(!props.authorized){
		return <>
			<AuthContainer/>
		</>
	}else{
		return(
			<Window>
				<Container className='container'>
					<Header />
					<Switch>
						<Route path='/main'>
							<MainPage />
						</Route>
						<Route path='/dictionaries'>
							<Dictionaries />
						</Route>
						<Route path='/edit/:id'>
							<Edit />
						</Route>
						<Route path='/'>
							<Redirect to='/main' />
						</Route>
					</Switch>
				</Container>
			</Window>
			
		)
	}			  
}

const Routes_w = connect(mapStateToPropsGen('routes'))(Routes)

export default Routes_w