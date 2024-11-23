// app/faq/page.tsx
"use client";

import React from 'react';
import Layout from "./faq_layout";
import Image from "next/image";
import Link from "next/link";

const FaqPage = () => {
    return(
<Layout>
      {/*} CSS grid to center content like home tsx page*/}
      <div className="default-page-bg"> {/* Page background with mint->white gradient*/}
        <h1 className="page-title">
          Frequently Asked Questions
        </h1>
        <p className="page-caption">
          Here are some answers to frequently asked questions!
        </p>
        <div className="flex flex-col w-3/4 mb-6 mt-2 bg-white shadow-lg rounded-lg p-6" style={{outline: "2px solid #22c55e"}}>
          <div>
            <div className="flex items-center space-x-2 mb-4">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/*} Question Mark Icon*/}
                <h2 className="text-lg font-semibold">What is sustainable housing?</h2>
            </div>
            <div className="flex items-baseline space-x-2">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-reply"></i> {/*} Reply Icon*/}
                <p className="text-lg text-gray-800">Sustainable housing focuses on creating living spaces that are environmentally friendly, energy-efficient, and resource-efficient. It aims to reduce the carbon footprint and impact on natural resources while providing comfortable and healthy living environments. </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/4 mb-6 bg-white shadow-lg rounded-lg p-6" style={{outline: "2px solid #22c55e"}}>
            <div className="flex items-center space-x-2 mb-4">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/*} Question Mark Icon*/}
                <h2 className="text-lg font-semibold">How does sustainable housing benefit the environment?</h2>
            </div>
            <div className="flex items-baseline space-x-2">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-reply"></i> {/*} Reply Icon*/}
                <p className="text-lg text-gray-800">Sustainable housing reduces the carbon footprint by lowering energy consumption and greenhouse gas emissions. It also conserves water, reduces waste, and promotes the use of recycled or renewable materials, all of which contribute to a healthier planet.</p>
            </div>
        </div>
           <div className="flex flex-col w-3/4 mb-6 bg-white shadow-lg rounded-lg p-6" style={{outline: "2px solid #22c55e"}}>
            <div className="flex items-center space-x-2 mb-4">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/*} Question Mark Icon*/}
                <h2 className="text-lg font-semibold">How is sustainability score calculated?</h2>
            </div>
            <div className="flex items-baseline space-x-2">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-reply"></i> {/*} Reply Icon*/}
                <p className="text-lg text-gray-800">To determine how eco-friendly your home is, we consider your energy and water usage, the amount of renewable energy you use, and the air quality in your home. Each factor gets a score based on your performance, and these scores are added up and then translated into a grade, from F (lowest) to S (highest).</p>
            </div>
        </div>
        <div className="flex flex-col w-3/4 mb-6 bg-white shadow-lg rounded-lg p-6" style={{outline: "2px solid #22c55e"}}>
            <div className="flex items-center space-x-2 mb-4">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-question-circle"></i> {/*} Question Mark Icon*/}
                <h2 className="text-lg font-semibold">How was our AI-powered chatbot developed?</h2>
            </div>
            <div className="flex items-baseline space-x-2">
                <i className="fa-icon-dark mr-1 fa-solid fa-lg fa-reply"></i> {/*} Reply Icon*/}
                <p className="text-lg text-gray-800">Our AI-powered chatbot was built on the Gemini-1.5-Flash-8B model, enabling efficient natural language processing. Using API keys provided by the model, our chatbot delivers accurate responses to user queries in real-time. Python and Flask were used to incorporate multiple endpoints to facilitate our chatbot's functionality. </p>
            </div>
        </div>

        {/*} TODO: Want to add buttons which direct to the Chatbot page with a prompt for more details*/}
      </div>
    </Layout>
  
    )
}
// Exports the faq for availability in other parts of the app
export default FaqPage;
