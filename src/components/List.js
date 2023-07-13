import React from 'react';
import ListItem from './ListItem';

function List({ diaries, editingDiaryId, editDateInput, handleEditDateChange, editTextInput, handleEditTextChange, handleEditFormSubmit, cancelEditing, toggleEmojiPicker, showEmojiPickerId, emojiPickerRef, emojiButtonRef, handleEmojiSelect, resetEmoji, editDiary, deleteDiary }) {
    return (
        <div className="list-section w-9/12">
            {diaries.map(diary => (
                <ListItem
                    key={diary.id}
                    diary={diary}
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
            ))}
        </div>
    );
}

export default List;
