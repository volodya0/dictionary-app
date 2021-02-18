import firebase from 'firebase'	

const firebaseConfig = {
  apiKey: "AIzaSyAG466-7fJtoeCdI4S9UF7M2VTAQCz_CUg",
  authDomain: "translator-dictionary-b7d19.firebaseapp.com",
  databaseURL: "https://translator-dictionary-b7d19-default-rtdb.firebaseio.com",
  projectId: "translator-dictionary-b7d19",
  storageBucket: "translator-dictionary-b7d19.appspot.com",
  messagingSenderId: "203294751206",
  appId: "1:203294751206:web:682983322e20d082f8fe27"
};

firebase.initializeApp(firebaseConfig);
var DB = firebase.database()

export const authRequests = {
	create:function(email, password, onSuccess, onFail){
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(res => {onSuccess(res)})
		.catch(e => {onFail(e)})
	},
	logIn:function(email, password, onSuccess, onFail) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(res => {onSuccess(res)})
		.catch(e => {onFail(e)})
	},
	logOut:function() {
		firebase.auth().signOut()
		.then(res => console.log(res))
		.catch(e => alert("sign out error, e = "+e))
	},
	addUser:function(user, handler){	
		DB.ref('/users/'+user.id).set(user, handler);		
	},
	getUser:function(id,onSuccess, onFail) {
		DB.ref('/users/'+id).get()
		.then(function(snapshot) {
			if (snapshot.exists()) {
				onSuccess(snapshot.val())
			}
			else {
				onFail("Is empty");
			}
		})
		.catch(function(e) {
			onFail(`Database error (getUser), error_message = ${e}`)
		});
	},
}

export const dictionaryRequests = {

	getDictionaries:function({uid, onSuccess, onFail}) {
		DB.ref(`/dictionaries/${uid}`).get()
			.then(snapshot => onSuccess(Object.values(snapshot.val()||[])))
			.catch(error =>	onFail(`Database error (getDictionaries), error_message = ${error}`))
	},

	addDictionary:function({dictionary, onSuccess, onFail}) {
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



	
	
