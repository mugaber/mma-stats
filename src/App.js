import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import LandingPage from './pages/LandingPage'
import EventsPage from './pages/EventsPage'

function App() {
  return (
    <Router>
      <>
        <Navbar />

        <Route exact path='/' component={LandingPage} />

        <Switch>
          <Route exact path='/events' component={EventsPage} />
        </Switch>

        <Footer />
      </>
    </Router>
  )
}

export default App
