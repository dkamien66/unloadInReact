import { useState } from 'react';


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
                onUpload(text);
            }}>Upload</button>
        </>
    );
}