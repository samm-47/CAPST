"use client"; // This allows for the use of the useState hooks
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Layout from './chatbot_layout';

const ChatbotPage = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<{type: string; text: string}[]>([]);
    const [hasSentMessage, setHasSentMessage] = useState(false); // Used to track if message sent for moving the chatbar after initial message
    const bottomReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomReference.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Function to send the initial message when the chatbot loads
    const sendInitialMessage = async () => {
        try {
            const initialMessage = "Greet the user with hello, how can I help you? Keep it to one sentence to open";
            const response = await axios.post('http://127.0.0.1:5000/api/chat', {
                question: initialMessage,
            });
            setMessages([
                { type: 'bot', text: response.data.response }, // Add bot's initial response
            ]);
        } catch (error) {
            console.error('Error sending initial message:', error);
        }
    };

    useEffect(() => {
        sendInitialMessage(); // Call to send the initial message
    }, []); // Run this only once when the component mounts

    const handleInputChanges = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    }

    const handleSubmission = async () => {
        setHasSentMessage(true); // Marks when the user has sent the first message
        if (userInput.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'user', text: userInput }
            ]);

            try {
                const response = await axios.post('http://127.0.0.1:5000/api/chat', {
                    question: userInput,
                });

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: 'bot', text: response.data.response }
                ]);
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: 'bot', text: 'Sorry, something went wrong. Please try again later.' }
                ]);
            }
            
            setUserInput('');
        }
    };

    // Function to determine the width class based on the number of words
    const getWidthClass = (text: string) => {
        const wordCount = text.split(' ').length;

        if (wordCount <= 10) {
            return 'max-w-xs';  // Small width for short messages
        } else if (wordCount <= 20) {
            return 'max-w-md';  // Medium width for moderate messages
        } else {
            return 'max-w-lg';  // Wider width for longer messages
        }
    };

    return (
        <Layout>

            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-mint-green to-[#FFFFFF]">
                <h1 className="text-4xl font-bold mt-4">Chatbot</h1>
                <p className="text-lg mt-2 mb-8 text-gray-800">This is the placeholder page for the Chatbot.</p>
                {/* Chat area Post Rendered when first message sent */}    
                {hasSentMessage && (
                    <div className="flex flex-col w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-4 flex-1 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg mb-4 ${getWidthClass(message.text)} ${
                                    message.type === 'user' ? 'bg-blue-100 text-blue-900 ml-auto' : 'bg-gray-200 text-gray-900'
                                }`}
                            >
                                {message.text}
                            </div>
                        ))}
                        <div ref={bottomReference} />
                    </div>
                )}

                {/* Input box with button */}
                <div className={`w-full max-w-3xl rounded-lg p-4 mb-4 flex items-center ${hasSentMessage ? 'sticky bottom-0 bg-white shadow-lg' : ''}`}>
                    <textarea
                        value={userInput}
                        onChange={handleInputChanges}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                handleSubmission();
                                event.preventDefault();
                            }
                        }}
                        className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                        rows={1}
                        placeholder="Message Chatbot"
                    />
                    <button
                        onClick={handleSubmission}
                        className="ml-4 w-10 h-10 bg-blue-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-600 transition duration-100"
                    >
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ChatbotPage;
