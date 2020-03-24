import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'

if (module.hot) module.hot.accept()

ReactDOM.render(<App />, document.getElementById('root'))
