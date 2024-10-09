import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useChatStore } from "./store";


function Chatgpt() {
    const [input, setInput] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const {messages, addMessage } = useChatStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input) return;

        try {
            // add input message(user message)
            addMessage({ role: 'user', content: input }) // 异步原因，messages 未生效
            let result;
            setTimeout(async () => {
                const { messages } = useChatStore.getState(); 
                result = await axios.post('/api/azurechatgpt', 
                    { messages: messages }, 
                    { headers: { 'Content-Type': 'application/json' } }
                );
                addMessage({ role: 'assistant', content: result.data.choices[0].message.content });
                setInput(''); // Clear the input after submission
            }, 0); // Ensures it runs after the state update

            // add assistant messages
        } catch (error) {
            console.error('Error fetching response:', error);
            setErrorResponse(error.message || 'Error fetching response. Please try again.');
        }
    };
    // 渲染消息列表
    const renderMessages = () => {
        return messages.map((message, index) => (
            <div key={index} className={`border rounded p-2 ${message.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                <pre className="text-left whitespace-pre-wrap"> 
                    {message.content}
                </pre>
            </div>
        ));
    };
    
    useEffect(() => {
        const chatGptRootContainer = document.querySelector('.chatgptroot');
        chatGptRootContainer.scrollTop = chatGptRootContainer.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
      }, [messages]);

    useEffect(() => {
        const maxHeight = 300; // 你可以根据需要调整最大高度
        const textarea = document.getElementById('auto-resize-textarea');
        const adjustHeight = () => {
            textarea.style.height = 'auto'; // 先将高度设置为 auto，以便重新计算高度
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'; // 根据内容设置高度，但不超过最大高度
        };
        // 添加事件监听器
        textarea.addEventListener('input', adjustHeight);
        // 初始化时调整高度（例如预填充内容）
        adjustHeight();
        // 清理事件监听器
        return () => {
            textarea.removeEventListener('input', adjustHeight);
        };
        }, [input]); // 依赖 input，当 input 发生变化时触发

    return (
        <div className="chatgptroot text-center h-screen overflow-auto">
            <h2 className="text-2xl mb-10">ChatGPT</h2>
            <div className="messages mt-4 p-4 border rounded bg-gray-100">
                {renderMessages()}
            </div>
            <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white p-2">
                <textarea
                    id="auto-resize-textarea"
                    className="border rounded p-2 w-full resize-none"
                    placeholder="Your question here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows="3" // 设置初始行数
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Ask</button>
            </form>

            {errorResponse && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h3 className="font-bold">Response:</h3>
                    <p>{errorResponse}</p>
                </div>
            )}
        </div>
    );
}

export default Chatgpt;