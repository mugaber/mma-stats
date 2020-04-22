import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import LandingPage from './pages/Landing'
import EventsPage from './pages/Events'
import FightersPage from './pages/Fighters'
import FighterPage from './pages/Fighter'
import SignupPage from './pages/Signup'

import { loadUser } from './redux/auth/actions'

//

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path='/signup' component={SignupPage} />

            <>
              <Navbar />

              <Route exact path='/' component={LandingPage} />

              <Route exact path='/events' component={EventsPage} />

              <Route exact path='/fighters' component={FightersPage} />

              <Route exact path='/fighter/:id' component={FighterPage} />

              <Footer />
            </>
          </Switch>
        </PersistGate>
      </Router>
    </Provider>
  )
}

export default App
