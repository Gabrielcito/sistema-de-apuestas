import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import { User } from './pages/user'
import { Admin } from './pages/admin'
import { Session } from './pages/sessionGame'
import { GenerateCode } from './components/generateCode'
import { AdminSession } from './pages/adminSessionGame'
import './App.css'

export const App = () => {
  return (
    <>
      <Router>

        <Routes>

          <Route path='/' element={<User/>} />
          <Route path='/admin' element={<Admin/>}>
            <Route path='generatecode' element={<GenerateCode/>}/>
            <Route path='admin-session/:code' element={<AdminSession/>}/>
          </Route>

          <Route path='session/:code' element={<Session/>}/>

        </Routes>

      </Router>
  
    </>
  )
}

