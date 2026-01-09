import ollama from 'ollama'
import express from 'express'

const app = express();
const port = 3001;

app.use(express.json()); // read raw bytes from HTTP body and turn req.body into JSON

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Methods', 'POST');
    next();
});

app.post('/chat', async (req, res) => { 
    const response = await ollama.chat({
        model: 'gemma3',
        messages: req.body.messages,
    });

    res.json(response); // used inside route, send the JSON value back to the sender
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});