import {Advanced} from './advanced'
import {Default} from './default'
import React,{useState} from 'react'
import translateThunkCreator from '../translateThunk'

function Input(props){

	let store = props.store
	const [forUpdate, setUpdate] = useState(true)
	store.subscribe(() => {setUpdate(!forUpdate)})
	let state = store.getState()

	const set = {
		setOrig : (value) => {store.dispatch({type :"ORIG", value})},
		setTran : (value) => {store.dispatch({type :"TRAN", value})},
		setDesc : (value) => {store.dispatch({type :"DESC", value})},
		setTags : (value) => {store.dispatch({type :"TAGS", value})},
	}
	function toggle() {
		store.dispatch({type : "TOGGLE"})
		store.dispatch({type : "HIDE"})
	}
	function clear() {
		store.dispatch({type : "CLEAR"})
	}
	function submit() {
			if (state.forToggle){
				store.dispatch(translateThunkCreator(state.input.original, "en", "ru"))
			}else{ 
				store.dispatch({type:"PUSH", 
					item:{
						original: state.input.original,
						translate: state.input.translate,
						description: state.input.description,
						date: Date.now()
					}
				})
			}
	}

	if(state.forToggle){
		return <Default toggle={toggle} submit={submit} value = {state.input.original} setOriginal = {set.setOrig}/>
	}else{
		return <Advanced toggle={toggle} clear={clear} submit={submit} values = {state.input} set = {set}/>
	}

}

export default Input

