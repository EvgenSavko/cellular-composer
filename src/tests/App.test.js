import { render, screen } from '@testing-library/react'
import React, { createContext } from 'react'

import App from '../App'
import Btn from '@Components/Button/Button'

const AuthContext = createContext()

const AuthProvider2 = ({ children }) => {
  const value = {
    currentUser: {
      email: 'test',
      uid: '123',
      emailVerified: true,
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

jest.mock('@Shared/context/AuthContext', () => {
  const useAuth = () => {
    return {
      currentUser: {
        email: 'test',
        uid: '123',
        emailVerified: true,
      },
    }
  }

  return { AuthProvider: AuthProvider2, useAuth }
})

test('renders header title', () => {
  render(<App />)
  const linkElement = screen.getByText(/about us/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders btn title', () => {
  render(<Btn title={'Test'} />)
  const btnElement = screen.getByText(/test/i)
  expect(btnElement).toBeInTheDocument()
})
