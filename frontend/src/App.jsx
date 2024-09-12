import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UpdateExpense from './components/UpdateExpense'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={ <Home />}></Route>
        <Route path='/update/:id' element={ <UpdateExpense />}></Route>
      </Routes>
    </Router>

    </>
  )
}

export default App
