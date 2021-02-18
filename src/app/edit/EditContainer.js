import React,{useState, useEffect, useContext, useCallback} from 'react'
import {itemsRequests, dictionaryRequests}  from '../../requests/request-database'
import {useRouteMatch } from 'react-router-dom'
import {AuthContext} from '../../context/Context'
import InputContainer from './input/InputContainer'
import Table from './table/Table'


const EditContainer = (props) => {

  const uid = useContext(AuthContext).auth.user.id
	const dictName = useRouteMatch().params.name

	const [items, setItems] = useState([])
	const [tableState, setTableState] = useState({status:'request'})
  useEffect(() => {itemsRequests.getItems({
		uid,
		dictName,
		onSuccess:(items) => {
			if(items.length){
				setTableState({status:'success'})
				setItems(items)
			}else{
				setTableState({status:'empty'})
			}
		},
		onFail:(error) => setTableState({status: 'error', message:error})
	})},[])
		
	function add(item, onSuccess, onFail) {
		item = {...item,	date:Date.now()}
		itemsRequests.addItem({
			uid,dictName,item,
			onSuccess:() => {
				setItems([item, ...items])
				setTableState({status:'success'}) 
				dictionaryRequests.updateWordsCount({
					uid,dictName,onSuccess,
					count:items.length+1
				})
			},
			onFail
		})
	}

	function remove(itemId, onSuccess) {
		itemsRequests.removeItem({
			uid, dictName, itemId,
			onSuccess:() => {
				setItems(items.filter(item => item.date !== itemId))
				setTableState({status: 'success'}) 
				dictionaryRequests.updateWordsCount({
					uid,dictName,onSuccess,
					count:items.length-1
				})
			}
		})
	}
		
	return (
		<>
			<InputContainer add={add} />
			<Table state={tableState} items={items} remove={remove} />
		</>
	)
}

export default EditContainer