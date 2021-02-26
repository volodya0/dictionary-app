import {translationApiUrl} from '../config'

export default function request({original, from, to, onSuccess, onFail}){

	fetch(`${translationApiUrl}q=${original}!&langpair=${from}|${to}`)
	.then(response => response.json())
	.then(res => {
		if(res.responseStatus === 200){
			var results = []
			res.matches.forEach(element => {
				if(
					(element.segment !== element.translation)&&
					(element.translation.length < 30)&&
					(element.translation.length > 1)
				){	
					results.push((element.translation).toLocaleLowerCase())
				}
			})
			if(results.length){
				let translate = (results.length === 1)? results[0] : results.join(", ")
				onSuccess(translate)
			}else{
				onFail(`${original} - unknown word, sorry`)
			}
		}else{
			onFail(`server error, sorry`)
		}
	})
	.catch(e => onFail(e))
}