import { useState } from 'react';

export default function VoiceToTextButton({ onUpload }) {
    const [isListening, setIsListening] = useState(false);
    const [transcription, setTranscription] = useState(null);

    // Code for Voice to Text functionality
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // result captured only once at start
    recognition.lang = "en-US";
    recognition.interimResults = false; // want only final results
    recognition.maxAlternatives = 1;

    function handleVoiceRecord() {
        setIsListening(true);
        setTranscription(null);
        recognition.start();
        console.log("Ready to receive journal entry.");
    }

    recognition.onresult = function(event) {
        setIsListening(false);
        const text = event.results[0][0].transcript;
        setTranscription(text);
        // onUpload(text);
    }

    recognition.onspeechend = () => {
        setIsListening(false);
        recognition.stop();
    }

    recognition.onnomatch = (event) => {
        setIsListening(false);
        console.log("Spoken term wasn't recognized.");
    }

    recognition.onerror = (event) => {
        setIsListening(false);
        console.log("Error occurred in recognition: " + event.error);
    }

    function closeResponseCard() {
        setTranscription(null);
    }

    function confirmResponseCard() {
        setTranscription(null);
        onUpload(transcription);
    }

    return (
        <>
            <button 
                className="circle-button"
                onClick={() => handleVoiceRecord()}
                disabled={isListening}>
                {isListening ? 'Listening...' : 'Press to record'}
            </button>

            {transcription && (
                <div className="response-card-overlay" onClick={closeResponseCard}>
                    <div className="response-card" onClick={(e) => e.stopPropagation()}>
                        <h2 className="response-title">Here is what was heard:</h2>
                        <div className="response-content">{transcription}</div>
                        <br />
                        <div className="cancel-confirm-button-container">
                            <button className="cancel-button" onClick={closeResponseCard}>Cancel</button> 
                            <button className="confirm-button" onClick={confirmResponseCard}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}