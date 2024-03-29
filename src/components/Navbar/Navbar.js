import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import { Menu } from 'antd'

import firebase from '@Shared/firebase/firebase'
import { useAuth } from '@Shared/context/AuthContext'
import Home from '@Screens/Home'
import About from '@Screens/About'
import routes from './routes'

const Navbar = () => {
  let { pathname } = useLocation()
  const getKeyUrl = () => pathname.split('/')[1] || 'home'
  const [current, setCurrent] = useState(getKeyUrl())
  const { setCurrentUser } = useAuth()

  const handleClick = (e) => setCurrent(e.key)

  const logout = (event, url) => {
    if (url.includes('logout')) {
      event.preventDefault()
      setCurrentUser(null)
      firebase.auth().signOut()
    }
  }

  return (
    <div>
      <header className="App-header">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          {routes.map(({ key, label, url, icon }) => (
            <Menu.Item key={key} icon={icon}>
              <Link to={url} onClick={(e) => logout(e, url)}>
                {label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </header>
      <div className="App-body">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Navbar
