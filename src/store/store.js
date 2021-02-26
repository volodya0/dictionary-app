import {createStore ,combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {authRequests, dictionaryRequests} from '../requests/request-database'

function authReducer(state = {authorized:false, user:{}}, action) {
  switch (action.type) {
    case 'SET-USER':
      return {authorized:true, user:action.user}
    case 'LOGOUT':
      return {authorized:false, user:{}}
    default:
      return state
  }
}

function dictReducer(state = [], action) {
  switch (action.type) {
    case 'SET-DICTIONARIES':
      return action.dictionaries
    case 'ADD-DICTIONARY':
      return {...state, [action.dictionary.name] : action.dictionary}
    default:
      return state
  }
}


const rootReducer = combineReducers({auth:authReducer, dictionaries:dictReducer})

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(ReduxThunk)))

export default store

export function mapStateToPropsGen(component){
  switch (component) {
    case 'routes':
      return (state) => {
        return {
          authorized : state.auth.authorized,
        }
      }
    case 'main':
      return (state) => {
        return {
          user : state.auth.user,
          dictCount : state.dictionaries.length,
          itemsCount : state.dictionaries
            .reduce((sum, dict) => {return dict.items ? sum + Object.keys(dict.items).length : sum}, 0)
        }
      }
    case 'dictionaries':
      return (state) => {
        return {
          user : state.auth.user,
          dictionaries: state.dictionaries
        }
      }
    case 'edit':
      return (state) => {
        return {
          user : state.auth.user,
          dictionaries : state.dictionaries
        }
      }
    case 'header':
      return (state) => {
        return {
          email : state.auth.user.email
        }
      }
  
    default:
      return undefined
  }
}



export function mapDispatchToPropsGen(component){
  switch (component) {
    case 'auth':
      return (dispatch) => {
        return {
          setUser : (user) => dispatch({type: 'SET-USER', user}),
        }
      }  
    case 'main':
      return (dispatch) => {
        return {
          refreshDictionaries : (onSuccess, onFail) => {
            dictionaryRequests.getDictionaries({
              uid: store.getState().auth.user.id,
              onSuccess: (dictionaries) => {
                dispatch({type:'SET-DICTIONARIES',  dictionaries})
                onSuccess()
              },
              onFail
            })
          },
          logOut : () => {
            authRequests.logOut()
            dispatch({type:'LOGOUT'})
          }
        }
      }  
    case 'dictionaries':
      return (dispatch) => {
        return {
          refreshDictionaries : (onSuccess, onFail) => {
            dictionaryRequests.getDictionaries({
              uid: store.getState().auth.user.id,
              onSuccess: (dictionaries) => {
                dispatch({type:'SET-DICTIONARIES',  dictionaries})
                onSuccess()
              },
              onFail
            })
          },
        }
      }  
    case 'edit':
      return (dispatch) => {
        return {
          refreshDictionaries : (onSuccess, onFail) => {
            dictionaryRequests.getDictionaries({
              uid: store.getState().auth.user.id,
              onSuccess: (dictionaries) => {
                dispatch({type:'SET-DICTIONARIES',  dictionaries})
                onSuccess()
              },
              onFail
            })
          },
        }
      }  
    case 'header':
      return (dispatch) => {
        return {
          logOut : () => {
            authRequests.logOut()
            dispatch({type:'LOGOUT'})
          }
        }
      }  
    default:
      return undefined
  }
}

