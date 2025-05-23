"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Layout from "./chatbot_layout";
import Link from "next/link";
import EmailModal from "./email";

const page_title = "Sustainability Agent";
const page_caption = "Learn more about sustainable living!";

// Common prompts for quick access
const prompt_1 = "How can I make my house more sustainable?";
const prompt_2 = "Easy ways to increase my renewable energy usage.";
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
    const [selectedChats, setSelectedChats] = useState<number[]>([]);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("");



    const handleSendToEmail = async (email: string) => {
        try {
            console.log("Sending email with data:", {
                email,
                selectedChats,
                chatHistory: savedChats  // Make sure to include the chat history
            });
    
    const response = await axios.post('https://capst.onrender.com/api/send-chat-email', {
                email,
                selectedChats,
                chatHistory: savedChats  // Include the full chat history
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Email sent:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    };
      
   
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

    
    const toggleSidebar = () => {
        console.log("Toggling sidebar. Current state:", isSidebarOpen);
        setIsSidebarOpen((prevState) => !prevState);
    };
    
    const chatCancelRef = useRef<ReturnType<typeof axios.CancelToken.source> | null>(null);

    // Scroll Handler Functions
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const scrollToBottom = () => {
        bottomReference.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Scroll Button Handler
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
    
            setShowScrollToTop(scrollY > 200);
            setShowScrollToBottom(windowHeight + scrollY < docHeight - 100);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
        // Copy Logic with animation and checkmark confirmation
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        });
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

                        if (parsedMessages.length > 0) {
                            setHasSentMessage(false);
                        } else {
                            setHasSentMessage(true);
                        }
                    }
                } else {
                    setMessages([]);
                    setHasSentMessage(false);
                    localStorage.setItem("chatHistory", JSON.stringify([]));
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
        const textarea = event.target;

        // Reset height to auto, then adjust to scrollHeight
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      
        // Dynamically toggle overflow and show input chat scrollbar
        if (textarea.scrollHeight >= 160) {
          textarea.style.overflowY = "auto";
        } else {
          textarea.style.overflowY = "hidden";
        }
      
        setUserInput(textarea.value);
    };

    const handleSubmission = async (text?: string, prevMessages: ChatMessage[] = messages) => {
        setHasSentMessage(true);
        const currentUserInput = text || userInput;
      
        if (currentUserInput.trim()) {
            setUserInput("");
        
            const updatedMessages = [
                ...prevMessages,
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
          
                // Chatbot response
                const response = await axios.post(
                    "https://capst.onrender.com/api/chat",
                    { question: currentUserInput },
                    { cancelToken: chatCancelRef.current?.token }
                );
          
                const finalMessages = [
                    ...updatedMessages,
                    { type: "bot", text: response.data.response },
                ];
                setMessages(finalMessages);
          
                const savedChats: SavedChat[] = JSON.parse(localStorage.getItem("savedChats") || "[]");
                const currentTimestamp = Date.now();
          
                let newChats: SavedChat[];
                
                if (currentChatIndex !== null) {
                    // Update existing chat
                    newChats = [...savedChats];
                    newChats[currentChatIndex] = {
                        title: savedChats[currentChatIndex].title,
                        messages: finalMessages,
                        timestamp: currentTimestamp,
                    };
                } else {
                    // Add new chat
                    const newChat = {
                        title,
                        messages: finalMessages,
                        timestamp: currentTimestamp,
                    };
                    newChats = [...savedChats, newChat];
                }
                
                // Sort chats by timestamp (newest first)
                newChats.sort((a, b) => b.timestamp - a.timestamp);
                
                // Find the new index of our chat after sorting
                const updatedIndex = newChats.findIndex(chat => 
                    currentChatIndex !== null 
                        ? chat.timestamp === savedChats[currentChatIndex]?.timestamp 
                        : chat.timestamp === currentTimestamp
                );
                
                setSavedChats(newChats);
                localStorage.setItem("savedChats", JSON.stringify(newChats));
                setCurrentChatIndex(updatedIndex);
                localStorage.setItem("currentChatIndex", JSON.stringify(updatedIndex));
                
                // Update selected indices to match new order
                setSelectedChats(prevSelected => {
                    return prevSelected.map(oldIndex => {
                        // For existing chats, find their new position
                        if (oldIndex === currentChatIndex) {
                            return updatedIndex;
                        }
                        // For other chats, find their new position based on timestamp
                        const chat = savedChats[oldIndex];
                        return newChats.findIndex(c => c.timestamp === chat.timestamp);
                    }).filter(index => index !== -1); // Remove any that couldn't be found
                });
            } catch {
                // Optionally add error handling here if needed
                console.error("An error occurred during chat submission");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSaveEdit = (index: number) => {

        // 1. Truncate everything after the edited message
        const truncatedMessages = messages.slice(0, index);
      
        // 2. Set state
        setMessages(truncatedMessages);
        setEditIndex(null);
        setEditText("");
      
        // 3. Resubmit the edited message to the bot
        handleSubmission(editText, truncatedMessages);
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
        setMessages([]);
        setHasSentMessage(false);
        setCurrentChatIndex(null);
    };

    const startNewChat = () => {
        setMessages([]);
        setHasSentMessage(false);
        localStorage.setItem("chatHistory", JSON.stringify([]));
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
        const sortedChats = [...savedChats].sort((a, b) => b.timestamp - a.timestamp);
    
        setSelectedChats([]);
    
        if (sortedChats[index]) {
            setMessages(sortedChats[index].messages);
            setHasSentMessage(true);
            
            // Find the original index in the unsorted array to maintain consistency
            const originalIndex = savedChats.findIndex(
                chat => chat.timestamp === sortedChats[index].timestamp
            );
            
            setCurrentChatIndex(originalIndex);
            localStorage.setItem("currentChatIndex", JSON.stringify(originalIndex));
    
            // Close the sidebar on mobile devices
            if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
            }
        }
    };

    const deleteChat = (index: number) => {
        const savedChats: SavedChat[] = JSON.parse(localStorage.getItem("savedChats") || "[]");
        const sortedChats = [...savedChats].sort((a, b) => b.timestamp - a.timestamp);
        const chatToDelete = sortedChats[index];
        
        // Find the original index
        const originalIndex = savedChats.findIndex(chat => chat.timestamp === chatToDelete.timestamp);
        
        const updatedChats = savedChats.filter((_, i) => i !== originalIndex);
        setSavedChats(updatedChats);
        localStorage.setItem("savedChats", JSON.stringify(updatedChats));
    
        // Update selected indices
        setSelectedChats(prevSelected => 
            prevSelected
                .map(i => {
                    if (i === originalIndex) return -1;
                    return i > originalIndex ? i - 1 : i;
                })
                .filter(i => i !== -1)
        );
    
        if (currentChatIndex === originalIndex) {
            setMessages([]);
            setHasSentMessage(false);
            setCurrentChatIndex(null);
            localStorage.removeItem("currentChatIndex");
        } else if (currentChatIndex !== null && currentChatIndex > originalIndex) {
            setCurrentChatIndex(currentChatIndex - 1);
            localStorage.setItem("currentChatIndex", JSON.stringify(currentChatIndex - 1));
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
                {/* Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="fixed top-[74px] left-5 z-20 p-1 bg-gray-100 text-black rounded-full"
                >
                    <img
                        src="/sidebar.svg"
                        alt="Toggle Sidebar"
                        className="hoverable-div w-8 h-8 object-contain"
                    />
                </button>
    
                {/* Sidebar */}
                <div
                    className={`w-64 bg-gray-100 p-4 h-screen overflow-y-auto fixed transform ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 z-10 left-0`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-black text-lg font-semibold text-center ml-16">Recent Chats</h2>
                        <button onClick={startNewChat}>
                            <img
                                src="/chat.png"
                                alt="New Chat"
                                className="w-5 h-5 object-contain"
                            />
                        </button>
                    </div>
                    
    
                    {selectedChats.length > 0 && (
                    <div className="flex space-x-2 mb-4">
                        <button
                            onClick={() => setIsEmailModalOpen(true)}
                            className="flex-1 py-1 px-2 text-black rounded-md border border-black flex items-center justify-center"
                        >
                            
                            <img src="/email.png" alt="Email" className="w-5 h-5 mr-2" />
                            Email {selectedChats.length} {selectedChats.length === 1 ? 'chat' : 'chats'}
                        </button>
                        <button
                            onClick={() => setSelectedChats([])}
                            className="py-1 px-2 text-black rounded-md flex items-center justify-center border border-black"
                            title="Clear selection"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}
    
                    {/* Chat List */}
                    <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
                    {Object.entries(groupChatsByRelativeTime(savedChats)).map(([relativeTime, chats]) => {
    const sortedChats = [...chats].sort((a, b) => b.timestamp - a.timestamp);
    return (
        <div key={relativeTime}>
            <h3 className="text-black font-semibold mt-4 mb-2">{relativeTime}</h3>
            <ul className="flex-1">
                 {sortedChats.map((chat) => {
                    // Find the original index
                    const originalIndex = savedChats.findIndex(c => c.timestamp === chat.timestamp);
                    return (
                        <li
                            key={originalIndex}
                            className={`p-2 hover:bg-gray-300 cursor-pointer rounded-lg border border-black mb-2 ${
                                currentChatIndex === originalIndex 
                                ? "bg-gray-200 text-black" 
                                : "bg-gray-200 text-black"
                            } flex items-center`}
                        >
                            {/* Checkbox - use originalIndex */}
                            <input
                                type="checkbox"
                                checked={selectedChats.includes(originalIndex)}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setSelectedChats(prev => 
                                        prev.includes(originalIndex)
                                            ? prev.filter(i => i !== originalIndex)
                                            : [...prev, originalIndex]
                                    );
                                }}
                                className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
    
                                            {/* Chat Title */}
                                            <span 
                                                onClick={() => loadSavedChat(originalIndex)} 
                                                className="flex-1 truncate pr-2"
                                            >
                                                {chat.title}
                                            </span>
    
                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteChat(originalIndex);
                                                }}
                                                className="hoverable-div w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-800 transition ml-2"
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
                    </div>
                    {/* Send Selected Button (visible when chats are selected) */}
                    
                </div>
                
    
                {/* Main Content */}
                <div
                    className={`flex-1 default-page-bg transition-all duration-300 ${
                        isSidebarOpen ? "ml-0 md:ml-64" : "ml-0"
                    }`}
                >
                    <h1 className="page-title">{page_title}</h1>
                    <p className="page-caption text-center font-bold mx-auto break-words max-w-[90%] sm:max-w-[70%]">
                        {page_caption}
                    </p>
    
                    {/* Chat Messages */}
                    {hasSentMessage && (
                        <div className="flex items-start w-full max-w-4xl mb-4">
                            <div className="flex max-w-3xl ml-16 flex-col flex-1 bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
                                {messages
                                .filter((msg, index, arr) => { // Filter out messages before mapped and displayed
                                    // If the first two messages are identical user messages, skip the first
                                    if (
                                      index === 0 &&
                                      arr.length > 1 &&
                                      msg.type === "user" &&
                                      arr[1].type === "user" &&
                                      msg.text.trim() === arr[1].text.trim() // Text is same
                                    ) {
                                      return false; // Remove 
                                    }
                                    return true; // Else do not remove
                                })  
                                .map((message, index) => (
                                    <div 
                                        key={index}
                                        className="flex flex-col relative group"
                                    >
                                        {message.type !== "user" && (
                                            <i className="fa-solid fa-user-tie text-gray-500 mb-1 self-start"></i>
                                        )}
                                        {editIndex === index && message.type === "user" ? (
                                            <div className="flex flex-col gap-2 w-full">
                                                <textarea
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                rows={2}
                                                placeholder="Edit your message"
                                                />
                                                <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleSaveEdit(index)}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                                >
                                                    Send
                                                </button>
                                                <button
                                                    onClick={() => {
                                                    setEditIndex(null);
                                                    setEditText("");
                                                    }}
                                                    className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                                                >
                                                    Cancel
                                                </button>
                                                </div>
                                            </div>
                                            ) : (
                                            <div
                                                className={`p-3 rounded-lg ${getWidthClass(message.text)} ${message.type === "user" ? "bg-blue-100 text-blue-900 ml-auto" : "text-gray-900"} break-words`}
                                            >
                                                {message.text}
                                            </div>
                                        )}

                                        {/* Edit and copy buttons that shows on message hover */}
                                        {/* Buttons (Edit/Copy) Underneath */}
                                        <div
                                        className={`flex gap-2 mt-1 ${
                                            message.type === "user" ? "ml-auto" : "mr-auto"
                                        } opacity-0 group-hover:opacity-100 transition-opacity duration-200 min-h-[24px]`}
                                        >
                                        {/* Edit only for user */}
                                        {message.type === "user" && (
                                            <button
                                            onClick={() => {
                                                setEditIndex(index);
                                                setEditText(message.text);
                                            }}
                                            className="text-gray-300 hover:text-green-700 transition"
                                            title="Edit message"
                                            >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        )}

                                        {/* Copy for all */}
                                        <button
                                        onClick={() => handleCopy(message.text, index)}
                                        className="text-gray-300 hover:text-green-700 transition w-5 h-5 flex items-center justify-center"
                                        aria-label="Copy"
                                        >
                                        <i className={`fa-solid ${copiedIndex === index ? 'fa-check text-green-500 animate-pulse' : 'fa-copy'}`}></i>
                                        </button>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <>
                                        <button
                                            onClick={() => {
                                                if (chatCancelRef.current) {
                                                    chatCancelRef.current.cancel("User canceled the request.");
                                                }
                                            }}
                                            className="mb-2 ml-auto px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                                        >
                                            <i className="fa-solid fa-rectangle-xmark mr-2"></i>
                                            Cancel
                                        </button>
                                        <div className="p-3 font-bold rounded-lg mb-4 text-gray-900 max-w-xs">
                                            {loadingDots}
                                        </div>
                                    </>
                                )}
                                <div ref={bottomReference} />
                            </div>
                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-2 ml-2">
                                <button
                                    onClick={clearChatHistory}
                                    className="w-10 h-10 bg-red-500 text-white rounded-full shadow hover:bg-red-800 transition flex items-center justify-center"
                                    title="Clear chat"
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                                
                            </div>
                        </div>
                    )}
                    {/* Scroll-to-top button */}
                    {showScrollToTop && (
                        <div className="fixed top-20 z-10 py-2">
                            <button
                                onClick={scrollToTop}
                                className="mx-auto w-10 h-10 border-2 border-blue-500 bg-transparent text-black rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 transition duration-100"
                            >
                                <i className="fa-solid fa-arrow-up"></i>
                            </button>
                        </div>
                    )}

                    {/* Scroll-to-bottom button */}
                    {showScrollToBottom && (
                        <div className="fixed bottom-20 z-10 py-2">
                            <button
                                onClick={scrollToBottom}
                                className="w-10 h-10 border-2 border-blue-500 bg-transparent text-black rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-100"
                            >
                                <i className="fa-solid fa-arrow-down"></i>
                            </button>
                        </div>
                    )}

    
                    {/* Initial Prompts */}
                    {!hasSentMessage && (
                        <div className="flex flex-col items-center max-w-xl w-3/4 bg-white shadow-lg rounded-xl p-6 space-y-3">
                            {[prompt_1, prompt_2, prompt_3].map((prompt, index) => (
                                <button
                                    key={index}
                                    className="w-full py-2 px-4 rounded-full border-2 border-neutral-900 text-neutral-900 font-semibold transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                                    onClick={() => handleSubmission(prompt)}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}
    
                    {/* Input Area */}
                    <div className={`w-full max-w-3xl rounded-lg p-4 mb-4 flex items-center ${hasSentMessage ? "sticky bottom-0 bg-white shadow-lg" : ""}`}>
                    <textarea
                    value={userInput}
                    onChange={handleInputChanges}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                        handleSubmission();
                        event.preventDefault();
                        setTimeout(() => {
                            const target = event.target as HTMLTextAreaElement;
                            target.style.height = "auto";
                        }, 0);
                        }
                    }}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none transition-all overflow-y-auto"
                    style={{
                        minHeight: "44px",
                        maxHeight: "160px", // stop expanding here
                    }}
                    rows={1}
                    placeholder="Message Chatbot"
                    />
                        <button
                            onClick={() => handleSubmission()}
                            className="hoverable-div ml-4 w-10 h-10 bg-blue-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-600 transition duration-100"
                        >
                            <i className="fa-solid fa-arrow-up"></i>
                        </button>
                    </div>
    
                    {/* FAQ Link */}
                    <div className="flex-row-centered h-[8vh] max-w-[90%] mx-auto">
                        <Link className="flex-row-centered gap-[0.75vw]" href="/faq" passHref>
                            <i className="footer-icon fa-solid fa-lg fa-question-circle mr-1"></i>
                            <p className="footer-text hoverable-faq text-center sm:text-left">
                                How was our AI-powered chatbot developed?
                            </p>
                        </Link>
                    </div>
                </div>
    
                {/* Email Modal */}
                <EmailModal
                    isOpen={isEmailModalOpen}
                    onClose={() => {
                        setIsEmailModalOpen(false);
                        
                        setSelectedChats([]); 
                    }}
                    onSubmit={handleSendToEmail}
                />
            </div>
        </Layout>
    );
};
export default ChatbotPage;
