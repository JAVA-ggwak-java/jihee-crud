import React from 'react';
import './Snackbar.css';

function Snackbar({showSnackbar, message}) {
    if (!showSnackbar) {
        console.log("showSnackbar is null!");
        return null;
    }
    console.log("showSnackbar is not null!");
    let backgroundColor = '';

    if (message === 'success') {
        backgroundColor = 'bg-green-500/75';
    } else if (message === 'edit') {
        backgroundColor = 'bg-blue-500/75';
    } else if (message === 'error') {
        backgroundColor = 'bg-red-500/75';
    } else if (message === 'delete') {
        backgroundColor = 'bg-gray-500/75';
    }

    let displayMessage = '';

    if (message === 'success') {
        console.log("showSnackbar is success!");
        displayMessage = '항목을 추가했어요!';
        console.log(displayMessage);
    } else if (message === 'edit') {
        console.log("showSnackbar is edit!");
        displayMessage = '항목을 수정했어요!';
        console.log(displayMessage);
    } else if (message === 'error') {
        console.log("showSnackbar is error!");
        displayMessage = '값을 입력해주세요!';
        console.log(displayMessage);
    } else if (message === 'delete') {
        console.log("showSnackbar is delete!");
        displayMessage = '항목을 삭제했어요!';
        console.log(displayMessage);
    }

    return (
        <div className={`${backgroundColor} snackbar ${showSnackbar ? 'show' : ''}`}>
            {displayMessage}
        </div>
    );
}


export default Snackbar;