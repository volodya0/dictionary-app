import React from 'react'
import store from './store/store';
import {Provider} from 'react-redux'
import Routes from './app/Routes'

function App() {
  return (
    <Provider store = {store}>
      <div className='container'>
        <Routes />
      </div>
    </Provider>
  )
}

export default App;
