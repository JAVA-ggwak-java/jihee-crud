import React from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'

function EmojiPicker({ showEmojiPicker, emojiPickerRef, onEmojiSelect, diaryId}) {

    return showEmojiPicker ? (
        <div className="absolute top-full z-10" ref={emojiPickerRef}>
            <Picker data={data} onEmojiSelect={(emoji) => onEmojiSelect(emoji, diaryId)}/>
        </div>
    ) : null;
}

export default EmojiPicker;
