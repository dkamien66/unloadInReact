import { useState } from 'react';

let nextId = 5;
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // 0-indexed
const day = today.getDate();

const todayStr = `${year}-${month+1}-${day}`;

export default function UploadData({ onUpload }) {
    const [text, setText] = useState('');

    return (
        <>
            <input
            name='text'
            placeholder="Type how your day went"
            value={text}
            onChange={(e) => setText(e.target.value)} />
            <button
            onClick={() => {
                setText('');
                onUpload({
                    id: nextId++,
                    date: todayStr,
                    description: text
                });
            }}>Upload</button>
        </>
    );
}