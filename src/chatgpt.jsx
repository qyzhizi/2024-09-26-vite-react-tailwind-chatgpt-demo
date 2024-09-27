import React, { useState } from 'react';
import axios from 'axios';

function Chatgpt() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input) return;

        try {
            const result = await axios.post('/api/chatgpt', {text: input },
                {headers: {'Content-Type': 'application/json', },}
            );
            // Log the result to the console for debugging
            console.log('Response from API:', result);

            setResponse(result.data.choices[0].message.content);
            setInput(''); // Clear the input after submission
        } catch (error) {
            console.error('Error fetching response:', error);
            setResponse('Error fetching response. Please try again.');
        }
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl mb-10">ChatGPT</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border rounded p-2"
                    placeholder="Your question here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Ask</button>
            </form>
            {response && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h3 className="font-bold">Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}

export default Chatgpt;