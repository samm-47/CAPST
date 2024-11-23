import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <div className="home-page-bg">
        <div className="flex-col-centered gap-[2vh]">
          <div className="flex-row-centered gap-[1vw]">
            <div className="flex-col-centered">
              {/* GreenLiving Icon Image */}
              <Image
                className="object-cover"
                src="/greenliving_iconv1.png"
                alt="Green Living logo"
                loading="eager"
                width={100}
                height={100}
                priority
              />
            </div>
            <div className="flex-col-centered">
              <h1 className="text-5xl font-semibold">Green</h1>
              <h1 className="text-5xl mr-auto">Living</h1>
            </div>
          </div>

          <div>
            <p className="text-2xl">
              <span className="font-semibold">
                Building a
                <span className="coffee-green font-semibold" style={{ color: "#006241" }}>
                  &nbsp;Greener&nbsp;
                </span>
                Future:
              </span>
              &nbsp;Sustainable Homes and Eco-Friendly Living
            </p>
          </div>
        </div>

        <div className="nav-ribbon-body mt-[1vh]">
          {/* Card for Calculator */}
          <div className="nav-ribbon-card">
            <h2 className="nav-ribbon-card-title">Calculator</h2>
            <p className="nav-ribbon-card-caption">
              Use our calculator to estimate your current sustainability score.
            </p>
            <Link href="/calculator" className="nav-ribbon-card-button">
              Calculator
              <i className="ml-2 fa-lg fa-solid fa-calculator"></i>
            </Link>
          </div>

          {/* Card for Chatbot */}
          <div className="nav-ribbon-card">
            <h2 className="nav-ribbon-card-title">Chatbot</h2>
            <p className="nav-ribbon-card-caption">
              Ask our chatbot any questions you have about sustainable living.
            </p>
            <Link href="/chatbot" className="nav-ribbon-card-button">
              Chatbot
              <i className="ml-2 fa-lg fa-regular fa-comment"></i>
            </Link>
          </div>

          {/* Card for FAQ */}
          <div className="nav-ribbon-card">
            <h2 className="nav-ribbon-card-title">FAQ</h2>
            <p className="nav-ribbon-card-caption">Find answers to frequently asked questions.</p>
            <Link href="/faq" className="nav-ribbon-card-button">
              FAQ
              <i className="ml-2 fa-lg fa-regular fa-question-circle"></i>
            </Link>
          </div>

          {/* Card for GreenifyAI */}
          <div className="nav-ribbon-card">
            <h2 className="nav-ribbon-card-title">GreenifyAI</h2>
            <p className="nav-ribbon-card-caption">
              Learn more about GreenifyAI and sustainable housing.
            </p>
            <Link
              href="https://greenifyai.com/"
              className="nav-ribbon-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              GreenifyAI
              <i className="ml-2 fa-lg fa-solid fa-house"></i>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-row-centered h-[4vh]">
          <Link className="flex-row-centered gap-[0.75vw]" href="/faq">
            <i className="footer-icon fa-solid fa-lg fa-info-circle"></i>
            <p className="footer-text">GreenLiving vs. GreenifyAI vs. GreenExpectations</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
