// app/calculator/page.tsx
"use client"; // Mark this as a Client Component for client-side hooks

// Important for creation of the logo top right
import Layout from "./calculator_layout";


const CalculatorPage = () => {
  // Used to track different values input by user into calculator
  
  const calculateScore = () => {
    console.log("Button called");
    const susScore = document.getElementById("susScoreValue");
    const energyInputElement = document.getElementById("energyConsumption") as HTMLInputElement;
    const x = energyInputElement.value;
    const waterUsageElement = document.getElementById("waterUsage") as HTMLInputElement;
    const y = waterUsageElement.value;
    const carbonFootprintElement = document.getElementById("carbonFootprint") as HTMLInputElement;
    const z = carbonFootprintElement.value;
    if (susScore) {
      susScore.textContent = "Got inputs of " + x.toString() + ", " + y.toString() + ", " + z.toString();
    }
    else {
      console.error("Sustainability score calculation error: No element found.");
    }
  }

  return (
    
    <Layout>
      {/*} CSS grid to center content like home tsx page*/}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-mint-green to-[#FFFFFF]"> {/*Chatbot Background here*/}
        <h1 className="text-4xl font-bold mt-4">Sustainability Calculator</h1>
        <p className="text-lg mt-4 mb-4 text-gray-600">Please enter the following information so we can calculate your sustainability score!</p>
        <div className="flex flex-col w-1/2 bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col w-full max-w-lg mb-4">
            {/* Input Section */}
            <form className="flex flex-col w-full space-y-4">
              <div className="flex justify-between w-full">
                <label htmlFor="energyConsumption" className="w-1/2 text-lg p-2">Energy Consumption (kWh): </label>
                {/* TODO: Remove weird effect where outline is removed when selecting input. */}
                <input type="number" id="energyConsumption" name="energyConsumption" step="any" className="w-1/2 ml-4 text-lg p-2 rounded-md outline outline-3 outline-green-500"/>
              </div>
              <div className="flex justify-between w-full">
                <label htmlFor="waterUsage" className="w-1/2 text-lg p-2">Water Usage (L): </label>
                <input type="number" id="waterUsage" name="waterUsage" step="any" className="w-1/2 ml-4 text-lg p-2 rounded-md outline outline-3 outline-green-500"/>
              </div>
              <div className="flex justify-between w-full">
                <label htmlFor="carbonFootprint" className="w-1/2 text-lg p-2">Carbon Footprint (CO2e): </label>
                <input type="number" id="carbonFootprint" name="carbonFootprint" step="any" className="w-1/2 ml-4 text-lg p-2 rounded-md outline outline-3 outline-green-500"/>
              </div>
            </form>
          </div>
          <div className="mb-4">
            {/*Calculate Score Button*/}
            <button
              onClick={calculateScore}
              className="jmb-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
              >
              Calculate Score
            </button>
          </div>
          <div className="space-x-4">
            <label htmlFor= "susScoreLabel" className="text-lg">Sustainability Score:</label>
            <label htmlFor= "susScoreValue" id="susScoreValue" className="text-lg"> </label>
          </div>
        </div>  
      </div>    
    </Layout>

  );
};

export default CalculatorPage;
