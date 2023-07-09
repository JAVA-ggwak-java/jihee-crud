import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

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
                <h1 className="text-4xl text-blue-600">오늘의 일기</h1>
            </div>
            <div className="input-section border-solid border-2 border-sky-400 py-4 px-8 rounded-2xl">
                <form className="input-form" onSubmit={handleFormSubmit}>
                    <input className="py-2 px-4 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600" placeholder={'Enter date'}
                           type="date" value={dateInput} onChange={handleDateChange}/>
                    <input className="py-2 px-4 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600" placeholder={'Enter text'}
                           type="text" value={textInput} onChange={handleTextChange}/>
                    <button className="py-2 px-4 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white" type="submit">완료
                    </button>
                </form>
                {showSnackbar === 'success' &&
                    <div className={`bg-green-500/75 snackbar ${showSnackbar ? 'show' : ''}`}>항목을 추가했어요!</div>}
                {showSnackbar === 'edit' &&
                    <div className={`bg-blue-500/75 snackbar ${showSnackbar ? 'show' : ''}`}>항목을 수정했어요!</div>}
                {showSnackbar === 'error' &&
                    <div className={`bg-red-500/75 snackbar ${showSnackbar ? 'show' : ''}`}>값을 입력해주세요!</div>}
            </div>
            <div className="list-section w-9/12">
                {diaries.map(diary => (
                    <div key={diary.id}
                         className="diary-item bg-transparent border-solid border-2 border-sky-300 m-4 py-4 px-8 rounded-2xl">
                        {editingDiaryId === diary.id ? (
                            <>
                                <div className="diary-date"><input
                                    className="py-1 px-2 border-2 border-blue-400 rounded-md" type="date"
                                    value={editDateInput} onChange={handleEditDateChange}/></div>
                                <div className="diary-text"><input
                                    className="py-1 px-2 border-2 border-blue-400 rounded-md" type="text"
                                    value={editTextInput} onChange={handleEditTextChange}/></div>
                                <div className="diary-action justify-between w-full">
                                    <button className="py-1 px-2 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                            type="submit" onClick={handleEditFormSubmit}>저장
                                    </button>
                                    <button className="py-1 px-2 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                            type="button" onClick={cancelEditing}>취소
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="diary-date">
                                    <p>{diary.date}</p>
                                </div>
                                <div className="diary-text flex flex-col">
                                    <p className="my-1">{diary.text}</p>
                                    <div className="relative" ref={emojiButtonRef}>
                                        <button className={"px-2 text-xl border-2 bg-white border-blue-300 rounded-full hover:bg-blue-300 hover:border-blue-400 hover:animate-spin hover:text-white"}
                                                onClick={() => toggleEmojiPicker(diary.id)}
                                                onDoubleClick={() => resetEmoji(diary.id)}
                                        >
                                            {diary.emoji ? diary.emoji.native : '🫥'}
                                        </button>
                                        {showEmojiPickerId === diary.id && (
                                            <div className="absolute top-full z-10" ref={emojiPickerRef}>
                                                <Picker data={data} onEmojiSelect={(emoji) => handleEmojiSelect(emoji, diary.id)}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="diary-action justify-between w-full">
                                    <button className="py-1 px-2 border-2 bg-blue-200 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                            onClick={() => editDiary(diary.id)}>수정
                                    </button>
                                    <button className="py-1 px-2 border-2 bg-blue-200 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                            onClick={() => deleteDiary(diary.id)}>삭제
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}

export default App;
