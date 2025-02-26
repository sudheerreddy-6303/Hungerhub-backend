import React from 'react'
import LandingPage from './vendedashboard/pages/LandingPage'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import NotFound from './vendedashboard/components/notFound'

const App = () => {
  return (
    <>
    <Routes>
     
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  
    </>
  )
}

export default App