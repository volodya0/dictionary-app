
import {createStore ,combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {authRequests, dictionaryRequests} from '../requests/requests'

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

function themeReducer(state = false, action) {
  switch (action.type) {
    case 'THEME-DEFAULT':
      return false
    case 'THEME-DARK':
      return true
    case 'THEME-TOGGLE':
      return !state
    default:
      return state
  }
}

function languageReducer(state = 0, action) {
  switch (action.type) {
    case 'LANG-EN':
      return 0
    case 'LANG-RU':
      return 1
    case 'LANG-TOGGLE':
      return +!state
    default:
      return state
  }
}


const rootReducer = combineReducers({auth:authReducer, dictionaries:dictReducer, theme:themeReducer, lang:languageReducer})

const store = createStore(rootReducer, {}, composeWithDevTools())

export default store

export function mapStateToPropsGen(component){
  switch (component) {
    case 'auth':
      return (state) => {
        return {
          theme : state.theme,
          lang : state.lang
        }
      }
    case 'routes':
      return (state) => {
        return {
          authorized : state.auth.authorized,
          theme : state.theme,
        }
      }
    case 'main':
      return (state) => {
        return {
          lang : state.lang,
          theme : state.theme,
          user : state.auth.user,
          dictCount : state.dictionaries.length,
          itemsCount : state.dictionaries
            .reduce((sum, dict) => {return dict.items ? sum + Object.keys(dict.items).length : sum}, 0)
        }
      }
    case 'dictionaries':
      return (state) => {
        return {
          lang : state.lang,
          theme : state.theme,
          user : state.auth.user,
          dictionaries: state.dictionaries
        }
      }
    case 'edit':
      return (state) => {
        return {
          lang : state.lang,
          theme : state.theme,
          user : state.auth.user,
          dictionaries : state.dictionaries
        }
      }
    case 'header':
      return (state) => {
        return {
          lang : state.lang,
          email : state.auth.user.email,
          theme : state.theme
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
          },
          themeToggle : () => {
            dispatch({type:'THEME-TOGGLE'})
          },
          languageToggle : (code) => {
            dispatch({type: `LANG-${code.toUpperCase()}`})
          }
        }
      }  
    default:
      return undefined
  }
}

