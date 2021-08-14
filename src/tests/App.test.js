import { render, screen } from '@testing-library/react'
import App from '../App'
import Btn from '@Components/Button/Button'

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
