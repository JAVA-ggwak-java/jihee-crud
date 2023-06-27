import './App.css';
import React, {useState, useEffect, useRef} from 'react';

function App() {
    const [todos, setTodos] = useState([]);

    const createTodo = (date, text) => ({
        id: Date.now(),
        date,
        text,
        completed: false,
    });

    const addTodo = (date, text) => {
        const newTodo = createTodo(date, text);
        setTodos([...todos, newTodo]);
    };

    const [dateInput, setDateInput] = useState('');
    const [textInput, setTextInput] = useState('');

    const handleDateChange = event => {
        setDateInput(event.target.value);
    };

    const handleTextChange = event => {
        setTextInput(event.target.value);
    };

    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editDateInput, setEditDateInput] = useState('');
    const [editTextInput, setEditTextInput] = useState('');

    const handleEditDateChange = event => {
        setEditDateInput(event.target.value);
    };

    const handleEditTextChange = event => {
        setEditTextInput(event.target.value);
    };

    const editTodo = id => {
        const todoToEdit = todos.find(todo => todo.id === id);
        setEditDateInput(todoToEdit.date);
        setEditTextInput(todoToEdit.text);
        setEditingTodoId(id);
    };

    const updateTodo = (id, date, text) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, date, text} : todo
        ));
        setEditingTodoId(null);
    };

    const handleEditFormSubmit = event => {
        event.preventDefault();
        updateTodo(editingTodoId, editDateInput, editTextInput);
        if (snackbarTimeoutId.current) {
            clearTimeout(snackbarTimeoutId.current);
        }
        setShowSnackbar('edit');
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar('');
        }, 2500);
    };


    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const [showSnackbar, setShowSnackbar] = useState('');
    const snackbarTimeoutId = useRef(null);

    useEffect(() => {
        return () => {
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
            }
        };
    }, []);

    const handleFormSubmit = event => {
        event.preventDefault();
        if (dateInput && textInput) {
            addTodo(dateInput, textInput);
            setDateInput('');
            setTextInput('');
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
            }
            setShowSnackbar('success');
        } else {
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
            }
            setShowSnackbar('error');
        }
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar('');
        }, 2500);
    };



    return (
        <div className="App">
            <div className="input-section">
                <form onSubmit={handleFormSubmit}>
                    <input type="date" value={dateInput} onChange={handleDateChange}/>
                    <input type="text" value={textInput} onChange={handleTextChange}/>
                    <button type="submit">Add Todo</button>
                </form>
                {editingTodoId && (
                    <form onSubmit={handleEditFormSubmit}>
                        <input type="date" value={editDateInput} onChange={handleEditDateChange}/>
                        <input type="text" value={editTextInput} onChange={handleEditTextChange}/>
                        <button type="submit">Update Todo</button>
                    </form>
                )}
                {showSnackbar === 'success' && <div className={`snackbar success ${showSnackbar ? 'show' : ''}`}>항목을 추가했어요!</div>}
                {showSnackbar === 'edit' && <div className={`snackbar edit ${showSnackbar ? 'show' : ''}`}>항목을 편집했어요!</div>}
                {showSnackbar === 'error' && <div className={`snackbar error ${showSnackbar ? 'show' : ''}`}>값을 입력해주세요!</div>}

            </div>
            <div className="list-section">
                <table>
                    <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>
                                {todo.date}
                            </td>
                            <td>
                                {todo.text}
                            </td>
                            <td>
                                <button onClick={() => editTodo(todo.id)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
