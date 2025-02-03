"use client"; // This allows for the use of the useState hooks
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Layout from './chatbot_layout';

import Link from "next/link";

const ChatbotPage = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<{type: string; text: string}[]>([]);
    const [hasSentMessage, setHasSentMessage] = useState(false); // Used to track if message sent for moving the chatbar after initial message
    const [loading, setLoading] = useState(false); // Loading state tracker for when waiting for Chatbot response
    const [loadingDots, setLoadingDots] = useState(''); // States for loading dots animation
    const [showScrollToTop, setShowScrollToTop] = useState(false); // State for Scroll to top button
    const [showScrollToBottom, setShowScrollToBottom] = useState(false); // State for Scroll to bottom button
    const bottomReference = useRef<HTMLDivElement>(null);

    const initialMessage = {
        type: "bot",
        text: "Hello, how can I help you?",
    };

    // Load previous messages from localStorage change in future to database type
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const savedMessages = localStorage.getItem("chatHistory");

                if (savedMessages) {
                    const parsedMessages = JSON.parse(savedMessages);

                    if (parsedMessages.length > 0) {
                        setMessages(parsedMessages); // Use saved messages if available

                        // Check if only the initial message is present
                        if (parsedMessages.length === 1 && parsedMessages[0].text === initialMessage.text) {
                            setHasSentMessage(false); // Treat it as if no user interaction has occurred
                        } else {
                            setHasSentMessage(true); // User has interacted
                        }
                    }
                } else {
                    // No saved messages, set initial state
                    setMessages([initialMessage]);
                    setHasSentMessage(false);
                    localStorage.setItem("chatHistory", JSON.stringify([initialMessage])); // Save initial message to localStorage
                }
            } catch (error) {
                console.error("Error loading localStorage data:", error);
            }
        }
    }, []);

    
    

    // Function to save the messages to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('chatHistory', JSON.stringify(messages));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }
    }, [messages]);
    

    useEffect(() => {
        bottomReference.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Makes sure top of window in view when started up
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    // Event handler for scroll-to-top button
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    };
    // Event handler for scroll-to-bottom button
    const scrollToBottom = () => {
        bottomReference.current?.scrollIntoView({behavior: 'smooth'});
    };

    // Scroll listener event
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            // Show scroll-to-top button when not near top
            setShowScrollToTop(scrollPosition > 200); // Adjust threshold for the scroll to top button visibility
            // Show the scroll-to-bottom button if not near the bottom
            const isNearBottom = windowHeight + scrollPosition >= documentHeight - 100;
            setShowScrollToBottom(!isNearBottom);
        };
    
        window.addEventListener('scroll', handleScroll); // Runs handle scroll every time scrolled
        return () => window.removeEventListener('scroll', handleScroll); // Should prevent memory leaks by unmounting
    }, []);

    const handleInputChanges = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    }

    const handleSubmission = async () => {
        setHasSentMessage(true); // Marks when the user has sent the first message
        if (userInput.trim()) {
            // Clear user input before prompting bot for more seamless transitions
            const currentUserInput = userInput;
            setUserInput('');

            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'user', text: currentUserInput }
            ]);
            setLoading(true); // Starts the loading state
            try {
                const response = await axios.post('https://capst.onrender.com/api/chat', {
                    question: currentUserInput,
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
            } finally {
                setLoading(false); // Ends the loading state
            }
        }
    };
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingDots((prev) => {
                    if (prev === '...') return '.';  // Reset to one dot after three
                    else return prev + '.';          // Add a dot each time
                });
            }, 500); // 500ms interval for each dot update 300-500 mess around with

            return () => clearInterval(interval); // Clear interval when loading stops
        } else {
            setLoadingDots(''); // Reset dots string when not loading
        }
    }, [loading]);

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

    // Function to clear chat history
    const clearChatHistory = () => {
        localStorage.removeItem("chatHistory");
        setMessages([initialMessage]);
        setHasSentMessage(false);
    };
    return (
        <Layout>

            <div className="default-page-bg">
                <h1 className="page-title">Chatbot</h1>
                <p className="page-caption text-center mx-auto break-words max-w-[90%] sm:max-w-[70%]">
                    Ask our Chatbot anything about sustainable housing and living!
                </p>
                {/* Chat area Post Rendered when first message sent */}    
                {hasSentMessage && (  
                    <div className="flex items-start w-full max-w-4xl mb-4">
                        <div className="flex max-w-3xl ml-16 flex-col flex-1 bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
                            {messages.map((message, index) => (
                                <div key={index} className="flex flex-col"> {/* Wrap each message for icon rendering structure to work */}
                                    {/* Conditionally render the icon above bot messages */}
                                    {message.type !== 'user' && (
                                        <i className="fa-solid fa-user-tie text-gray-500 mb-1 self-start"></i> // Icon for bot messsages
                                    )}
                                    
                                    <div
                                        className={`p-3 rounded-lg mb-4 ${getWidthClass(message.text)} ${
                                            message.type === 'user' ? 'bg-blue-100 text-blue-900 ml-auto' : ' text-gray-900'
                                        } break-words`} // This will break up long words into wrappable segments
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            {loading && ( // Renders a loading indicator
                                <div className="p-3 font-bold rounded-lg mb-4 text-gray-900 max-w-xs">
                                    {loadingDots}  {/* loads animated dots */}
                                </div>
                            )}
                            
                            <div ref={bottomReference} />
                        </div>
                            {/* Clear Chat History Button */}
                            <button
                                onClick={clearChatHistory}
                                className="ml-4 w-10 h-10 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition flex items-center justify-center"
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                    </div>           
                )}
                
                {/* Scroll-to-top button */}
                <div className="fixed top-20 z-10 py-2">
                    {showScrollToTop && (
                        <button
                            onClick={scrollToTop}
                            className="mx-auto w-10 h-10 border-2 border-blue-500 bg-transparent text-black rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 transition duration-100"
                        >
                            <i className="fa-solid fa-arrow-up"></i>
                        </button>
                    )}
                </div>
                {/* Scroll-to-bottom button */}
                <div className="fixed bottom-20 z-10 py-2">
                    {showScrollToBottom && (
                        <button
                            onClick={scrollToBottom}
                            className="w-10 h-10 border-2 border-blue-500 bg-transparent text-black rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-100"
                        >
                            <i className="fa-solid fa-arrow-down"></i>
                        </button>
                    )}
                </div>
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
                {/* Footer link to FAQ */}
                {hasSentMessage &&
                    (
                    <div className="flex-row-centered h-[8vh]">
                        <Link className="flex-row-centered gap-[0.75vw]" href="/faq" passHref>
                        <i className="footer-icon fa-solid fa-lg fa-question-circle"></i> {/*} Question Mark Icon*/}
                        <p className="footer-text"> How was our AI-powered chatbot developed? </p>
                        </Link>
                    </div> 
                    )
                }
            </div>
        </Layout>
    );
};

export default ChatbotPage;
