import { useState } from 'react';
import { initialData } from "../placeholder_data/data.js";

let nextId = initialData.length;

export default function UploadData({ onUpload, todayStr }) {
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