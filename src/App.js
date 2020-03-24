import React from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import EventsPage from './pages/EventsPage'

function App() {
  return (
    <div>
      <Navbar />
      <EventsPage />
      <Footer />
    </div>
  )
}

export default App
