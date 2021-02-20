import firebase from 'firebase'	
import {firebaseConfig} from '../config'
firebase.initializeApp(firebaseConfig);

var DB = firebase.database()

export const authRequests = {
	userInfo:function() {
		return firebase.auth().currentUser
	},
	create:function({name, email, password, onSuccess, onFail}){
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => firebase.auth().updateCurrentUser({displayName: name}).then(onSuccess))
		.catch(e => onFail(e.message))
	},
	logIn:function({email, password, onSuccess, onFail}) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(res => onSuccess(res))
		.catch(e => onFail(e.message))
	},
	logOut:function() {
		firebase.auth().signOut()
		.catch(e => alert("sign out error, e = "+e))
	},
}
window.Auth = authRequests 

export const dictionaryRequests = {

	getDictionaries:function({uid, onSuccess, onFail}) {
		DB.ref(`/dictionaries/${uid}`).get()
			.then(snapshot => onSuccess(Object.values(snapshot.val()||[])))
			.catch(error =>	onFail(`Database error (getDictionaries), error_message = ${error}`))
	},

	addDictionary:function({dictionary, onSuccess, onFail}) {
		console.log(dictionary)
		DB.ref(`/dictionaries/${dictionary.uid}/${dictionary.name}`)
			.set(dictionary, (e) => e ? onFail(e) : onSuccess())
	},

	removeDictionary:function({uid, dictName, onSuccess, onFail}) {
		DB.ref(`/dictionaries/${uid}/${dictName}`)
			.remove((e) => e ? onFail(e) : DB.ref('/items/'+uid+'/'+dictName)
				.remove((e) => e ? onFail(e) : onSuccess())
			)
	},

	updateWordsCount:function({uid, dictName , count, onSuccess}) {
		DB.ref(`/dictionaries/${uid}/${dictName}/words`)
			.set(count, e => e ? alert(e) : onSuccess())
	}

	
}

export const itemsRequests = {

	getItems:function(options) {
		DB.ref(`/items/${options.uid}/${options.dictName}`).get()
			.then(function(snapshot) {
				if (snapshot.exists()) {
					options.onSuccess(Object.values(snapshot.val()))
				}else {
					options.onSuccess([])
				}
			})
			.catch(function(e) {
				options.onFail(`CATCH. Database error (getItems), error_message = ${e}`)
			});
	},

	addItem:function(options) {
		DB.ref(`/items/${options.uid}/${options.dictName}/${options.item.date}`).set(options.item, (e) => {
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

	removeItem:function({uid, dictName, itemId, onSuccess}){
		DB.ref(`/items/${uid}/${dictName}/${itemId}`).remove(onSuccess())
	}
}



	
	
