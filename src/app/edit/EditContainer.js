import React,{useState, useEffect, useCallback} from 'react'
import {dictionaryRequests}  from '../../requests/request-database'
import translateRequest from '../../requests/request-translator'
import InputContainer from './input/InputContainer'
import {useRouteMatch} from 'react-router-dom'
import Table from './table/Table'
import {connect} from 'react-redux'
import {mapDispatchToPropsGen, mapStateToPropsGen} from '../../store/store'

const EditContainer = (props) => {

	const [status, setStatus] = useState('ok')
	const uid = props.user.id
	const dictId = useRouteMatch().params.id
	const dictionary = props.dictionaries.find(dict => dict.date == dictId)
	const items = dictionary.items? Object.values(dictionary.items) : []

	function add(item, onSuccess) {
		setStatus('request')
		item = {...item,	date:Date.now()}
		dictionaryRequests.addItem({
			uid,dictId,item,
			onSuccess:() => {
				props.refreshDictionaries(
					() => {setStatus('success'); onSuccess()},
					() => setStatus('fail')
				)
			},
			onFail:() => setStatus('fail')
		})
	}

	function remove(itemId) {
		setStatus('request')
		dictionaryRequests.removeItem({
			uid, dictId, itemId,
			onSuccess:() => {
				props.refreshDictionaries(
					() => setStatus('success'),
					() => setStatus('fail')
				)
			}
		})
	}


	function translate(original, onSuccess, onFail) {
		translateRequest({original, from:'en', to:'ru', onSuccess, onFail})
	}

	const refresh = useCallback(() => {
		props.refreshDictionaries(() => setStatus('success'),() => setStatus('fail'))}, [props])
		
	useEffect(() => {
		refresh()
	}, [refresh])

	return (
		<>
			<InputContainer add={add} translate={translate}/>
			<Table status={status} items={items} remove={remove} />
		</>
	)
}

const Edit_w = connect(mapStateToPropsGen('edit'), mapDispatchToPropsGen('edit'))(EditContainer)

export default Edit_w