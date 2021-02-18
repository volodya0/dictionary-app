import dataRequests from '../requests/request-database'

function getItems(dispatch){
	dispatch({type:"ALERT", message:"Read from database...", sign:"primary", options:{type:"loader"}})
	function onSuccess(object){
		if(object){
			let items = []
			for (const key in object) {
				if (Object.hasOwnProperty.call(object, key)) {
					items.push(object[key])
				}
			}
			dispatch({type:"SET", items})
			dispatch({type:"HIDE"})
		}
	}
	function onFail(message){
		dispatch({type:"ALERT", message, sign:"warning", options:{buttons:[{
			text:"Close", 
			color:"primary", 
			onClick:() => {
				dispatch({type:"HIDE"})
			}
		}]}})
	}
	dataRequests.getAllItems(onSuccess, onFail)
}

export default getItems