// app/page.tsx
import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (      
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-8 pb-12 bg-gradient-to-b from-mint-green to-[#FFFFFF]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {/* Green Expectations Logo Image */}
        <Image
          className="object-cover"
          src="/green_expectations_logo.png"
          alt="Green Expectations.png logo"
          loading="eager"
          width={50}
          height={50}
          priority
        />
        <div className="list-inside list-decimal text-sm text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          <h1 className="text-4xl">GEACRE Home</h1>
          <p className="text-xl mt-4">Dedicated to building and creating sustainable and affordable housing solutions for New Jersey residents.</p>
        </div>
        
         {/* Ribbon Section */}
        <div className="w-full bg-[rgba(55,65,81,0.90)] py-8 sm:py-12">{/* Gray ribbon across middle */}
          <div className="flex gap-4 flex-col sm:flex-row items-center justify-center">

            {/* Card for Calculator */}
            <div className="ml-4 h-48 md:h-64 lg:h-96 bg-white border border-gray-300 shadow-xl rounded-lg p-6 text-center flex flex-col justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Calculator</h2>
              <p className="text-lg text-gray-600 mb-4">
                Use our calculator to estimate your current sustainability.
              </p>
              {/* Link to the Calculator page */}
              <Link
                href="/calculator"
                className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-coffee-green"
              >
                Calculator
                <i className="ml-2 fa-solid fa-calculator"></i>
              </Link>
            </div>
            {/* Card for Chatbot */}
            <div className="h-48 md:h-64 lg:h-96 bg-white border border-gray-300 shadow-xl rounded-lg p-6 text-center flex flex-col justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Chatbot</h2>
              <p className="text-lg text-gray-600 mb-4">
                Ask our chatbot any questions you have about the services.
              </p>
              {/* Link to the Chatbot page */}
              <Link
                href="/chatbot"
                className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-coffee-green"
              >
                Chatbot
                <i className="ml-2 fa-regular fa-comment"></i>
              </Link>
            </div>
            {/* Card for FAQ */}
            <div className="h-96 bg-white border border-gray-300 shadow-xl rounded-lg p-6 text-center flex flex-col justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">FAQ</h2>
              <p className="text-lg text-gray-600 mb-4">
                Find answers to frequently asked questions.
              </p>
              {/* Link to the FAQ page */}
              <Link
                href="/faq"
                className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-coffee-green"
              >
                FAQ
                <i className="ml-2 fa-solid fa-question"></i>
              </Link>
            </div>
            {/* Card for Green Expectations */}
            <div className="mr-4 h-96 bg-white border border-gray-300 shadow-2xl rounded-lg p-6 text-center flex flex-col justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Green Expectations</h2>
              <p className="text-lg text-gray-600 mb-4">
                Learn more about Green Expectations.
              </p>
                          {/* Link to the GreenExpectations Real Estate website */}
              <Link
              href="https://greenexpectations.us/"
              className="green-expectations-us bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 hover:bg-coffee-green"
              // Used to open website in a new tab
              target="_blank" rel="noopener noreferrer"        
              >
              Green Expectations
              <i className="ml-2 fa-solid fa-house"></i> {/* House Icon */}
              </Link>
            </div>
          </div>
        </div>
        {/* TODO: Add same sized footer with same gradient as header*/}       
      </main>
    </div>
  );
}
