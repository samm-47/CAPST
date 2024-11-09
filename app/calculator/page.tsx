// app/calculator/page.tsx
"use client"; // Mark this as a Client Component for client-side hooks

// Important for creation of the logo top right
import Layout from "./calculator_layout";
import { useState } from "react";

import './custom_radio.css';

const CalculatorPage: React.FC = () => { 
  // Used to track the selected radio button 
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setSelectedOption(event.target.id); };
    
  const calculateScore = () => {
    const testval = document.getElementById("testval");

    if (!testval)
    {
      console.error("No element found.");
    }
    else
    {
      testval.textContent = "zap zap: " + selectedOption;
    }
  }

  return (
    
    <Layout>
      {/*} CSS grid to center content like home tsx page*/}
      <div className="default-page-bg"> {/*Calculator Background here*/}
        <h1 className="page-title">
          Sustainability Calculator
        </h1>
        <p className="page-caption">
          Please enter the following information so we can calculate your sustainability score!
        </p>

        {/* Main Content Section */}
        <div className="flex-col-centered w-2/3 bg-white shadow-lg rounded-lg p-8 gap-[4vh]">

            <div className="flex-col-centered w-5/6 gap-[4vh]">
              <label> Monthly Energy Consumption </label>
                <div className="flex-row-centered w-full">
                  <div className="flex-col-centered gap-[1vh]"> 
                    <input type="radio" id="option1" name="options" className="custom-radio" onChange={handleRadioChange}/> 
                      <label htmlFor="option1">
                        Text1
                      </label> 
                  </div>

                  <div className="flex-col-centered gap-[1vh]"> 
                    <input type="radio" id="option2" name="options" className="custom-radio" onChange={handleRadioChange}/> 
                      <label htmlFor="option2">
                        Text2
                      </label> 
                  </div>

                  <div className="flex-col-centered gap-[1vh]"> 
                    <input type="radio" id="option3" name="options" className="custom-radio" onChange={handleRadioChange}/> 
                      <label htmlFor="option3">
                        Text3
                      </label> 
                  </div>

                  <div className="flex-col-centered gap-[1vh]"> 
                    <input type="radio" id="option4" name="options" className="custom-radio" onChange={handleRadioChange}/> 
                      <label htmlFor="option4">
                        Text4
                      </label> 
                  </div>

                  <div className="flex-col-centered gap-[1vh]"> 
                    <input type="radio" id="option5" name="options" className="custom-radio" onChange={handleRadioChange}/> 
                      <label htmlFor="option5">
                        Text5
                      </label> 
                  </div>
              </div>
            </div>
            
            {/*Calculate Score Button*/}
            <div>
              <button
                onClick={calculateScore}
                className="jmb-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                >
                Calculate Score
              </button>
            </div>

            { /* temp label to test output */}
            <div className="flex-col-centered">
              <p> testing </p>
              <label htmlFor="testval" id="testval" className="text-lg"> </label>
            </div>
          </div>
        </div>  
    </Layout>
  );
};

export default CalculatorPage;
