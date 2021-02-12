import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension"
import ReduxThunk from 'redux-thunk'

const initial={
	forToggle:true,
	input:{
		original: "",
		translate: "",
		description: "",
		date: ""
		},
	items:
		[
			{
				original: "test_orig",
				translate: "test_translate",
				description: "test_desc",
				tags: "test_tag",
				date: "1613122911083"
			},
			{
				original: "test_orig2",
				translate: "test_translate2",
				description: "test_desc2",
				tags: "test_tag2",
				date: "1613122929244"
			}
		],
		alert:{
			sign:"warning",
			show:false,
			message:"",
			options:{}
		}
	}

function toggleReducer(state = initial.forToggle, action) {
	switch (action.type) {
	case 'TOGGLE':
		return !state
	case 'ADVANCED':
		return false
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


const rootReducer = combineReducers({ forToggle:toggleReducer, input:inputReducer, items:itemsReducer, alert:alertReducer})
 
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))

export default store

