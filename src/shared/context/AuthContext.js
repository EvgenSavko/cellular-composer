import React, { useEffect, useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import firebase from '@Shared/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [user, loadingUser] = useAuthState(firebase.auth())

  useEffect(() => {
    user && !currentUser && setCurrentUser(user)
    !user && currentUser && setCurrentUser(null)
  }, [user, currentUser])

  const value = {
    currentUser,
    loadingUser,
    setCurrentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export { AuthProvider, useAuth }
