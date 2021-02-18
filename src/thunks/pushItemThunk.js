import dataRequests from '../requests/request-database'

function push(item){
	return (dispatch) => {
		dispatch({type:"ALERT", message:"Work with database...", sign:"primary", options:{type:"loader"}})
		dataRequests.pushOnce(item, (e) => {
			if(e){
				dispatch({type:'ALERT', message:`Error database (pushOnce), error_message = ${e}`, sign:"danger"})
			}else{
				dispatch({type:"PUSH", item})
				dispatch({type:'ALERT', message:'Item added!', sign:"success"})
			}
		})
	}
}

export default push