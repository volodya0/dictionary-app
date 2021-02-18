import push from './pushItemThunk'

function handTranslateThunkCreator(item){

	function validate(word, inputName="") {
		if (word.length > 1) {
			if((/^[a-zA-Z?-??-?-]+$/).test(word)){
				return {valid:true, message:"added"}
			}else{
				return {valid:false, message:`${inputName}: "${word}" - that's not a word`}
			}
		}else{
			return {valid:false, message:`enter the ${inputName}, please`}
		}
	}

	return function(dispatch){

		if(validate(item.original).valid){
			if(validate(item.translate).valid){
				dispatch({type:"CLEAR"})
				dispatch(push(item))
				dispatch({type: "HIDE"})
				dispatch({type:"ADVANCED", header:"New item"})
			}else{
				dispatch({
					type:"ALERT", 
					message:validate(item.translate, "translate").message,
					options:{
						type:"buttons",
						buttons:[{
							text:"Close", 
							color:"primary", 
							onClick:() => {
								dispatch({type:"HIDE"})
							}
						}]
					},
				})
			}
		}else{
			dispatch({
				type:"ALERT", 
				message:validate(item.original, "original").message,
				options:{
					type:"buttons",
					buttons:[{
						text:"Close", 
						color:"primary", 
						onClick:() => {
							dispatch({type:"HIDE"})
						}
					}]
				},
			})
		}
		
	}	
}

export default handTranslateThunkCreator