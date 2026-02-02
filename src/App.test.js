import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const elems = screen.getAllByText(/desa karangkepoh/i);
  expect(elems.length).toBeGreaterThan(0);
});
