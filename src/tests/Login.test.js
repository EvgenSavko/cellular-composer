import { render, screen } from '@testing-library/react'
import { AuthProvider } from '@Shared/context/AuthContext'

import Login from '@Screens/LogIn'

jest.mock('react-router-dom', () => {
  const useHistory = () => {
    return {
      push: () => console.log('pusheeeed'),
    }
  }
  return { useHistory }
})

test('renders Login component', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  )
  const btnElement = screen.getByText(/password/i)
  expect(btnElement).toBeInTheDocument()
})
