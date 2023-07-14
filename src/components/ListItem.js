import React from 'react';
import EmojiPicker from './EmojiPicker';

function ListItem({ diary, editingDiaryId, editDateInput, handleEditDateChange, editTextInput, handleEditTextChange, handleEditFormSubmit, cancelEditing, toggleEmojiPicker, showEmojiPickerId, emojiButtonRef, emojiPickerRef, handleEmojiSelect, resetEmoji, editDiary, deleteDiary }) {

    return (
        <div className="diary-item bg-transparent border-solid border-2 border-sky-300 my-4 md:m-6 py-2 px-4 rounded-2xl">
            {editingDiaryId === diary.id ? (
                <>
                    <div className="diary-date"><input
                        className="py-2 px-2 border-2 border-blue-400 rounded-md" type="date"
                        value={editDateInput} onChange={handleEditDateChange}/></div>
                    <div className="diary-text"><input
                        className="py-1 px-2 border-2 border-blue-400 rounded-md" type="text"
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
                        <div className="relative" ref={emojiButtonRef}>
                            <button className={"px-2 text-md border-2 bg-white border-blue-300 rounded-full hover:bg-blue-300 hover:border-blue-400 hover:animate-spin hover:text-white"}
                                    onClick={() => toggleEmojiPicker(diary.id)}
                                    onDoubleClick={() => resetEmoji(diary.id)}
                            >
                                {diary.emoji ? diary.emoji.native : '🫥'}
                            </button>
                            <EmojiPicker
                                showEmojiPicker={showEmojiPickerId === diary.id}
                                emojiPickerRef={emojiPickerRef}
                                onEmojiSelect={(emoji) => handleEmojiSelect(emoji, diary.id)}
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
