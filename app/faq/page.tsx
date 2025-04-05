"use client";

import React from "react";
import Layout from "./faq_layout";
import Link from "next/link"; // Navigation  

// Note from Ethan: I think this is the most efficient way to allow easy access/editing of the questions. Using a text file for dynamic rendering of FAQ page is out of scope and unnecessary for this project.
const Q1 = "What is the difference between SustainABLE and GreenifyAI?";
const A1_P1 = "SustainABLE is the current website you are on. Our AI virtual assistant and sustainability calculator aim to assist you in learning more about sustainable living.";
const A1_P2 = "GreenifyAI is a website that allows you to browse, buy, sell, and convert conventional houses into sustainable homes. Currently, it covers a wide range of properties in the greater New Jersey area."

const Q2 = "How is my sustainability score calculated?";
const A2_P1 = "To determine how eco-friendly your home and lifestyle are, we consider your overall energy and water usage, the amount of renewable energy you use, and the air quality in your home. Each factor gets a score based on your performance, and these scores are added up and then translated into a grade, from F (lowest) to S (highest).";
const A2_P2 = "Score ranges: F: 0-25, D: 26-50, C: 51-65, B: 66-80, A: 81-99, S: 100"

const Q3 = "How was your AI-powered chatbot developed?";
const A3 = "Our AI-powered chatbot was built on the Gemini-1.5-Flash-8B model, enabling efficient natural language processing. Using API keys provided by the model, our chatbot delivers accurate responses to user queries in real-time. Python and Flask were used to incorporate multiple endpoints to facilitate our chatbot's functionality. ";

const Q4 = "How can I make my house more sustainable?";
const A4 = "Good options include switching to LED lighting, using energy-efficient appliances, and reducing water waste. Consider solar panels, composting, and using smart thermostats to increase sustainability even further."

const Q5 = "Easy ways to increase energy efficiency?"
const A5 = "Some low cost ways to increase your energy effficiency is to be more mindful of your energy consumption such as turning off appliances and lights when not in use"

const Q6 ="What is sustainable living?"
const A6 = "Sustainable living means making daily choices that reduce your environmental impact. This includes conserving energy and water, minimizing waste, choosing eco-friendly products, and using renewable resources. The goal is to support a healthier planet while maintaining quality of life."
// Similar idea to FAQ questions and answers
const page_title = "FAQ"
const page_caption = "Frequently Asked Questions";

// Store FAQ info in an array for dynamic rendering
const FAQ_ITEMS = [
  { question: Q1, answers: [A1_P1, A1_P2] , learnMore: false},
  { question: Q2, answers: [A2_P1, A2_P2] , learnMore: false},
  { question: Q3, answers: [A3] , learnMore: true}, 
  { question: Q4, answers: [A4] , learnMore: true},
  { question: Q5, answers: [A5] , learnMore: true},
  { question: Q6, answers: [A6] , learnMore: true}
];
const FaqPage = () => {
  return (
    <Layout>
      {/* CSS grid to center content like home tsx page */}
      <div className="default-page-bg"> {/* Page background with mint->white gradient*/}
          {/* Header */}
          <div className = "flex flex-col w-1/3 bg-white mt-6 mb-6 shadow-lg rounded-lg p-1">
            <h1 className="title text-center">
              {page_title}
            </h1>
            <p className="caption text-center mx-auto break-words max-w-[90%] sm:max-w-[70%]">
              {page_caption}
            </p>
          </div>

        {/* Loop through each FAQ item and creates container for each Q&A pair*/}
        {FAQ_ITEMS.map((faq, index) => (
          <div key={index} className="flex flex-col justify-center align-center w-3/4 mb-6 bg-white shadow-lg rounded-lg p-6">
            
            {/* Question Header with Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/* Question Mark Icon */}
              <h2 className="text-lg font-semibold">{faq.question}</h2>
            </div>

            {/* Answer Section */}
            {faq.answers.map((answer, i) => (
              <div key={i} className="flex items-baseline space-x-2">
                <p className="text-lg text-gray-800">{answer}</p>
              </div>
            ))}

            {/* Learn More Button - Redirects user to Chatbot page with the question as a parameter */}
            {faq.learnMore && (
              <div className="flex flex-col justify-start items-center w-28 hoverable-div mt-5">
              <Link 
                href={`/chatbot?question=${encodeURIComponent(faq.question)}`} 
                className="bg-greenify-button-green text-white font-semibold px-2 py-2 mr-3 rounded hover:bg-coffee-green"
              >
                Learn More
              </Link>
              </div>
            )}
          </div>
        ))}

        {/* TODO: Add buttons directing to the Chatbot page with a prompt for more details */}
      </div>
    </Layout>
  );
};

// Export the FAQ for availability in other parts of the app
export default FaqPage;
