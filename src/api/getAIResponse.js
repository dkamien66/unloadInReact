export const getAIResponse = async ( data ) => {
    try {
        const res = await fetch('http://localhost:3001/chat', {
            method: 'POST',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: data }]
            })
        })
        
        if (!res.ok) { // In case of 404 status error, which fetch will not catch
            throw new Error(`Response status: ${res.status}`);
        }

        const reflection = await res.json();
        return reflection.message.content;
    } catch (error) {
        console.error(error.message);
    }

}