import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import { User } from './pages/user'
import { Admin } from './pages/admin'
import { Session } from './pages/sessionGame'
import './App.css'

export const App = () => {
  return (
    <>
      <Router>

        <Routes>

          <Route path='/' element={<User/>} />
          <Route path='/admin' element={<Admin/>}/>

          <Route path='session/:code' element={<Session/>}/>

        </Routes>

      </Router>
  
    </>
  )
}

