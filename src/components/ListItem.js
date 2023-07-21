import React, {useEffect, useRef} from 'react';
import EmojiPicker from './EmojiPicker';

function ListItem({ diary, editingDiaryId, editDateInput, handleEditDateChange, editTextInput, handleEditTextChange, handleEditFormSubmit, cancelEditing, toggleEmojiPicker, showEmojiPickerId, handleEmojiSelect, resetEmoji, editDiary, deleteDiary, setShowEmojiPickerId }) {

    const emojiPickerRef = useRef(null);
    const emojiButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (
                (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) &&
                (emojiButtonRef.current && !emojiButtonRef.current.contains(event.target))
            ) {
                setShowEmojiPickerId(null);
                console.log(emojiButtonRef.current);
                console.log(event.target);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowEmojiPickerId]);


    return (
        <div className="diary-item bg-transparent flex flex-col md:flex-row border-solid border-2 border-sky-300 my-4 md:m-6 py-4 px-4 rounded-2xl">
            {editingDiaryId === diary.id ? (
                <>
                    <div className="diary-date"><input
                        className="py-2 px-2 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600" type="date"
                        value={editDateInput} onChange={handleEditDateChange}/></div>
                    <div className="diary-text flex flex-col md:flex-row">
                        <input className="py-2 px-2 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600" type="text"
                        value={editTextInput} onChange={handleEditTextChange}/></div>
                    <div className="diary-action justify-between w-full">
                        <button className="py-1 md:py-2 px-2 md:px-4 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                type="submit" onClick={handleEditFormSubmit}>저장
                        </button>
                        <button className="py-1 md:py-2 px-2 md:px-4 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                type="button" onClick={cancelEditing}>취소
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="diary-date">
                        <p className="text-base md:text-lg">{diary.date}</p>
                    </div>
                    <div className="diary-text flex flex-col">
                        <p className="my-1 text-xl md:text-2xl">{diary.text}</p>
                        <div className="relative items-center">
                            <button className={"px-2 text-md border-2 bg-white border-blue-300 rounded-full hover:bg-blue-300 hover:border-blue-400 hover:animate-spin hover:text-white"}
                                    onClick={() => toggleEmojiPicker(diary.id)}
                                    onDoubleClick={() => resetEmoji(diary.id)}
                                    ref={emojiButtonRef}
                            >
                                {diary.emoji ? diary.emoji.native : '🫥'}
                            </button>
                            <EmojiPicker
                                showEmojiPicker={showEmojiPickerId === diary.id}
                                emojiPickerRef={emojiPickerRef}
                                diaryId={diary.id}
                                onEmojiSelect={handleEmojiSelect}
                            />
                        </div>
                    </div>
                    <div className="diary-action justify-between w-full">
                        <button className="py-1 md:py-2 px-2 md:px-4 border-2 bg-blue-200 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                onClick={() => editDiary(diary.id)}>수정
                        </button>
                        <button className="py-1 md:py-2 px-2 md:px-4 border-2 bg-blue-200 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                onClick={() => deleteDiary(diary.id)}>삭제
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ListItem;
