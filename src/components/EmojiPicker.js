import React from 'react';
import Picker from '@emoji-mart/react';

function EmojiPicker({ showEmojiPicker, emojiPickerRef, onEmojiSelect }) {
    // ref={emojiPickerRef} -> emojiPickerRef.current
    return showEmojiPicker ? (
        <div className="absolute top-full z-10" ref={emojiPickerRef}>
            <Picker onEmojiClick={onEmojiSelect}/>
        </div>
    ) : null;
}

export default EmojiPicker;
