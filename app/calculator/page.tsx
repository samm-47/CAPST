// app/calculator/page.tsx
"use client"; // Mark this as a Client Component for client-side hooks

// Important for creation of the logo top right
import Layout from "./calculator_layout";
import { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";

import './custom_radio.css';

const page_title = "Calculator"
const page_caption = "How sustainable is your lifestyle?"

const CalculatorPage: React.FC = () => {

  // Used to track Energy Consumption radio selection.
  const [energyUsage, setEnergyUsage] = useState<string | null>(null);

  const [chatbotResponse, setChatbotResponse] = useState<string>('');

  // Used to track Percent Renewable Energy radio selection.
  const [percentRenewable, setPercentRenewable] = useState<string | null>(null); 

  // Used to track Water Usage radio selection.
  const [waterUsage, setWaterUsage] = useState<string | null>(null); 

  // Used to track CO2 Level radio selection.
  const [airQuality, setAirQuality] = useState<string | null>(null); 
  const [isMobile, setIsMobile] = useState(false);

  // Retrieve saved choices from localStorage when the component mounts
  useEffect(() => {
    const savedEnergyUsage = localStorage.getItem("energyUsage");
    const savedPercentRenewable = localStorage.getItem("percentRenewable");
    const savedWaterUsage = localStorage.getItem("waterUsage");
    const savedAirQuality = localStorage.getItem("airQuality");

    console.log("Retrieved from localStorage:", {
      savedEnergyUsage,
      savedPercentRenewable,
      savedWaterUsage,
      savedAirQuality,
    });

    // Only update state if the retrieved value is not null or empty
    if (savedEnergyUsage) setEnergyUsage(savedEnergyUsage);
    if (savedPercentRenewable) setPercentRenewable(savedPercentRenewable);
    if (savedWaterUsage) setWaterUsage(savedWaterUsage);
    if (savedAirQuality) setAirQuality(savedAirQuality);
  }, []); // Empty dependency array ensures this runs only on mount

  // Save user choices to localStorage whenever they change
  useEffect(() => {
    console.log("Saving to localStorage:", {
      energyUsage,
      percentRenewable,
      waterUsage,
      airQuality,
    });

    if (energyUsage) localStorage.setItem("energyUsage", energyUsage);
    if (percentRenewable) localStorage.setItem("percentRenewable", percentRenewable);
    if (waterUsage) localStorage.setItem("waterUsage", waterUsage);
    if (airQuality) localStorage.setItem("airQuality", airQuality);
  }, [energyUsage, percentRenewable, waterUsage, airQuality]); // Save only when these values change

    
  
  const handleEnergyUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setEnergyUsage(event.target.id); };

  const handlePercentRenewable = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setPercentRenewable(event.target.id); };
    
  const handleWaterUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setWaterUsage(event.target.id); };

  const handleAirQuality = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setAirQuality(event.target.id); };

    const clearSavedChoices = () => {
      localStorage.removeItem("energyUsage");
      localStorage.removeItem("percentRenewable");
      localStorage.removeItem("waterUsage");
      localStorage.removeItem("airQuality");
    
      setEnergyUsage(null);
      setPercentRenewable(null);
      setWaterUsage(null);
      setAirQuality(null);
    
      // Clear score display
      const sustainabilityGrade = document.getElementById("sustainabilityScoreLabel");
      const sustainabilityExplanation = document.getElementById("sustainabilityScoreExplanation");
      if (sustainabilityGrade) sustainabilityGrade.textContent = '';
      if (sustainabilityExplanation) sustainabilityExplanation.textContent = '';
    
      // Clear chatbot response
      setChatbotResponse('');
    };
    
  
    const [copied, setCopied] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(false);


    const handleCopy = () => {
      navigator.clipboard.writeText(chatbotResponse)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => console.error('Error copying text: ', error));
    };
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

      // Check for window width on component mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendEmail = async () => {
    if (!userEmail) {
      alert('Please enter an email address.');
      return;
    }
  
    try {
      const response = await fetch('https://capst.onrender.com/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          message: chatbotResponse,
        }),
      });
  
      if (response.ok) {
        alert('Email sent successfully!');
        setShowEmailInput(false);
        setUserEmail('');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the email.');
    }
  };
  
  
    
  const calculateScore = async () => {
    const sustainabilityGrade = document.getElementById("sustainabilityScoreLabel");
    const sustainabilityExplanation = document.getElementById("sustainabilityScoreExplanation");

    let sustainabilityScoreInt:number = -1;
    let energyConsumptionScore:number;
    let renewableEnergyScore:number;
    let waterConsumptionScore:number;
    let airQualityScore:number;

    switch (energyUsage) {
      case "energy1": energyConsumptionScore = 5; break;
      case "energy2": energyConsumptionScore = 4; break;
      case "energy3": energyConsumptionScore = 3; break;
      case "energy4": energyConsumptionScore = 2; break;
      case "energy5": energyConsumptionScore = 1; break;
      default: energyConsumptionScore = 0;
    }

    switch (percentRenewable) {
      case "renew1": renewableEnergyScore = 1; break;
      case "renew2": renewableEnergyScore = 2; break;
      case "renew3": renewableEnergyScore = 3; break;
      case "renew4": renewableEnergyScore = 4; break;
      case "renew5": renewableEnergyScore = 5; break;
      default: renewableEnergyScore = 0;
    }

    switch (waterUsage) {
      case "water1": waterConsumptionScore = 5; break;
      case "water2": waterConsumptionScore = 4; break;
      case "water3": waterConsumptionScore = 3; break;
      case "water4": waterConsumptionScore = 2; break;
      case "water5": waterConsumptionScore = 1; break;
      default: waterConsumptionScore = 0;
    }

    switch (airQuality) {
      case "air1": airQualityScore = 5; break;
      case "air2": airQualityScore = 4; break;
      case "air3": airQualityScore = 3; break;
      case "air4": airQualityScore = 2; break;
      case "air5": airQualityScore = 1; break;
      default: airQualityScore = 0;
    }

    {/* TODO: Create more complex scoring system */}
    {/* WIll need to add more metrics and weighed/curved scoring systems */}
    sustainabilityScoreInt = 5 * 
                            (energyConsumptionScore + 
                            renewableEnergyScore +
                            waterConsumptionScore +
                            airQualityScore);

    let sustainabilityScore = "";
    let sustainabilityScoreDetail = "";

    if (!sustainabilityGrade|| !sustainabilityExplanation)
    {
      console.error("No element found.");
    }
    else
    {
      if (sustainabilityScoreInt > 0 && sustainabilityScoreInt <= 25) {
        sustainabilityScore = `F (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Oh no! A score of F indicates that multiple areas of your home and lifestyle can be improved to become more sustainable.";
      }
      else if (sustainabilityScoreInt > 25 && sustainabilityScoreInt <= 50) {
        sustainabilityScore = `D (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Oh no! A score of D indicates that one or more areas of your home and lifestyle can be improved to become more sustainable.";
      }
      else if (sustainabilityScoreInt > 50 && sustainabilityScoreInt <= 65) {
        sustainabilityScore = `C (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "You are doing alright! A score of C indicates that your home and lifestyle are somewhat helping to create a cleaner environment.";
      }
      else if (sustainabilityScoreInt > 65 && sustainabilityScoreInt <= 80) {
        sustainabilityScore = `B (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Good job! Your home and lifestyle for the most part are helping create a cleaner environment!";
      }
      else if (sustainabilityScoreInt > 80 && sustainabilityScoreInt <= 99) {
        sustainabilityScore = `A (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Nice job! Your home and lifestyle are helping create a cleaner environment!";
      }
      else if (sustainabilityScoreInt == 100) {
        sustainabilityScore = `S (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Perfect! Your home and lifestyle are helping create a cleaner environment!";
      }
      else
      {
        sustainabilityScore = "Error!";
        sustainabilityScoreDetail = "Please select a value for each category."
      }

      sustainabilityGrade.textContent = sustainabilityScore;
      sustainabilityExplanation.textContent = sustainabilityScoreDetail;
      try {
        const data = {
          score: sustainabilityScore
        };
        
        console.log("Sending data to chatbot:", data);
        
        const response = await axios.post('https://capst.onrender.com/api/chat/calc', data);
        
        console.log("Chatbot response:", response.data);
        
        // Update the state with the chatbot's response
        if (response.data && response.data.response) {
          setChatbotResponse(response.data.response); // Ensure the backend returns { message: "..." }
        } else {
          setChatbotResponse("No response received from the chatbot.");
        }
      } catch (error) {
        console.error("Error sending score to chatbot:", error);
        setChatbotResponse("Failed to get a response from the chatbot.");
      }
      

    }
  }

  return (
    <Layout>
      {/* CSS grid to center content like home.tsx page */}
      <div className="default-page-bg overflow-auto"> {/*Calculator Background here*/}
        <div className="flex flex-col w-full sm:w-1/2 mt-6 mb-6 bg-white shadow-lg rounded-lg p-2 sm:p-1">
          <h1 className="title text-center text-xl sm:text-xl md:text-3xl lg:text-4xl">
            {page_title}
          </h1>
          <p className="caption text-center mx-auto break-words max-w-[90%] sm:max-w-[70%] text-sm sm:text-base md:text-lg lg:text-xl">
            {page_caption}
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex-col-centered w-2/3 bg-white shadow-lg rounded-lg p-8 gap-[4vh]">
          {/* Monthly Energy Consumption */}
          <div className="sus-calc-input">
            <div className="sus-calc-topic">
              <label className="sus-calc-title">
                Monthly Energy Consumption (kWh)
              </label>
              <p>Found on your monthly energy utility bill</p>
            </div>
            <div
              className="sus-calc-input"
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: '10px',
              }}
            >
              {/* Radio options */}
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={`energy${num}`} className="sus-calc-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    id={`energy${num}`}
                    name="energy_consume"
                    className="hoverable-bubble-div custom-radio"
                    onChange={handleEnergyUsage}
                    checked={energyUsage === `energy${num}`}
                  />
                  <label htmlFor={`energy${num}`} className="text-lg">
                    {num === 1 ? "<500" : num === 2 ? "500 to 650" : num === 3 ? "650 to 850" : num === 4 ? "850 to 999" : "1000+"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />

          {/* Percent Renewable Energy */}
          <div className="sus-calc-input">
            <div className="sus-calc-topic">
              <label className="sus-calc-title">
                % Renewable Energy
              </label>
              <p>Found on your monthly energy utility bill</p>
            </div>
            <div
              className="sus-calc-input"
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: '10px',
              }}
            >
              {/* Radio options */}
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={`renew${num}`} className="sus-calc-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    id={`renew${num}`}
                    name="renew_energy"
                    className="hoverable-bubble-div custom-radio"
                    onChange={handlePercentRenewable}
                    checked={percentRenewable === `renew${num}`}
                  />
                  <label htmlFor={`renew${num}`} className="text-lg">
                    {num === 1 ? "<20%" : num === 2 ? "20 to 40%" : num === 3 ? "40 to 60%" : num === 4 ? "60 to 80%" : "80+%"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />

          {/* Monthly Water Usage */}
          <div className="sus-calc-input">
            <div className="sus-calc-topic">
              <label className="sus-calc-title">
                Monthly Water Usage (gal)
              </label>
              <p>Found on your monthly water utility bill</p>
            </div>
            <div
              className="sus-calc-input"
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: '10px',
              }}
            >
              {/* Radio options */}
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={`water${num}`} className="sus-calc-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    id={`water${num}`}
                    name="water_usage"
                    className="hoverable-bubble-div custom-radio"
                    onChange={handleWaterUsage}
                    checked={waterUsage === `water${num}`}
                  />
                  <label htmlFor={`water${num}`} className="text-lg">
                    {num === 1 ? "<50" : num === 2 ? "50 to 70" : num === 3 ? "70 to 90" : num === 4 ? "90 to 110" : "110+"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />

          {/* CO2 Level (Air Quality) */}
          <div className="sus-calc-input">
            <div className="sus-calc-topic">
              <label className="sus-calc-title">
                Air Quality: CO2 Level (ppm)
              </label>
              <p>Measured using a commercial CO2 detector</p>
            </div>
            <div
              className="sus-calc-input"
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: '10px',
              }}
            >
              {/* Radio options */}
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={`air${num}`} className="sus-calc-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    id={`air${num}`}
                    name="air_quality"
                    className="hoverable-bubble-div custom-radio"
                    onChange={handleAirQuality}
                    checked={airQuality === `air${num}`}
                  />
                  <label htmlFor={`air${num}`} className="text-lg">
                    {num === 1 ? "<400" : num === 2 ? "400 to 500" : num === 3 ? "500 to 600" : num === 4 ? "600 to 700" : "700+"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Calculate Score Button */}
          <div>
            <button
              onClick={calculateScore}
              className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-coffee-green"
            >
              Calculate Score
            </button>
          </div>
          {/* Clear Saved Choices Button*/}
          <div>
            <button
              onClick={clearSavedChoices}
              className="bg-red-500 rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-red-600"
            >
              Reset Calculator
            </button>
          </div>

          {/* Label to display sustainability score */}
          <div className="flex-col-centered">
            <label htmlFor="sustainabilityScoreLabel" id="sustainabilityScoreLabel" className="text-6xl font-semibold mb-2">
              {/* Score will be displayed here */}
            </label>
            <label
              htmlFor="sustainabilityScoreExplanation"
              id="sustainabilityScoreExplanation"
              className="text-2xl block text-center"
            >
              {/* Explanation will be displayed here */}
            </label>
          </div>

          {chatbotResponse && (
            <div className="flex-row-centered">
              <i className="fa-solid fa-lg fa-exclamation-circle text-xl text-red-600 mr-2"></i>
              <button
                onClick={openModal}
                className="cursor-pointer text-black text-lg hover:text-red-600"
              >
                Learn more about your score
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Chatbot Response */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white pt-20 px-6 pb-6 rounded-lg shadow-lg max-w-[90%] w-[600px] relative">
                {/* Close Button styled as a back arrow (top-left) */}
                <button onClick={closeModal} className="backArrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Copy Button (top-right) */}
                <button onClick={handleCopy} className="copyButton">
                  {copied ? 'Copied!' : 'Copy'}
                </button>

                <h2 className="text-xl font-semibold mb-4">Understanding Your Score</h2>
                <div className="mb-4 overflow-y-auto max-h-[400px] text-black">
                  {chatbotResponse}
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {/* Expandable Email Input Section */}
                  {showEmailInput && (
                    <div className="transition-all duration-300 ease-in-out">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Enter your email to receive your results
                      </label>
                      <input
                          type="email"
                          id="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-black"
                          placeholder="your@email.com"
                        />
                      <div className="flex justify-end">
                        <button
                          onClick={sendEmail}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                        >
                          Send Email
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        window.location.href = '/chatbot';
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                    >
                      Get More Info
                    </button>
                    <button
                      onClick={() => setShowEmailInput(true)}
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Email Me This
                    </button>
                  </div>
                </div>

          </div>
        </div>
      )}

      {/* Footer link to FAQ */}
      <div className="flex justify-center items-center h-[8vh] bg-white">
      <Link className="flex items-center gap-[0.75vw]" href="/faq" passHref>
        <i className="footer-icon fa-solid fa-lg fa-question-circle mr-1"></i>
        <p className="footer-text hoverable-faq"> How is sustainability score calculated? </p>
      </Link>
    </div>

      
    </Layout>
  );
};

export default CalculatorPage;
