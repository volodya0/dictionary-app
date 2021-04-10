import firebase from 'firebase'	
import {firebaseConfig} from '../config'
import {translationApiUrl} from '../config'
firebase.initializeApp(firebaseConfig);

var DB = firebase.database()

export const authRequests = {
	create:function({name, email, password, onSuccess, onFail}){
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => 
			firebase.auth().currentUser.updateProfile({displayName: name})
			.then(onSuccess))
		.catch(e => onFail(e.message))
	},
	logIn:function({email, password, onSuccess, onFail}) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(res => onSuccess(res))
		.catch(e => onFail(e.message))
	},
	logOut:function() {
		firebase.auth().signOut()
	},
}

export const dictionaryRequests = {

	getDictionaries:function({uid, onSuccess, onFail}) {
		DB.ref(`/dictionaries/${uid}`).get()
			.then(snapshot => {onSuccess(Object.values(snapshot.val()||[]))})
			.catch(error =>	onFail(`Database error (getDictionaries), error_message = ${error}`))
	},

	addDictionary:function({dictionary, onSuccess, onFail}) {
		DB.ref(`/dictionaries/${dictionary.uid}/${dictionary.date}`)
			.set(dictionary, (e) => e ? onFail(e) : onSuccess())
	},

	removeDictionary:function({uid, dictId, onSuccess, onFail}) {
		DB.ref(`/dictionaries/${uid}/${dictId}`)
			.remove((e) => e ? onFail(e) : DB.ref('/items/'+uid+'/'+dictId)
				.remove((e) => e ? onFail(e) : onSuccess())
			)
	},

	addItem:function(options) {
		DB.ref(`/dictionaries/${options.uid}/${options.dictId}/items/${options.item.date}`).set(options.item, (e) => {
			if(e){
				options.onFail(e.message)
			}else{
				options.onSuccess()
			}
		})
		.catch(function(e) {
			options.onFail(`CATCH. Database error (setItem), error_message = ${e}`)
		});
	},

	removeItem:function(options) {
		DB.ref(`/dictionaries/${options.uid}/${options.dictId}/items/${options.itemId}`).remove((e) => {
			if(e){
				options.onFail(e.message)
			}else{
				options.onSuccess()
			}
		})
		.catch(function(e) {
			options.onFail(`CATCH. Database error (setItem), error_message = ${e}`)
		});
	}
}

export const autoTranslate = ({original, from, to, onSuccess, onFail}) => {
	fetch(`${translationApiUrl}get?q=${original}!&langpair=${from}|${to}`)
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
	
	
