import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import LandingPage from './pages/LandingPage'
import EventsPage from './pages/EventsPage'
import { PersistGate } from 'redux-persist/integration/react'

//

const App = () => {
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
