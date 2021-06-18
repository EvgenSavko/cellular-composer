import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '@Shared/context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth()

  return (
    <Route {...rest} render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="/login" />)}></Route>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default PrivateRoute
