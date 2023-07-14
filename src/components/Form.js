import React from 'react';

function Form({dateInput, handleDateChange, textInput, handleTextChange, handleFormSubmit}) {
    return (
        <form className="input-form flex flex-col md:flex-row" onSubmit={handleFormSubmit}>
            <input className="py-2 px-4 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600 my-2 md:my-0 md:mr-2"
                   placeholder={'Enter date'}
                   type="date" value={dateInput} onChange={handleDateChange}/>
            <input className="py-2 px-4 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600 my-2 md:my-0 md:mr-2"
                   placeholder={'Enter text'}
                   type="text" value={textInput} onChange={handleTextChange}/>
            <button className="py-2 px-4 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400
                              hover:border-blue-500 hover:text-white my-2 md:my-0"
                    type="submit">완료
            </button>
        </form>
    );
}


export default Form;