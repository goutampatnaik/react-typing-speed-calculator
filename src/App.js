import React, { useState, useEffect } from 'react';
import './styles.css';

const TIME_DURATION = 6;

export default function App() {
    const [text, setText] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    const ref = React.useRef(0);

    const handleTextChange = e => setText(e.target.value);
    const handleClear = () => setText('');

    const handleStart = () => {
        setText('');
        setTimeRemaining(TIME_DURATION);
        setTimerRunning(true);
    };

    useEffect(() => {
        const timerID = setTimeout(() => {
            // Stop when time runs out
            if (timeRemaining > 0) {
                setTimeRemaining(prevVal => {
                    const timeRemain = --prevVal;
                    // Stop timer
                    if (timeRemain === 0) setTimerRunning(false);

                    return timeRemain;
                });
            } else {
                clearTimeout(timerID);
            }
        }, 1000);

        ref.current = ref.current + 1;

        // Clear timer on every re-render
        return () => clearTimeout(timerID);
    }, [timeRemaining]);

    useEffect(() => {
        // Split the textarea text into array of words
        const words = text
            .trim()
            .split(' ')
            .filter(el => el !== '');

        setWordCount(words.length);
    }, [text]);

    return (
        <div className="App">
            <h3>Check your typing speed. Click Start to begin</h3>

            <textarea
                disabled={!timerRunning}
                onChange={handleTextChange}
                value={text}
            />
            <div>
                <label>Time remaining: {timeRemaining}s</label>
                <label>Words: {wordCount}</label>
            </div>
            <button disabled={timerRunning} onClick={handleStart}>
                Start
            </button>
            <button disabled={timerRunning} onClick={handleClear}>
                Reset
            </button>
            <p>Keep track of re-renders with useRef().</p>
            <p>This component has been re-rendered {ref.current} times.</p>
        </div>
    );
}
