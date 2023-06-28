import { render, screen } from '@testing-library/react';
import App from './App';

test('냅다 테스트를 만들어봐', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
