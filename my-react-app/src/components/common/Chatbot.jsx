import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Namaste! How can I help you with your Ayurvedic health journey today?' }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleSend = () => {
        if (input.trim() === '') return;
        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'bot', text: 'Thank you for your question. I am analyzing it based on Ayurvedic principles...' }]);
        }, 1000);
    };
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50" aria-label="Toggle Chatbot">
                {isOpen ? <X size={28} /> : <Bot size={28} />}
            </button>
            <div className={`fixed bottom-24 right-6 w-[350px] h-[500px] bg-slate-900/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col transition-all duration-500 z-40 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="p-4 border-b border-white/20">
                    <h3 className="text-white font-semibold text-lg text-center">AyurBot Assistant</h3>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.from === 'bot' && <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-white" /></div>}
                            <div className={`max-w-[75%] p-3 rounded-2xl ${msg.from === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-700 text-gray-200 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                <div className="p-4 border-t border-white/20">
                    <div className="flex items-center bg-slate-800 rounded-full">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about your diet..." className="w-full bg-transparent text-white px-4 py-2 focus:outline-none" />
                        <button onClick={handleSend} className="p-2 text-white hover:text-purple-300 transition-colors">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:block fixed bottom-4 right-4 bg-slate-800 text-white px-3 py-2 rounded">
                Chatbot
            </div>
        </div>
    );
};

export default Chatbot;