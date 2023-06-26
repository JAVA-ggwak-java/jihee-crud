import './App.css';
import React, {useState} from 'react';

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

    const toggleTodo = id => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    };

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleFormSubmit = event => {
        event.preventDefault();
        if (dateInput && textInput) {
            addTodo(dateInput, textInput);
            setDateInput('');
            setTextInput('');
            setShowSnackbar(false);
        } else {
            setShowSnackbar(true);
            setTimeout(() => {
                setShowSnackbar(false);
            }, 2500);
            
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleFormSubmit}>
                <input type="date" value={dateInput} onChange={handleDateChange} />
                <input type="text" value={textInput} onChange={handleTextChange} />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
            <span
                style={todo.completed ? {textDecoration: 'line-through'} : null}
                onClick={() => toggleTodo(todo.id)}
            >
              {todo.date}: {todo.text}
            </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {showSnackbar && <div className={`snackbar ${showSnackbar ? 'show' : ''}`}>값을 입력해주세요!</div>}
        </div>
    );
}

export default App;
