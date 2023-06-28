import './App.css';
import React, {useState, useEffect, useRef} from 'react';

function App() {
    const [diaries, setDiaries] = useState([]);

    const createDiary = (date, text) => ({
        id: Date.now(),
        date,
        text,
        completed: false,
    });

    const addDiary = (date, text) => {
        const newDiary = createDiary(date, text);
        setDiaries([...diaries, newDiary]);
    };

    const today = new Date(); // YYYY-MM-DD 형식을 padStart() 로 맞추자!
    const dateToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const [dateInput, setDateInput] = useState(dateToday);
    const [textInput, setTextInput] = useState('');

    const handleDateChange = event => {
        setDateInput(event.target.value);
    };

    const handleTextChange = event => {
        setTextInput(event.target.value);
    };

    const [editingDiaryId, setEditingDiaryId] = useState(null);
    const [editDateInput, setEditDateInput] = useState('');
    const [editTextInput, setEditTextInput] = useState('');

    const handleEditDateChange = event => {
        setEditDateInput(event.target.value);
    };

    const handleEditTextChange = event => {
        setEditTextInput(event.target.value);
    };

    const editDiary = id => {
        const diaryToEdit = diaries.find(diary => diary.id === id);
        setEditDateInput(diaryToEdit.date);
        setEditTextInput(diaryToEdit.text);
        setEditingDiaryId(id);
    };

    const updateDiary = (id, date, text) => {
        setDiaries(diaries.map(diary =>
            diary.id === id ? {...diary, date, text} : diary
        ));
        setEditingDiaryId(null);
    };

    const handleEditFormSubmit = event => {
        event.preventDefault();
        updateDiary(editingDiaryId, editDateInput, editTextInput);
        if (snackbarTimeoutId.current) {
            clearTimeout(snackbarTimeoutId.current);
        }
        setShowSnackbar('edit');
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar('');
        }, 2500);
    };


    const deleteDiary = id => {
        setDiaries(diaries.filter(diary => diary.id !== id));
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
            addDiary(dateInput, textInput);
            setDateInput(dateToday);
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
            <div>
                <h1>오늘의 한 마디</h1>
            </div>
            <div className="input-section">
                <form onSubmit={handleFormSubmit}>
                    <input type="date" value={dateInput} onChange={handleDateChange}/>
                    <input type="text" value={textInput} onChange={handleTextChange}/>
                    <button type="submit">완료</button>
                </form>
                {editingDiaryId && (
                    <form onSubmit={handleEditFormSubmit}>
                        <input type="date" value={editDateInput} onChange={handleEditDateChange}/>
                        <input type="text" value={editTextInput} onChange={handleEditTextChange}/>
                        <button type="submit">수정</button>
                    </form>
                )}
                {showSnackbar === 'success' && <div className={`snackbar success ${showSnackbar ? 'show' : ''}`}>항목을 추가했어요!</div>}
                {showSnackbar === 'edit' && <div className={`snackbar edit ${showSnackbar ? 'show' : ''}`}>항목을 수정했어요!</div>}
                {showSnackbar === 'error' && <div className={`snackbar error ${showSnackbar ? 'show' : ''}`}>값을 입력해주세요!</div>}

            </div>
            <div className="list-section">
                <div className="list-section">
                    {diaries.map(diary => (
                        <div key={diary.id} className="diary-item">
                            <div className="diary-date">{diary.date}</div>
                            <div className="diary-text">{diary.text}</div>
                            <div className="diary-action">
                                <button onClick={() => editDiary(diary.id)}>수정</button>
                                <button onClick={() => deleteDiary(diary.id)}>삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
