import React,{useEffect, useState, useCallback} from 'react';
import MainPage from './mainPage'
import {connect} from 'react-redux'
import {mapDispatchToPropsGen, mapStateToPropsGen} from '../../store/store'
import './main.css'

function MainContainer(props){

	const [status, setStatus] = useState('ok')

	const refresh = useCallback(() => {
		props.refreshDictionaries(() => setStatus('success'),() => setStatus('fail'))}, [props])

	useEffect(() => {	
		setStatus('request')
		refresh(
			() => setStatus('success'),
			() => setStatus('fail')
		)
	}, [refresh])

	return (
		<MainPage 
			lang = {props.lang}
			theme={props.theme}
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