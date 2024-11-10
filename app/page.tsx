// app/page.tsx
import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <div className="home-page-bg">
        <div className="flex-col-centered gap-[2vh]">
          <div className="flex-row-centered gap-[1vw]">
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
              <h1 className="text-4xl font-semibold">GEACRE Home</h1>
          </div>

          <div>
              <p className="text-xl">Dedicated to building and creating sustainable and affordable housing solutions for New Jersey residents.</p>
          </div>
        </div>
        
        <div className="nav-ribbon-body mt-[2vh]">
          {/* Card for Calculator */}
            <div className="nav-ribbon-card">
              <h2 className="nav-ribbon-card-title">
                Calculator
              </h2>
              <p className="nav-ribbon-card-caption">
                Use our calculator to estimate your current sustainability score.
              </p>
              {/* Link to the Calculator page */}
              <Link
                href="/calculator"
                className="nav-ribbon-card-button"
              >
                Calculator
                <i className="ml-2 fa-solid fa-calculator"></i>
              </Link>
            </div>

          {/* Card for Chatbot */}
            <div className="nav-ribbon-card">
                <h2 className="nav-ribbon-card-title">
                  Chatbot
                </h2>
                <p className="nav-ribbon-card-caption">
                  Ask our chatbot any questions you have about sustainable living.
                </p>
                {/* Link to the Chatbot page */}
                <Link
                  href="/chatbot"
                  className="nav-ribbon-card-button"
                >
                  Chatbot
                  <i className="ml-2 fa-regular fa-comment"></i>
                </Link>
              </div>

            {/* Card for FAQ */}
              <div className="nav-ribbon-card">
                <h2 className="nav-ribbon-card-title">FAQ</h2>
                <p className="nav-ribbon-card-caption">
                  Find answers to frequently asked questions.
                </p>
                {/* Link to the FAQ page */}
                <Link
                  href="/faq"
                  className="nav-ribbon-card-button"
                >
                  FAQ
                  <i className="ml-2 fa-solid fa-question"></i>
                </Link>
              </div>

            {/* Card for Green Expectations */}
              <div className="nav-ribbon-card">
                <h2 className="nav-ribbon-card-title">
                  Green Expectations
                </h2>
                <p className="nav-ribbon-card-caption">
                  Learn more about Green Expectations and sustainable housing.
                </p>
                {/* Link to the GreenExpectations Real Estate website */}
                <Link
                href="https://greenexpectations.us/"
                className="nav-ribbon-card-button"
                // Used to open website in a new tab
                target="_blank" rel="noopener noreferrer"        
                >
                GreenExpectations
                <i className="ml-2 fa-solid fa-house"></i> {/* House Icon */}
                </Link>
              </div>
        </div>

        {/* used for spacing */}
        <div>
        </div>

      </div>
    </div>
  );
}
