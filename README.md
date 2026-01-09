Trying to receate this project experience https://www.linkedin.com/feed/update/urn:li:activity:7375684045785137152/ in React from scratch.

How to run this project:

1. Start the virtual environment in root directory
   `source .venv/bin/activate`

2. Install all dependencies
   `npm install`
   `pip install ollama`
   `ollama pull gpt-oss`
   `npm i ollama`

3. Run the Ollama server
   `ollama serve`

4. Run the backend
   `node src/backend/backend.js`

5. Run the frontend
   `cd src/frontend`
   `npm start`

\*\*Problems I encountered

- Ollama has a JS API, so I tried to have a React browser that used another file for getting AI responses. Unfortunately, browsers cannot access filesystems, which Ollama needs to do, so i need the following architecture: Ollama runs in Node (backend), React talks to it via HTTP
- This is a sign I need to learn more about full-stack
- from chatgpt "If a library talks to the OS, filesystem, or localhost models → it belongs in the backend."

If someone asks you to explain the tech stack of this:
Backend = Node + Ollama (port 3001)
Frontend = React (port 3000)

I think I need to learn express app and json more...

Having this error:
"Access to fetch at 'http://localhost:3001/chat' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource."

- CORS is Cross-Origin Resource Sharing
