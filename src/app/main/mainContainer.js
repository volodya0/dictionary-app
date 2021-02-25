import React,{useContext, useEffect, useState, useReducer} from 'react';
import MainPage from './mainPage'
import {connect} from 'react-redux'
import {mapDispatchToPropsGen, mapStateToPropsGen} from '../../store/store'

function MainContainer(props){

	const [status, setStatus] = useState('ok')

	useEffect(() => {	
		setStatus('request')
		props.refreshDictionaries(
			() => setStatus('success'),
			() => setStatus('fail')
		)
	}, [])

	return (
		<MainPage 
			status={status}
			user={props.user}
			dictCount={props.dictCount}
			itemsCount={props.itemsCount}
			logOut={props.logOut}
		/>
	)
}

const Main_w = connect(mapStateToPropsGen('main'), mapDispatchToPropsGen('main'))(MainContainer)

export default Main_w