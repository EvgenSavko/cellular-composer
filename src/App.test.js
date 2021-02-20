import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const linkElement = screen.getByText(/cellular composer/i);
  expect(linkElement).toBeInTheDocument();
});
