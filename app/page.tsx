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
          <li className="mb-2">Beginnings for GreenExpectations Web.</li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Link to the Calculator page */}
          <Link
            href="/calculator"
            className="bg-greenify-button-green mt-4 mb-8 rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 hover:bg-[#2e6957]"
          >
            Go to Calculator
          </Link>
          {/* Link to the Chatbot page */}
          <Link
            href="/chatbot"
            className="bg-greenify-button-green mt-4 mb-8 rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 hover:bg-[#2e6957]"
          >
            Go to Chatbot
          </Link>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/faq"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          FAQ
        </a>
      </footer>
    </div>
  );
}
