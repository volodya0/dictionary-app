import request from '../../requests/request-translator'
import push from './pushItemThunk'
const from = "ru"
const to = "en"

function validate(word) {
	if (word.length > 1) {
		if((/^[a-zA-Z-]+$/).test(word)){
			return {valid:true, message:"added"}
		}else{
			return {valid:false, message:`"${word}" - that's not a word`}
		}
	}else{
		return {valid:false, message:`enter the word, please`}
	}
}

function autoTranslateThunkCreator(original, from, to){
	return function(dispatch){

		dispatch({
			type: "ALERT",
			message:`Translating ${original}`,
			sign:"primary",
			options:{
				type:"loader",
			}
		})

		if(validate(original).valid){
			request(original, from, to, onSuccess, onFail)
		}else{
			dispatch({
				type:"ALERT", 
				message:validate(original).message,
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
		
		function onSuccess(translate){
			let item = {original, translate, description: "Translated auto", date: Date.now()}
			
			dispatch({
				type: "ALERT",
				message:`Translate for ${original} - ${translate}`,
				sign: "success",
				options:{
					type:"buttons",
					buttons:[
						{
							text:"Ok, add", 
							color:"success", 
							onClick:() => {
								dispatch({type:"CLEAR"})
								dispatch({type:"HIDE"})
								dispatch(push(item))
							}
						},
						{
							text:"Edit", 
							color:"primary", 
							onClick:() => {
								dispatch({type:"ADVANCED", header:"Edit auto-translate"})
								dispatch({type:"HIDE"})
								dispatch({type:"EDIT", item})
							}
						},
						{
							text:"Cancel", 
							color:"danger", 
							onClick:() => {
								dispatch({type:"CLEAR"})
								dispatch({type:"HIDE"})
							}
						}
					]
				}
			})		

		}
		
		function onFail(message){

			dispatch({
				type: "ALERT",
				message: message,
				sign: "warning",
				options:{
					type:"buttons",
					buttons:[
						{
							text:"close", 
							color:"warning", 
							onClick:() => {
								dispatch({type:"HIDE"})
							}
						},
					]
				}
			})

		}

		

	}
}

export default autoTranslateThunkCreator




