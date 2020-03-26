import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import LandingPage from './pages/LandingPage'
import EventsPage from './pages/EventsPage'

import setAuthToken from './utils/setAuthToken'
import { loadUser } from './redux/auth/actions'

//

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

//

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />

          <Route exact path='/' component={LandingPage} />

          <Switch>
            <Route exact path='/events' component={EventsPage} />
          </Switch>

          <Footer />
        </PersistGate>
      </Router>
    </Provider>
  )
}

export default App
