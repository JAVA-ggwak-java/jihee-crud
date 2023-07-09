import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("Diary app", () => {
  let dateInput, textInput, submitButton;

  beforeEach(() => {
    render(<App />);
    dateInput = screen.getByPlaceholderText('Enter date');
    textInput = screen.getByPlaceholderText('Enter text');
    submitButton = screen.getByRole('button', { name: /완료/i });
  });

  test('한 줄 일기 생성 및 읽기', () => {
    userEvent.type(dateInput, '2023-06-27');
    userEvent.type(textInput, 'New diary entry');
    userEvent.click(submitButton);

    expect(screen.getByText('2023-06-27')).toBeInTheDocument();
    expect(screen.getByText('New diary entry')).toBeInTheDocument();
  });


  test('한 줄 일기 삭제', async () => {
    userEvent.type(dateInput, '2023-06-27');
    userEvent.type(textInput, 'Diary entry to delete');
    userEvent.click(submitButton);

    const deleteButton = await screen.findByRole('button', { name: /삭제/i });
    userEvent.click(deleteButton);

    expect(screen.queryByText('Diary entry to delete')).toBeNull();
  });

  test('한 줄 일기 수정', async () => {
    userEvent.type(dateInput, '2023-06-27');
    userEvent.type(textInput, 'Diary entry to delete');
    userEvent.click(submitButton);

    const updateButton = await screen.findByRole('button', { name: /수정/i });
    userEvent.click(updateButton);

    const editTextInput = await screen.findByPlaceholderText('Enter text');
    userEvent.clear(editTextInput);
    userEvent.type(editTextInput, 'Updated diary entry');

    const saveButton = screen.getByRole('button', { name: /저장/i });
    userEvent.click(saveButton);

    expect(screen.getByText('Updated diary entry')).toBeInTheDocument();

  });

});
