import React,{useReducer} from 'react'
import AuthContainer from './app/auth/AuthContainer'
import MainPage from './app/main/mainPage';
import Dictionaries from './app/dictionaries/DictionariesContainer';
import Edit from './app/edit/EditContainer'
import {Header} from './app/components/components'
import {BrowserRouter,Switch,Route,useHistory, Redirect} from 'react-router-dom';
import {AuthContext} from './context/Context'

function App() {

  const initialState = {
    auth:{
      authorized:false,
      user:{}
    }
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {...state, auth:{authorized:true, user:action.user}}
      case 'LOGOUT':
        return {...state, auth:{authorized:false, user:{}}}
      default :
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const onLogin = (user) => dispatch({type:'LOGIN', user})
  const onLogout = () => dispatch({type:'LOGOUT'})

  return (
    <div className='App container'>
      <AuthContext.Provider value={{auth:state.auth, onLogout}} >
        <BrowserRouter>
          {state.auth.authorized ? 
            <Switch>
              <Route path='/main'>
                <Header />
                <MainPage />
              </Route>
              <Route path='/dictionaries'>
                <Header />
                <Dictionaries />
              </Route>
              <Route path='/edit/:name'>
                <Header />
                <Edit />
              </Route>
            </Switch>
          :<AuthContainer onLogin={onLogin}/>
          }
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}


export default App;
