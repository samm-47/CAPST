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

  const [chatbotResponse, setChatbotResponse] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  // Used to track Energy Consumption radio selection.
  const [energyUsage, setEnergyUsage] = useState<string | null>(null);

  // Used to track Percent Renewable Energy radio selection.
  const [percentRenewable, setPercentRenewable] = useState<string | null>(null); 

  // Used to track Water Usage radio selection.
  const [waterUsage, setWaterUsage] = useState<string | null>(null); 

  //Used to track Waste Management radio selection.
  const [wasteManagement, setWasteManagement] = useState<string | null>(null);

  //Used to track Transportation mode radio selection
  const [transportationMode, setTransportationMode] = useState<string | null>(null);

  // Used to track CO2 Level radio selection.
  const [airQuality, setAirQuality] = useState<string | null>(null); 


  // Retrieve saved choices from localStorage when the component mounts
  useEffect(() => {
    const savedEnergyUsage = localStorage.getItem("energyUsage");
    const savedPercentRenewable = localStorage.getItem("percentRenewable");
    const savedWaterUsage = localStorage.getItem("waterUsage");
    const savedAirQuality = localStorage.getItem("airQuality");
    const savedWasteManagement = localStorage.getItem("wasteManagement");
    const savedTransportationMode = localStorage.getItem("transportationMode")

    console.log("Retrieved from localStorage:", {
      savedEnergyUsage,
      savedPercentRenewable,
      savedWaterUsage,
      savedAirQuality,
      savedWasteManagement,
      savedTransportationMode
    });

    // Only update state if the retrieved value is not null or empty
    if (savedEnergyUsage) setEnergyUsage(savedEnergyUsage);
    if (savedPercentRenewable) setPercentRenewable(savedPercentRenewable);
    if (savedWaterUsage) setWaterUsage(savedWaterUsage);
    if (savedAirQuality) setAirQuality(savedAirQuality);
    if (savedWasteManagement) setWasteManagement(savedWasteManagement);
    if (savedTransportationMode) setTransportationMode(savedTransportationMode);
  }, []); // Empty dependency array ensures this runs only on mount

  // Save user choices to localStorage whenever they change
  useEffect(() => {
    console.log("Saving to localStorage:", {
      energyUsage,
      percentRenewable,
      waterUsage,
      airQuality,
      wasteManagement,
      transportationMode
    });

    if (energyUsage) localStorage.setItem("energyUsage", energyUsage);
    if (percentRenewable) localStorage.setItem("percentRenewable", percentRenewable);
    if (waterUsage) localStorage.setItem("waterUsage", waterUsage);
    if (airQuality) localStorage.setItem("airQuality", airQuality);
    if (wasteManagement) localStorage.setItem("wasteManagement", wasteManagement);
    if (transportationMode) localStorage.setItem("transportationMode", transportationMode);
  }, [energyUsage, percentRenewable, waterUsage, airQuality, wasteManagement, transportationMode]);// Save only when these values change

    
  
  const handleEnergyUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setEnergyUsage(event.target.id); };

  const handlePercentRenewable = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setPercentRenewable(event.target.id); };
    
  const handleWaterUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setWaterUsage(event.target.id); };

  const handleAirQuality = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setAirQuality(event.target.id); };

  const handleWasteManagement = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setWasteManagement(event.target.id); };

  const handleTransportationMode = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setTransportationMode(event.target.id); };

    const clearSavedChoices = () => {
      localStorage.removeItem("energyUsage");
      localStorage.removeItem("percentRenewable");
      localStorage.removeItem("waterUsage");
      localStorage.removeItem("airQuality");
      localStorage.removeItem("wasteManagement")
      localStorage.removeItem("transportationMode")
    
      setEnergyUsage(null);
      setPercentRenewable(null);
      setWaterUsage(null);
      setAirQuality(null);
      setWasteManagement(null);
      setTransportationMode(null);
    
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
      alert('Please enter a valid email address.');
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
        alert('Email sent successfully! If you do not see it in your inbox, please check your spam.');
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
  
  
    
  interface ScoreBreakdown {
    selected: string;
    rawScore: number;
    weightedScore: number;
  }
  
  interface CategoryScores {
    [key: string]: { [key: string]: number };
  }
  
  interface ChatbotPayload {
    totalScore: number;
    grade: string;
    details: {
      category: string;
      selected: string;
      score: number;
      weight: number;
    }[];
  }
  
  const calculateScore = async () => {
    const sustainabilityGrade = document.getElementById("sustainabilityScoreLabel");
    const sustainabilityExplanation = document.getElementById("sustainabilityScoreExplanation");
  
    // Define score mappings
    const scoreMap: CategoryScores = {
      energyUsage: { energy1: 5, energy2: 4, energy3: 3, energy4: 2, energy5: 1 },
      percentRenewable: { renew1: 1, renew2: 2, renew3: 3, renew4: 4, renew5: 5 },
      waterUsage: { water1: 5, water2: 4, water3: 3, water4: 2, water5: 1 },
      airQuality: { air1: 5, air2: 4, air3: 3, air4: 2, air5: 1 },
      wasteManagement: { waste1: 1, waste2: 3, waste3: 5 },
      transportationMode: { trans1: 1, trans2: 3, trans3: 5 }
    };
  
    // Define category weights
    const weights = {
      energyUsage: 0.30,
      percentRenewable: 0.25,
      waterUsage: 0.15,
      airQuality: 0.10,
      wasteManagement: 0.10,
      transportationMode: 0.10
    };
  
    // Collect responses (assuming these are defined elsewhere)
    const responses = {
      energyUsage,
      percentRenewable,
      waterUsage,
      airQuality,
      wasteManagement,
      transportationMode
    };
  
    let totalScore = 0;
    let allAnswered = true;
    const breakdown: Record<string, ScoreBreakdown> = {};
    const details: ChatbotPayload['details'] = [];
  
    // Calculate scores
    for (const key in responses) {
      const answer = responses[key as keyof typeof responses];
      
      // Validate response
      if (!answer || typeof answer !== 'string') {
        allAnswered = false;
        break;
      }
  
      const categoryMap = scoreMap[key];
      const rawScore = categoryMap?.[answer] ?? 0;
      const weight = weights[key as keyof typeof weights] ?? 0;
      const weightedScore = rawScore * weight;
      
      totalScore += weightedScore;
      breakdown[key] = { selected: answer, rawScore, weightedScore };
      
      // Prepare simplified details for API
      details.push({
        category: key,
        selected: answer,
        score: rawScore,
        weight: weight
      });
    }
  
    // Calculate final score (scaled to 100)
    const sustainabilityScoreInt = allAnswered ? Math.round((totalScore / 5) * 100) : -1;
  
    // Determine grade and feedback
    let sustainabilityScore = "";
    let sustainabilityScoreDetail = "";
  
    if (!sustainabilityGrade || !sustainabilityExplanation) {
      console.error("Required DOM elements not found");
      return;
    }
  
    if (!allAnswered) {
      sustainabilityScore = "Error!";
      sustainabilityScoreDetail = "Please select a value for each category.";
    } else {
      // Grade mapping
      if (sustainabilityScoreInt <= 25) {
        sustainabilityScore = `F (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Oh no! A score of F indicates that multiple areas of your home and lifestyle can be improved to become more sustainable.";
      } else if (sustainabilityScoreInt <= 50) {
        sustainabilityScore = `D (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Oh no! A score of D indicates that one or more areas of your home and lifestyle can be improved to become more sustainable.";
      } else if (sustainabilityScoreInt <= 65) {
        sustainabilityScore = `C (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "You are doing alright! A score of C indicates that your home and lifestyle are somewhat helping to create a cleaner environment.";
      } else if (sustainabilityScoreInt <= 80) {
        sustainabilityScore = `B (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Good job! Your home and lifestyle for the most part are helping create a cleaner environment!";
      } else if (sustainabilityScoreInt <= 99) {
        sustainabilityScore = `A (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Nice job! Your home and lifestyle are helping create a cleaner environment!";
      } else if (sustainabilityScoreInt === 100) {
        sustainabilityScore = `S (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Perfect! Your home and lifestyle are helping create a cleaner environment!";
      }
  
      // Update UI
      sustainabilityGrade.textContent = sustainabilityScore;
      sustainabilityExplanation.innerHTML = sustainabilityScoreDetail;
      sustainabilityScoreDetail = sustainabilityScoreDetail.replace(/\n/g, '<br/>');

  
      try {
        // Create the properly formatted payload with minimal prompt
        const payload = {
          score: sustainabilityScoreInt.toString(),
          breakdown: {
            energyUsage: { rawScore: breakdown.energyUsage?.rawScore || 0 },
            percentRenewable: { rawScore: breakdown.percentRenewable?.rawScore || 0 },
            waterUsage: { rawScore: breakdown.waterUsage?.rawScore || 0 },
            airQuality: { rawScore: breakdown.airQuality?.rawScore || 0 },
            wasteManagement: { rawScore: breakdown.wasteManagement?.rawScore || 0 },
            transportationMode: { rawScore: breakdown.transportationMode?.rawScore || 0 }
          },
          prompt: `Given sustainability score ${sustainabilityScoreInt}, provide recommendations...`
        };
    
        console.log("Sending minimized payload:", payload);
    
        const response = await axios.post('https://capst.onrender.com/api/chat/calc', 
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );
    
        if (response.data?.response) {
          setChatbotResponse(response.data.response);
        } else {
          setChatbotResponse("Analyzing your results...");
        }
      } catch (error) {
        let errorMessage = "Please try again later";
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.error || 
                       error.response?.data?.message || 
                       "Failed to get analysis";
        }
        setChatbotResponse(errorMessage);
      }
    };
  };
      // Add a function to safely render HTML from the response
      const renderResponseHTML = (html: string) => {
        // Simple sanitization (consider using a library like DOMPurify for production)
        const cleanHtml = html
          .replace(/<script.*?>.*?<\/script>/gi, '')
          .replace(/<\/?[^>]+(>|$)/g, (match) => {
            // Only allow basic formatting tags
            const allowedTags = ['p', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'h3', 'h4'];
            const tagMatch = match.match(/<\/?([a-z]+)[^>]*>/i);
            if (tagMatch && allowedTags.includes(tagMatch[1].toLowerCase())) {
              return match;
            }
            return '';
          });
          
        return { __html: cleanHtml };
      };
  

  return (
    <Layout>
      {/* CSS grid to center content like home.tsx page */}
      <div className="default-page-bg overflow-auto"> {/*Calculator Background here*/}
        <div className="flex flex-col w-full sm:w-1/2 mt-6 mb-6 bg-white shadow-lg rounded-lg p-2 sm:p-1">
          <h1 className="title text-center">
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
                    {num === 1 ? "<2k" : num === 2 ? "2k to 4k" : num === 3 ? "4k to 6k" : num === 4 ? "6k to 8k" : "8k+"}
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


          <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />
          {/* Transportation Mode */}
          <div className="sus-calc-input">
                <div className="sus-calc-topic">
                  <label className="sus-calc-title">
                    Primary Transportation Mode
                  </label>
                  <p>Pick your most frequently used method of transportation.</p>
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
                  {[1, 2, 3].map((num) => (
                    <div key={`trans${num}`} className="sus-calc-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        id={`trans${num}`}
                        name="transportation_mode"
                        className="hoverable-bubble-div custom-radio"
                        onChange={handleTransportationMode}
                        checked={transportationMode === `trans${num}`}
                      />
                      <label htmlFor={`trans${num}`} className="text-lg">
                        {num === 1 ? "Gas Car" : num === 2 ? "Hybrid/Carpool" : "Walk/Bike/EV"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />
          {/* Waste Management */}
            <div className="sus-calc-input">
              <div className="sus-calc-topic">
                <label className="sus-calc-title">
                  Waste Management
                </label>
                <p>How often do you choose to use recycling and composting?</p>
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
                {[1, 2, 3].map((num) => (
                  <div key={`waste${num}`} className="sus-calc-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      id={`waste${num}`}
                      name="waste_management"
                      className="hoverable-bubble-div custom-radio"
                      onChange={handleWasteManagement}
                      checked={wasteManagement === `waste${num}`}
                    />
                    <label htmlFor={`waste${num}`} className="text-lg">
                      {num === 1 ? "Never" : num === 2 ? "Sometimes" : "Always"}
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
                <button 
                  onClick={handleCopy} 
                  className={"copyButton"}
                  aria-label="Copy definition"
                >
                  {copied ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8M10 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V10C20 9.46957 19.7893 8.96086 19.4142 8.58579C19.0391 8.21071 18.5304 8 18 8H10C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10V18C8 18.5304 8.21071 19.0391 8.58579 19.4142C8.96086 19.7893 9.46957 20 10 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                <h2 className="text-xl font-semibold mb-4">Understanding Your Score</h2>
                <div 
                  className="sustainability-response" 
                  dangerouslySetInnerHTML={renderResponseHTML(chatbotResponse)} 
                  style={{ lineHeight: '1.5' }}
                />


                <div className="flex flex-col gap-4 mt-4">
                  {/* Expandable Email Input Section */}
                  {showEmailInput && (
                    <div className="transition-all duration-300 ease-in-out">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Enter your email to receive your results. Your email will not be saved.
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
                      <Link
                        href={`/chatbot?question=${encodeURIComponent(`Further explain my score, and give additional tips: ${chatbotResponse}`)}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 text-center"
                      >
                        Talk to Chatbot
                      </Link>

                    <button
                      onClick={() => setShowEmailInput(true)}
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Email Me My Score
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
