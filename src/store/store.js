import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension"
import ReduxThunk from 'redux-thunk'

const initial={
		auth:{
			authorized:false,
			user:{}
		},
		toggle:{
			isDefault: true,
			header:"Auto"
		},
		input:{
			original: "",
			translate: "",
			description: "",
			date: ""
			},
		items:[],
		alert:{
			sign:"warning",
			show:false,
			message:"",
			options:{}
		},
		dictionaries:[
			{
				first : {
					date : 1613294520361,
					items :[ 
						{
							date : 1613294520361,
							original : "first in dictionary",
							translate : "?????? ? ???????",
							description: ""
						}
					],
					"language" : "en-ru"
				}
			},
		]
	}

function toggleReducer(state = initial.toggle, action) {
	switch (action.type) {
	case 'DEFAULT':
		return {isDefault:true, header:action.header}
	case 'ADVANCED':
		return {isDefault:false, header:action.header}
	default:
		return state
	}
}
function inputReducer(state = initial.input, action) {
	switch (action.type) {
		case 'ORIG':
			return {...state, original: action.value}
		case 'TRAN':
			return {...state, translate: action.value}
		case 'DESC':
			return {...state, description: action.value}
		case 'CLEAR':
			return {original:"",translate:"",description:""}
		case 'EDIT':
			return {...action.item}
		default:
			return state
	}
}
function itemsReducer(state = initial.items, action) {
  switch (action.type) {
    case 'PUSH':
      return [action.item, ...state]
		case 'SET-ITEMS':
			return [...action.items]
    default:
      return state
  }
}
function dictionariesReducer(state = initial.dictionaries, action) {
  switch (action.type) {
    // case 'PUSH':
    //   return [action.item, ...state]
		case 'SET-DIC':
			return [...action.dictionaries]
    default:
      return state
  }
}
function alertReducer(state = initial.alert, action) {
  switch (action.type) {
    case 'ALERT':
      return {
				show:true,
				message:action.message,
				sign:action.sign||"warning",
				options:{...action.options}
			}
    case 'HIDE':
      return {show:false}
    default:
      return state
  }
}
function authReducer(state = initial.auth, action){
	switch (action.type) {
    case 'LOGIN':
      return {authorized:true, user:action.user}
    case 'LOGOUT':
      return {authorized:false, user:{}}
    default:
      return state
  }
}


const rootReducer = combineReducers({auth:authReducer, toggle:toggleReducer, input:inputReducer, items:itemsReducer, dictionaries:dictionariesReducer, alert:alertReducer})
 
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))

export default store

