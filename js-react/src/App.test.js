import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("Diary app", () => {
  test('creates and adds a new diary', () => {
    render(<App />);

    const dateInput = screen.getByPlaceholderText('Enter date');
    const textInput = screen.getByPlaceholderText('Enter text');
    const submitButton = screen.getByRole('button', { name: /완료/i });

    userEvent.type(dateInput, '2023-06-27');
    userEvent.type(textInput, 'New diary entry');
    userEvent.click(submitButton);

    expect(screen.getByText('2023-06-27')).toBeInTheDocument();
    expect(screen.getByText('New diary entry')).toBeInTheDocument();
  });
});
