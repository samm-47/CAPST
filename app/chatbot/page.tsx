// app/chatbot/page.tsx
"use client"; // This allows for the use of the useState hooks
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'; // Use state is a hook for dynamic states
import Layout from './chatbot_layout';

const ChatbotPage = () => {
    // Store/Track user input and response here
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    // Handle Input Changes Dynamically
    const handleInputChanges = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    }
    // Take input and generate response
    const handleSubmission = () => {
        setResponse(userInput); //Sets response same as input for now change later with chatbot functionality
    }
    return(
        <Layout>
            {/* Use the same grid and flex styling as the calculator page */}
            <div className="flex min-h-screen flex-col items-center justify-center">
                <h1 className="text-4xl">Chatbot</h1>
                <p className="text-lg mt-4">This is the placeholder page for the chatbot.</p>

                
                <div className="flex flex-col items-center w-full max w-lg">
                    {/*Input Section*/}
                    <textarea
                        value={userInput}
                        onChange={handleInputChanges}
                        className="w-full p-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        rows={4}
                        placeholder="Message Chatbot"
                    />
                    {/*Summission Button*/}
                    <button
                        onClick={handleSubmission}
                        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>

                    {/*Output box*/}
                    <textarea
                        value={response}
                        readOnly
                        className="w-full p-4 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                        rows={4}
                        placeholder="Your response will appear here"
                    />
                </div>
                {/* You can extend this with actual chatbot functionality later */}

                {/* Add a link back to the homepage */}
                <Link 
                    href="/" 
                    className="mt-6 rounded-full border border-solid border-black/[.08] transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 hover:bg-[#f2f2f2]"
                >
                    Go back to the homepage
                </Link>
            </div>
        </Layout>

    )
}
// Exports the chatbot for availability in other parts of the app
export default ChatbotPage;