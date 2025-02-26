"use client";

import React from "react";
import Layout from "./faq_layout";

// Note from Ethan: I think this is the most efficient way to allow easy access/editing of the questions. Using a text file for dynamic rendering of FAQ page is out of scope and unnecessary for this project.
const Q1 = "What is the difference between GreenLiving, GreenifyAI, and GreenExpectations?";
const A1_P1 = "SustainABLE is the current website you are on. Our AI virtual assistant and sustainability calculator aim to assist you in learning more about sustainable living.";
const A1_P2 = "GreenifyAI is a website that allows you to browse, buy, sell, and convert conventional houses into sustainable homes. Currently, it covers a wide range of properties in the greater New Jersey area."

const Q2 = "How is my sustainability score calculated?";
const A2 = "To determine how eco-friendly your home and lifestyle are, we consider your overall energy and water usage, the amount of renewable energy you use, and the air quality in your home. Each factor gets a score based on your performance, and these scores are added up and then translated into a grade, from F (lowest) to S (highest).";

const Q3 = "How was your AI-powered chatbot developed?";
const A3 = "Our AI-powered chatbot was built on the Gemini-1.5-Flash-8B model, enabling efficient natural language processing. Using API keys provided by the model, our chatbot delivers accurate responses to user queries in real-time. Python and Flask were used to incorporate multiple endpoints to facilitate our chatbot's functionality. ";

// Similar idea to FAQ questions and answers
const page_title = "FAQ"
const page_caption = "Frequently Asked Questions";

const FaqPage = () => {
  return (
    <Layout>
      {/* CSS grid to center content like home tsx page */}
      <div className="default-page-bg"> {/* Page background with mint->white gradient*/}
          <div className = "flex flex-col w-1/3 bg-white mt-6 mb-6 shadow-lg rounded-lg p-1">
            <h1 className="title text-center">
              {page_title}
            </h1>
            <p className="caption text-center mx-auto break-words max-w-[90%] sm:max-w-[70%]">
              {page_caption}
            </p>
          </div>
        
        <div className="flex flex-col w-3/4 mb-6 bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/* Question Mark Icon */}
            <h2 className="text-lg font-semibold">{ Q1 }</h2>
          </div>
          <div className="flex items-baseline space-x-2">
            <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-reply"></i> {/* Reply Icon */}
            <p className="text-lg text-gray-800">
              { A1_P1 }
            </p>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-lg text-gray-800 ml-8">
              { A1_P2 }
            </p>
          </div>
        </div>

        <div className="flex flex-col w-3/4 mb-6 bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/* Question Mark Icon */}
            <h2 className="text-lg font-semibold">{ Q2 }</h2>
          </div>
          <div className="flex items-baseline space-x-2">
            <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-reply"></i> {/* Reply Icon */}
            <p className="text-lg text-gray-800">
              { A2 }
            </p>
          </div>
        </div>

        <div className="flex flex-col w-3/4 mb-6 bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/* Question Mark Icon */}
            <h2 className="text-lg font-semibold">{ Q3 }</h2>
          </div>
          <div className="flex items-baseline space-x-2">
            <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-reply"></i> {/* Reply Icon */}
            <p className="text-lg text-gray-800">
              { A3 }
            </p>
          </div>
        </div>

        {/* TODO: Add buttons directing to the Chatbot page with a prompt for more details */}
      </div>
    </Layout>
  );
};

// Export the FAQ for availability in other parts of the app
export default FaqPage;
