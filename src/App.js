import React,{useState, useEffect} from 'react'
import firebase from 'firebase'
import AuthContainer from './app/auth/AuthContainer'
import MainPage from './app/main/mainPage';
import Dictionaries from './app/dictionaries/DictionariesContainer';
import Edit from './app/edit/EditContainer'
import {Header} from './app/components/components'
import {BrowserRouter,Switch,Route,useHistory, Redirect} from 'react-router-dom';
import {AuthContext} from './context/Context'

function App() {
  const [user, setUser] = useState(null)

  firebase.auth().onAuthStateChanged(setUser)
  
  return (
    <div className='container'>
      <AuthContext.Provider value={{user}} >
        <BrowserRouter>
          {user ?
            <Switch>
              <Route path='/main'>
                <Header />
                <MainPage />
              </Route>
              <Route path='/dictionaries'>
                <Header />
                <Dictionaries />
              </Route>
              <Route path='/edit/:dictName/:from/:to'>
                <Header />
                <Edit />
              </Route>
              <Route path='/'>
                <Redirect to='/main'/>
              </Route>
            </Switch>
            : 
            <AuthContainer onLogin={setUser}/>
          }
        </BrowserRouter>  
      </AuthContext.Provider>
    </div>
  )


}


export default App;
