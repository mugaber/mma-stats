import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import App from './App'

const rednerApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

if (process.env.NODE_ENV !== 'production' && module.hot)
  module.hot.accept('./App', rednerApp)

//

rednerApp()
