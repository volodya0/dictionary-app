import React,{useState, useEffect, useCallback} from 'react'
import {dictionaryRequests} from '../../requests/request-database'
import Dictionaries from './Dictionaries'
import codes from '../../requests/wordsAndCodes'
import {connect} from 'react-redux'
import {mapStateToPropsGen, mapDispatchToPropsGen} from '../../store/store'

function DictionariesContainer(props){

	const [addMode, setAddMode] = useState(false)
	const [status, setStatus] = useState('ok')
	const langArray = Object.entries(codes)
	const uid = props.user.id

	const refresh = useCallback(() => {
		setStatus('request')
		props.refreshDictionaries(
			() => setStatus('success'),
			() => setStatus('fail')
		)
	}, [setStatus])
	
	function addDict(name, from, to) {
		setStatus('request')
		dictionaryRequests.addDictionary({
			dictionary:{uid, name, from, to, date:Date.now()},
			onSuccess:() => {setAddMode(false); refresh()},
			onFail:() => {}
		})
	}

	function remDict(dictId) {
		setStatus('request')
		dictionaryRequests.removeDictionary({uid, dictId, onSuccess:() => refresh()})
	}

	useEffect(() => {
		refresh()
	}, [refresh])
	
	return (
		<Dictionaries 
			status={status}
			addMode={addMode}
			langArray={langArray}
			refresh={refresh}
			dictionaries={props.dictionaries}
			add={addDict}
			rem={remDict}
			setAddMode={setAddMode}
		/>)
}

const Dictionaries_w = connect(mapStateToPropsGen('dictionaries'), mapDispatchToPropsGen('dictionaries'))(DictionariesContainer)

export default Dictionaries_w 

