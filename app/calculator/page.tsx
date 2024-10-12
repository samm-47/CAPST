// app/calculator/page.tsx
"use client"; // Mark this as a Client Component for client-side hooks

import Image from 'next/image';
import Link from 'next/link';
import React, {useState} from 'react';
// Important for creation of the logo top right
import Layout from "./calculator_layout";


const CalculatorPage = () => {
  // Used to track different values input by user into calculator
  
  const calculateScore = () => {
    console.log("Button called");
    const susScore = document.getElementById("susScoreValue");
    const energyInputElement = document.getElementById("energyConsumption") as HTMLInputElement;
    const x = energyInputElement.value;
    if (susScore) {
      susScore.textContent = "Sustainable!" + "\nx = " + x.toString();
    }
    else {
      console.error("Sustainability score calculation error: No element found.");
    }
  }

  return (
    
    <Layout>
      {/*} CSS grid to center content like home tsx page*/}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {/* Main content area (centered) */}
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl">Sustainability Calculator</h1>
          <p className="text-lg mt-4">This is a basic calculator placeholder page.</p>
          <div className="flex flex-col items-center w-full max w-lg">
            {/*Input Section*/}
            <form>
              <label htmlFor="energyConsumption">Energy Consumption (kWh): </label>
              <input type="number" id="energyConsumption" name="energyConsumption" step="any"></input>
              {/* Fix invalid inputs containing characters besides 0-9 */}
            </form>
            <form>
              <label htmlFor="waterUsage">Water Usage (L): </label>
              <input type="number" id="waterUsage" name="waterUsage" step="any"></input>
            </form>
            <form>
              <label htmlFor="carbonFootprint">Carbon Footprint (CO2e): </label>
              <input type="number" id="carbonFootprint" name="carbonFootprint" step="any"></input>
            </form>
          </div>

          <div>
            {/*Calculate Score Button*/}
            <button
              onClick={calculateScore}
              className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
              Calculate Score
            </button>
          </div>

          <div>
            <label htmlFor= "susScoreLabel">Sustainability Score: </label>
            <label htmlFor= "susScoreValue" id="susScoreValue"> </label>
          </div>
        </main>
      </div>

    </Layout>

  );
};

export default CalculatorPage;
