"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Layout from "./chatbot_layout";
import Link from "next/link";

const page_title = "Chatbot";
const page_caption = "Learn more about sustainable living!";

// Common prompts for quick access
const prompt_1 = "How can I make my house more sustainable?";
const prompt_2 = "Easy ways to increase renewable energy";
const prompt_3 = "What is sustainable living?";

type ChatMessage = {
    type: string;
    text: string;
};

type SavedChat = {
    title: string;
    messages: ChatMessage[];
    timestamp: number; // Add a timestamp field
};

const ChatbotPage = () => {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [hasSentMessage, setHasSentMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");
    const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
    const [currentChatIndex, setCurrentChatIndex] = useState<number | null>(null);
    const [faqQuestion, setFaqQuestion] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const hasProcessedFAQ = useRef(false);
    const bottomReference = useRef<HTMLDivElement>(null);
    
    const getRelativeTime = (timestamp: number): string => {
        const now = Date.now();
        const diffInMilliseconds = now - timestamp;
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return "Today";
        } else if (diffInDays === 1) {
            return "Yesterday";
        } else if (diffInDays <= 3) {
            return "Last 3 days";
        } else if (diffInDays <= 7) {
            return "Last 7 days";
        } else if (diffInDays <= 30) {
            return "Last 30 days";
        } else {
            return "Older";
        }
    };

    const groupChatsByRelativeTime = (chats: SavedChat[]) => {
        const groupedChats: { [key: string]: SavedChat[] } = {};

        chats.forEach((chat) => {
            const relativeTime = getRelativeTime(chat.timestamp);
            if (!groupedChats[relativeTime]) {
                groupedChats[relativeTime] = [];
            }
            groupedChats[relativeTime].push(chat);
        });

        return groupedChats;
    };

    const initialMessage = {
        type: "bot",
        text: "Hello, how can I help you?",
    };
    const toggleSidebar = () => {
        console.log("Toggling sidebar. Current state:", isSidebarOpen);
        setIsSidebarOpen((prevState) => !prevState);
    };
    
    
    

    // Load previous messages and saved chats from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const savedMessages = localStorage.getItem("chatHistory");
                const savedChats = localStorage.getItem("savedChats");
                const savedChatIndex = localStorage.getItem("currentChatIndex");

                if (savedMessages) {
                    const parsedMessages: ChatMessage[] = JSON.parse(savedMessages);

                    if (parsedMessages.length > 0) {
                        setMessages(parsedMessages);

                        if (parsedMessages.length === 1 && parsedMessages[0].text === initialMessage.text) {
                            setHasSentMessage(false);
                        } else {
                            setHasSentMessage(true);
                        }
                    }
                } else {
                    setMessages([initialMessage]);
                    setHasSentMessage(false);
                    localStorage.setItem("chatHistory", JSON.stringify([initialMessage]));
                }

                if (savedChats) {
                    const parsedChats: SavedChat[] = JSON.parse(savedChats);
                    setSavedChats(parsedChats);
                }

                if (savedChatIndex !== null) {
                    setCurrentChatIndex(JSON.parse(savedChatIndex));
                }
            } catch (error) {
                console.error("Error loading localStorage data:", error);
            }
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem("chatHistory", JSON.stringify(messages));
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        }
    }, [messages]);

    // Handle input changes
    const handleInputChanges = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleSubmission = async (text?: string) => {
        setHasSentMessage(true);
        const currentUserInput = text || userInput;

        if (currentUserInput.trim()) {
            setUserInput("");

            const updatedMessages = [
                ...messages,
                { type: "user", text: currentUserInput },
            ];
            setMessages(updatedMessages);

            setLoading(true);
            try {
                // Generate a title for the chat
                const titleResponse = await axios.post("https://capst.onrender.com/api/generate_title", {
                    input: currentUserInput,
                });
                const title = titleResponse.data.title;

                // Get the chatbot's response
                const response = await axios.post("https://capst.onrender.com/api/chat", {
                    question: currentUserInput,
                });

                const finalMessages = [
                    ...updatedMessages,
                    { type: "bot", text: response.data.response },
                ];
                setMessages(finalMessages);

                const savedChats: SavedChat[] = JSON.parse(localStorage.getItem("savedChats") || "[]");
                const currentTimestamp = Date.now(); // Get the current timestamp

                if (currentChatIndex !== null) {
                    // Update an existing chat
                    const updatedChats = [...savedChats];
                    updatedChats[currentChatIndex] = {
                        title: savedChats[currentChatIndex].title,
                        messages: finalMessages,
                        timestamp: currentTimestamp, // Update the timestamp
                    };
                    const sortedChats = updatedChats.sort((a, b) => b.timestamp - a.timestamp); // Sort chats by timestamp
                    setSavedChats(sortedChats);
                    localStorage.setItem("savedChats", JSON.stringify(sortedChats));
                } else {
                    // Create a new chat
                    const newSavedChats: SavedChat[] = [
                        ...savedChats,
                        {
                            title,
                            messages: finalMessages,
                            timestamp: currentTimestamp, // Add the timestamp
                        },
                    ];
                    const sortedChats = newSavedChats.sort((a, b) => b.timestamp - a.timestamp); // Sort chats by timestamp
                    setSavedChats(sortedChats);
                    localStorage.setItem("savedChats", JSON.stringify(sortedChats));
                    setCurrentChatIndex(sortedChats.length - 1);
                    localStorage.setItem("currentChatIndex", JSON.stringify(sortedChats.length - 1));
                }
            } catch (error) {
                console.error("Error:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: "bot", text: "Sorry, something went wrong. Please try again later." },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };

    // Loading dots animation
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingDots((prev) => {
                    if (prev === "...") return ".";
                    else return prev + ".";
                });
            }, 500);

            return () => clearInterval(interval);
        } else {
            setLoadingDots("");
        }
    }, [loading]);

    // Function to determine the width class based on the number of words
    const getWidthClass = (text: string) => {
        const wordCount = text.split(" ").length;

        if (wordCount <= 10) {
            return "max-w-xs";
        } else if (wordCount <= 20) {
            return "max-w-md";
        } else {
            return "max-w-lg";
        }
    };

    // Clear chat history
    const clearChatHistory = () => {
        localStorage.removeItem("chatHistory");
        setMessages([initialMessage]);
        setHasSentMessage(false);
        setCurrentChatIndex(null);
    };

    const startNewChat = () => {
        setMessages([initialMessage]);
        setHasSentMessage(false);
        localStorage.setItem("chatHistory", JSON.stringify([initialMessage]));
        setCurrentChatIndex(null);
        localStorage.removeItem("currentChatIndex");
    
        // Close the sidebar on mobile devices
        if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
            setIsSidebarOpen(false);
        }
    };

    // Load a saved chat
   
const loadSavedChat = (index: number) => {
    const savedChats: SavedChat[] = JSON.parse(localStorage.getItem("savedChats") || "[]");
    const sortedChats = savedChats.sort((a, b) => b.timestamp - a.timestamp); // Sort chats by timestamp

    if (sortedChats[index]) {
        setMessages(sortedChats[index].messages);
        setHasSentMessage(true);
        setCurrentChatIndex(index); // Set the currentChatIndex to the correct index
        localStorage.setItem("currentChatIndex", JSON.stringify(index));

        // Close the sidebar on mobile devices
        if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
            setIsSidebarOpen(false);
        }
    }
};

    const deleteChat = (index: number) => {
        const updatedChats: SavedChat[] = savedChats.filter((_, i) => i !== index);
        setSavedChats(updatedChats);
        localStorage.setItem("savedChats", JSON.stringify(updatedChats));

        if (currentChatIndex === index) {
            setMessages([initialMessage]);
            setHasSentMessage(false);
            setCurrentChatIndex(null);
            localStorage.removeItem("currentChatIndex");
        }
    };

    // FAQ integration
    useEffect(() => {
        if (typeof window !== "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            const question = searchParams.get("question");
            if (question) setFaqQuestion(question);
        }
    }, []);

    useEffect(() => {
        if (faqQuestion && !hasProcessedFAQ.current) {
            hasProcessedFAQ.current = true;
            handleSubmission(faqQuestion);
        }
    }, [faqQuestion]);

    return (
        <Layout>
            <div className="flex bg-gray-100">
                {/* Sidebar Toggle Button (3-line icon) */}
                <button
                    
                    onClick={toggleSidebar}
                    className="fixed top-20 left-5 z-20 p-1 bg-gray-100 text-black rounded-full"
                >
                   <img
                    src="/sidebar.svg" // Path to your SVG image
                    alt="Toggle Sidebar"
                    className="w-8 h-8 object-contain"
       
    />
                </button>

                {/* Sidebar for chat sessions */}
                <div
    className={`w-64 bg-gray-100 p-4 h-screen overflow-y-auto fixed transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 z-10 left-0`}
>

                    <h2 className="text-black text-lg font-semibold mb-4 text-center">Recent Chats</h2>

                    {/* Scrollable Chat List */}
                    <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
                        {Object.entries(groupChatsByRelativeTime(savedChats)).map(([relativeTime, chats]) => (
                            <div key={relativeTime}>
                                <h3 className="text-black font-semibold mt-4 mb-2">{relativeTime}</h3>
                                <ul className="flex-1">
                                    {chats.map((chat, index) => (
                                        <li
                                            key={index}
                                            className={`p-2 hover:bg-gray-300 cursor-pointer rounded-lg border border-black ${
                                                currentChatIndex === index 
                                                ? "bg-gray-200 text-black" 
                                                : "bg-gray-200 text-black"
                                            } flex justify-between items-center`}
                                        >
                                            <span 
                                                onClick={() => loadSavedChat(index)} 
                                                className="flex-1 truncate pr-2" // Add padding to the right
                                            >
                                                {chat.title}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteChat(index);
                                                }}
                                                className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Sticky New Chat Button */}
                        <div className="sticky bottom-0 bg-gray-100 pt-2">
                            <button
                                onClick={startNewChat}
                                className="w-full bg-green-900 text-white rounded-lg p-2 hover:bg-blue-600"
                            >
                                New Chat
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div
                    className={`flex-1 default-page-bg transition-all duration-300 ${
                        isSidebarOpen ? "ml-0 md:ml-64" : "ml-0" // Adjust margin for mobile and desktop
                    }`}
                >
                    <h1 className="page-title">{page_title}</h1>
                    <p className="page-caption text-center mx-auto break-words max-w-[90%] sm:max-w-[70%]">
                        {page_caption}
                    </p>

                    {/* Chat Messages (only shown after sending a message) */}
                    {hasSentMessage && (
                        <div className="flex items-start w-full max-w-4xl mb-4">
                            <div className="flex max-w-3xl ml-16 flex-col flex-1 bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
                                {messages.map((message, index) => (
                                    <div key={index} className="flex flex-col">
                                        {message.type !== "user" && (
                                            <i className="fa-solid fa-user-tie text-gray-500 mb-1 self-start"></i>
                                        )}
                                        <div
                                            className={`p-3 rounded-lg mb-4 ${getWidthClass(message.text)} ${
                                                message.type === "user" ? "bg-blue-100 text-blue-900 ml-auto" : "text-gray-900"
                                            } break-words`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="p-3 font-bold rounded-lg mb-4 text-gray-900 max-w-xs">
                                        {loadingDots}
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

                    {/* Common Prompts Section (only shown before sending a message) */}
                    {!hasSentMessage && (
                        <div className="flex-col-centered max-w-xl w-3/4 h-15 bg-white shadow-lg rounded-lg px-6 py-4">
                            <div
                            className="hoverable-div flex flex-col items-center justify-center w-full rounded-full p-1 mt-1 mb-2 font-semibold"
                            style={{ outline: '2px solid #171717' }}
                            onClick={() => handleSubmission(prompt_1)}
                        >
                            <p className="hover:text-coffee-green text-center">{prompt_1}</p>
                        </div>
                            <div
                                className="hoverable-div flex flex-col items-center justify-center w-full rounded-full p-1 mt-1 mb-2 font-semibold"
                                style={{ outline: '2px solid #171717' }}
                                onClick={() => handleSubmission(prompt_2)}
                            >
                                <p className="hover:text-coffee-green text-center">{prompt_2}</p>
                            </div>
                            <div
                                className="hoverable-div flex-col-centered w-full rounded-full p-1 mt-2 mb-1 font-semibold"
                                style={{ outline: '2px solid #171717' }}
                                onClick={() => handleSubmission(prompt_3)}
                            >
                                <p className="hover:text-coffee-green">{prompt_3}</p>
                            </div>
                        </div>
                    )}

                    {/* Input Box (always visible) */}
                    <div className={`w-full max-w-3xl rounded-lg p-4 mb-4 flex items-center ${hasSentMessage ? "sticky bottom-0 bg-white shadow-lg" : ""}`}>
                        <textarea
                            value={userInput}
                            onChange={handleInputChanges}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && !event.shiftKey) {
                                    handleSubmission();
                                    event.preventDefault();
                                }
                            }}
                            className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                            rows={1}
                            placeholder="Message Chatbot"
                        />
                        <button
                            onClick={() => handleSubmission()}
                            className="ml-4 w-10 h-10 bg-blue-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-600 transition duration-100"
                        >
                            <i className="fa-solid fa-arrow-up"></i>
                        </button>
                    </div>

                    {/* Footer link to FAQ (always visible) */}
                    <div className="flex-row-centered h-[8vh] max-w-[90%] mx-auto">
                        <Link className="flex-row-centered gap-[0.75vw]" href="/faq" passHref>
                            <i className="footer-icon fa-solid fa-lg fa-question-circle mr-1"></i>
                            <p className="footer-text hoverable-div text-center sm:text-left">
                                How was our AI-powered chatbot developed?
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default ChatbotPage;
