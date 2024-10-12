// app/page.tsx
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (      
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <h1 className="text-4xl">GEACRE Home</h1>
          <p className="text-lg mt-4">Placeholder format for Home page.</p>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">

          {/* Link to the Calculator page */}
          <Link
            href="/calculator"
            className="bg-greenify-button-green mt-4 mb-8 rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 hover:bg-[#2e6957]"
          >
            Calculator
            <i className="fa-solid fa-calculator"></i> {/* Calculator Icon */}
          </Link>
          {/* Link to the Chatbot page */}
          <Link
            href="/chatbot"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Chatbot
          </Link>
          {/* Link to the FAQ page */}
          <Link
            href="/faq"
            className="bg-greenify-button-green mt-4 mb-8 rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 hover:bg-[#2e6957]"
          >
            FAQ
          </Link>
          {/* Link to the GreenExpectations Real Estate website */}
          <Link
            href="https://greenexpectations.us/"
            className="green-expectations-us bg-greenify-button-green mt-4 mb-8 rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 hover:bg-[#2e6957]"
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"        
          >
            GreenExpectations Website
            <i className="fa-regular fa-comment"></i> {/* Chat Icon */}
          </Link>
        </div>
      </main>
    </div>
  );
}
