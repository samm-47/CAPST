// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import "./globals.css"

export default function Home() {
  return (
    <div>
      <div className="home-page-bg">
        <div className="flex-col-centered gap-[2vh]">
          <div className="flex flex-row-centered gap-[1vw]">
            <div className="flex-col-centered">
              <Image
                className="w-[100px] h-[100px]"
                src="/greenliving_iconv1.png"
                alt="Green Living logo"
                loading="eager"
                width={100}
                height={100}
                priority
              />
            </div>
            <div className="flex-col-centered">
              <h1 className="text-5xl">Sustain</h1>
              <h1 className="text-5xl font-semibold mr-auto">ABLE</h1>
            </div>
          </div>
          {/* Title after icon */}
          <div className="mt-16 sm:mt-0 px-4 text-center"> {/* add margin and centering of the text when mobile only*/}
            <p className="text-2xl">
              <span className="font-semibold">
                Constructing Resourceful Communities:
              </span>
              &nbsp;Your #1 Resource for 
              <span className="coffee-green font-semibold" style={{color:"#006241"}}>
                  &nbsp;Sustainable Living&nbsp;
                </span> 
            </p>
          </div>
        </div>
        
        <div className="nav-ribbon-body mt-[1vh]">
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
                <i className="ml-2 fa-lg fa-solid fa-calculator"></i>
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
                  <i className="ml-2 fa-lg fa-regular fa-comment"></i>
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
                  <i className="ml-2 fa-lg fa-regular fa-question-circle"></i>
                </Link>
              </div>

            {/* Card for Green Expectations */}
              <div className="nav-ribbon-card">
                <h2 className="nav-ribbon-card-title">
                  GreenifyAI
                </h2>
                <p className="nav-ribbon-card-caption">
                  Learn more about Green Expectations and sustainable housing.
                </p>
                {/* Link to the GreenExpectations Real Estate website */}
                <Link
                href="https://greenifyai.com/"
                className="nav-ribbon-card-button"
                // Used to open website in a new tab
                target="_blank" rel="noopener noreferrer"        
                >
                GreenifyAI
                <i className="ml-2 fa-lg fa-solid fa-house"></i> {/* House Icon */}
                </Link>
              </div>
        </div>

        {/* Footer link to FAQ */}
        <div className="flex-row-centered h-[4vh]">
          <Link className="flex-row-centered gap-[0.75vw]" href="/faq" passHref>
            <i className="footer-icon fa-solid fa-lg fa-info-circle mr-1"></i> {/*} Question Mark Icon*/}
            <p className="footer-text hoverable-div"> SustainABLE vs. GreenifyAI</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
