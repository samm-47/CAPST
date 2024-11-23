// app/calculator/page.tsx
"use client"; // Mark this as a Client Component for client-side hooks

// Important for creation of the logo top right
import Layout from "./calculator_layout";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import './custom_radio.css';

const CalculatorPage: React.FC = () => {

  // Used to track Energy Consumption radio selection.
  const [energyUsage, setEnergyUsage] = useState<string | null>(null);

  // Used to track Percent Renewable Energy radio selection.
  const [percentRenewable, setPercentRenewable] = useState<string | null>(null); 

  // Used to track Water Usage radio selection.
  const [waterUsage, setWaterUsage] = useState<string | null>(null); 

  // Used to track CO2 Level radio selection.
  const [airQuality, setAirQuality] = useState<string | null>(null); 
  
  const handleEnergyUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setEnergyUsage(event.target.id); };

  const handlePercentRenewable = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setPercentRenewable(event.target.id); };
    
  const handleWaterUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setWaterUsage(event.target.id); };

  const handleAirQuality = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setAirQuality(event.target.id); };
    
  const calculateScore = () => {
    const testval = document.getElementById("sustainabilityScoreLabel");

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
    sustainabilityScoreInt = energyConsumptionScore + 
                             renewableEnergyScore +
                             waterConsumptionScore +
                             airQualityScore;
    
    let sustainabilityScore:string;

    if (!testval)
    {
      console.error("No element found.");
    }
    else
    {
      if (sustainabilityScoreInt > 0 && sustainabilityScoreInt <= 5) {
        sustainabilityScore = "F";
      }
      else if (sustainabilityScoreInt > 5 && sustainabilityScoreInt <= 10) {
        sustainabilityScore = "D";
      }
      else if (sustainabilityScoreInt > 10 && sustainabilityScoreInt <= 13) {
        sustainabilityScore = "C";
      }
      else if (sustainabilityScoreInt > 13 && sustainabilityScoreInt <= 16) {
        sustainabilityScore = "B";
      }
      else if (sustainabilityScoreInt > 16 && sustainabilityScoreInt <= 19) {
        sustainabilityScore = "A";
      }
      else if (sustainabilityScoreInt == 20) {
        sustainabilityScore = "S";
      }
      else
      {
        sustainabilityScore = "Error: no inputs found.";
      }

      testval.textContent = sustainabilityScore;
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
          Please enter the following information to calculate your house&#39;s sustainability score!
        </p>

        {/* Main Content Section */}
        <div className="flex-col-centered w-2/3 bg-white shadow-lg rounded-lg p-8 gap-[4vh]">
          {/* Monthly Energy Consumption */}
          <div className="sus-calc-input">
            <label className="sus-calc-title"> 
              Monthly Energy Consumption (kWh) 
            </label>
            <div className="flex-row-centered w-full">
              {/* Radio options */}
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy1" name="energy_consume" className="custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy1" className="text-lg">
                    &lt;500
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy2" name="energy_consume" className="custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy2" className="text-lg">
                    500 to 650
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy3" name="energy_consume" className="custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy3" className="text-lg">
                    650 to 850
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy4" name="energy_consume" className="custom-radio" onChange={handleEnergyUsage}/>  
                  <label htmlFor="energy4" className="text-lg">
                    850 to 1000
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy5" name="energy_consume" className="custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy5" className="text-lg">
                    1000+
                  </label> 
              </div>
            </div>
          </div>

          {/* Percent Renweable Energy */}
          <div className="sus-calc-input">
            <label className="sus-calc-title"> 
              % Renewable Energy 
            </label>
            {/* Radio options */}
            <div className="flex-row-centered w-full">
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew1" name="renew_energy"  className="custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew1" className="text-lg">
                    &lt;20%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew2" name="renew_energy"  className="custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew2" className="text-lg">
                    20 to 40%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew3" name="renew_energy"  className="custom-radio" onChange={handlePercentRenewable}/>  
                  <label htmlFor="renew3" className="text-lg">
                    40 to 60%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew4" name="renew_energy"  className="custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew4" className="text-lg">
                    60 to 80%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew5" name="renew_energy" className="custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew5" className="text-lg">
                    80+%
                  </label> 
              </div>
            </div>
          </div>

          { /* Monthly Water Usage */}
          <div className="sus-calc-input">
            <label className="sus-calc-title"> 
              Monthly Water Usage (gal) 
            </label>

          <div className="flex-row-centered w-full">
          {/* Radio options */}
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water1" name="water_usage" className="custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water1" className="text-lg">
                  &lt;50
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water2" name="water_usage" className="custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water2" className="text-lg">
                  50 to 70
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water3" name="water_usage" className="custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water3" className="text-lg">
                  70 to 90
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water4" name="water_usage" className="custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water4" className="text-lg">
                  90 to 110
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water5" name="water_usage" className="custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water5" className="text-lg">
                  110+
                </label> 
            </div>
          </div>
        </div>

        { /* CO2 Level (Air Quality) */}
        <div className="sus-calc-input">
          <label className="sus-calc-title"> 
            Air Quality: CO2 Level (ppm) 
          </label>
        <div className="flex-row-centered w-full">
          {/* Radio options */}
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air1" name="air_quality" className="custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air1" className="text-lg">
                &lt;400
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air2" name="air_quality" className="custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air2" className="text-lg">
                400 to 500
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air3" name="air_quality" className="custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air3" className="text-lg">
                500 to 600
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air4" name="air_quality" className="custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air4" className="text-lg">
                600 to 700
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air5" name="air_quality" className="custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air5" className="text-lg">
                700+
              </label> 
          </div>
          </div>

          {/*Calculate Score Button*/}
          <div>
            <button
              onClick={calculateScore}
              className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-coffee-green"
              >
              Calculate Score
            </button>
          </div>

          { /* Label to display sustainability score */}
          <div className="flex-col-centered">
            <label htmlFor="sustainabilityScoreLabel" id="sustainabilityScoreLabel" className="text-6xl font-semibold"> </label>
          </div>
        </div>
      </div>
      
      {/* Footer link to FAQ */}
      <div className="flex-row-centered h-[8vh]">
        <Link className="flex-row-centered gap-[0.75vw]" href="/faq" passHref>
          <i className="footer-icon fa-solid fa-lg fa-question-circle"></i> {/*} Question Mark Icon*/}
          <p className="footer-text"> How is sustainability score calculated? </p>
        </Link>
      </div>

    </div>
    </Layout>
  );
};

export default CalculatorPage;
