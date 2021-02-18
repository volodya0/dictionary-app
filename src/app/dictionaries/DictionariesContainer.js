import React,{useState, useEffect, useContext} from 'react'
import {dictionaryRequests} from '../../requests/request-database'
import Dictionaries from './Dictionaries'
import codes from '../../requests/wordsAndCodes'
import {AuthContext} from '../../context/Context'

function DictionariesContainer(){

	const [addMode, setAddMode] = useState(false)
	const [status, setStatus] = useState({type:'load'})

	const context = useContext(AuthContext)
	const uid = context.auth.user.id

	const langArray = Object.entries(codes)

	function getDict(){
		setStatus({type:'load'})
		dictionaryRequests.getDictionaries({
			uid,
			onSuccess:dictionaries => {
				setStatus(dictionaries.length ? {type:'success', dictionaries}:{type:'empty'})
			},
			onFail:e => alert(e)
		})
	}
	function addDict(name, from, to) {
		setStatus({type:'load'})
		dictionaryRequests.addDictionary({
			dictionary:{uid, name, from, to, words:0, date:Date.now()},
			onSuccess:() => {setAddMode(false); getDict()},
			onFail:e => alert(e)
		})
	}
	function remDict(dictName) {
		setStatus({type:'load'})
		dictionaryRequests.removeDictionary({uid, dictName, onSuccess:() => getDict()})
	}
	
	useEffect(() => {
		getDict()
	}, [])

	
	return (
		<Dictionaries 
			status={status}
			addMode={addMode}
			langArray={langArray}
			get={getDict}
			add={addDict}
			rem={remDict}
			setAddMode={setAddMode}
		/>)
}

export default DictionariesContainer


