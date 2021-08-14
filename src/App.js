import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'

import '../src/style/antd.scss'

import Login from '@Screens/LogIn'
import { AuthProvider } from '@Shared/context/AuthContext'
import Navbar from '@Components/Navbar'
import PrivateRoute from '@Components/PrivateRoute'

const App = () => {
  console.log('%cRelease: 0.2.3', 'color: white; background: #212529; font-size: 32px')
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/" component={Navbar} />
          </Switch>
        </Router>
        <div className="portal-alert" id="portal-root"></div>
        <div className="portal-loading-user" id="portal-loading-user"></div>
      </div>
    </AuthProvider>
  )
}

export default App
