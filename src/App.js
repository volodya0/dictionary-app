import React from 'react'
import store from './store/store';
import {Provider} from 'react-redux'
import Routes from './app/Routes'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Provider store = {store}>
        <div className='container'>
          <Routes />
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
