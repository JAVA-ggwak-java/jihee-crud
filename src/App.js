import './App.css'; // 필요없음
import React, {useState, useEffect, useRef} from 'react';
import Snackbar from './components/Snackbar.js';
import Form from './components/Form';
import List from './components/List';

function App() {
    const [diaries, setDiaries] = useState([]);

    const createDiary = (date, text) => ({
        id: Date.now(),
        date,
        text,
        emoji: null,
    });

    const addDiary = (date, text) => {
        const newDiary = createDiary(date, text);
        setDiaries([newDiary, ...diaries]);
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

    const cancelEditing = () => {
        setEditingDiaryId(null);
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
            setShowSnackbar(false);
        }
        setTimeout(() => {
            setMessage('edit');  // 'success' 메시지 설정
            setShowSnackbar(true);
        }, 50);
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar(false);
        }, 2500);
    };


    const deleteDiary = id => {
        setDiaries(diaries.filter(diary => diary.id !== id));
        if (snackbarTimeoutId.current) {
            clearTimeout(snackbarTimeoutId.current);
            setShowSnackbar(false);
        }
        setTimeout(() => {
            setMessage('delete');  // 'success' 메시지 설정
            setShowSnackbar(true);
        }, 50);
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar(false);
        }, 2500);
    };

    const [showSnackbar, setShowSnackbar] = useState(false);
    const snackbarTimeoutId = useRef(null);
    const [message, setMessage] = useState('');

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
                setShowSnackbar(false);
            }
            setTimeout(() => {
                setMessage('success');  // 'success' 메시지 설정
                setShowSnackbar(true);
            }, 50);
        } else {
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
                setShowSnackbar(false);
            }
            setTimeout(() => {
                setMessage('error');  // 'success' 메시지 설정
                setShowSnackbar(true);
            }, 50);
        }
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar(false);
        }, 2500);
    };

    const [showEmojiPickerId, setShowEmojiPickerId] = useState(null);
    const emojiPickerRef = useRef();
    const emojiButtonRef = useRef();

    useEffect(() => {
        const handleClickOutside = event => {
            if (
                emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
                emojiButtonRef.current && !emojiButtonRef.current.contains(event.target)
            ) {
                setShowEmojiPickerId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleEmojiPicker = id => {
        setShowEmojiPickerId(prevId => (prevId === id ? null : id));
    };

    const handleEmojiSelect = (emoji, id) => {
        setDiaries(
            diaries.map(diary =>
                diary.id === id ? {...diary, emoji} : diary
            )
        );
        setShowEmojiPickerId(null);  // close the emoji picker after selection
    };

    const resetEmoji = id => {
        setDiaries(
            diaries.map(diary =>
                diary.id === id ? {...diary, emoji: null} : diary
            )
        );
    };

    return (
        <main className="App bg-blue-100 h-screen flex flex-col items-center space-y-5 overflow-auto scrollbar-hide py-10">
            <div>
                <h1 className="text-4xl text-blue-600">오늘의 할 일</h1>
            </div>
            <div className="input-section border-solid border-2 border-sky-400 py-4 px-8 rounded-2xl">
                <Form dateInput={dateInput}
                      handleDateChange={handleDateChange}
                      textInput={textInput}
                      handleTextChange={handleTextChange}
                      handleFormSubmit={handleFormSubmit}
                />
                {showSnackbar && <Snackbar showSnackbar={showSnackbar} message={message} />}
            </div>
            <List
                diaries={diaries}
                editingDiaryId={editingDiaryId}
                editDateInput={editDateInput}
                handleEditDateChange={handleEditDateChange}
                editTextInput={editTextInput}
                handleEditTextChange={handleEditTextChange}
                handleEditFormSubmit={handleEditFormSubmit}
                cancelEditing={cancelEditing}
                toggleEmojiPicker={toggleEmojiPicker}
                showEmojiPickerId={showEmojiPickerId}
                emojiPickerRef={emojiPickerRef}
                emojiButtonRef={emojiButtonRef}
                handleEmojiSelect={handleEmojiSelect}
                resetEmoji={resetEmoji}
                editDiary={editDiary}
                deleteDiary={deleteDiary}
            />
        </main>
    );
}

export default App;
