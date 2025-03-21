// app/page.tsx
"use client"
import Image from "next/image";
import Link from "next/link";
import "./globals.css"

export default function Home() {
  const ribbonCards = [
    {
      title: "Calculator",
      description: "Use our calculator to estimate your current sustainability score.",
      link: "/calculator",
      icon: "fa-solid fa-calculator",
    },
    {
      title: "Chatbot",
      description: "Ask our chatbot any questions you have about sustainable living.",
      link: "/chatbot",
      icon: "fa-regular fa-comment",
    },
    {
      title: "FAQ",
      description: "Find answers to frequently asked questions.",
      link: "/faq",
      icon: "fa-regular fa-question-circle",
    },
    {
      title: "GreenifyAI",
      description: "Learn more about Green Expectations and sustainable housing.",
      link: "https://greenifyai.com/",
      icon: "fa-solid fa-house",
      external: true,
    },
  ];
  
  const handleExternalClick = (e: React.MouseEvent, link: string) => {
    const confirmLeave = window.confirm("You're about to leave SustainABLE. Continue?");
    if (!confirmLeave) {
      e.preventDefault(); // Stop navigation
    }
  };
  
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
          {ribbonCards.map((card, index) => (
            <div key={index} className="nav-ribbon-card">
              <h2 className="nav-ribbon-card-title">{card.title}</h2>
              <p className="nav-ribbon-card-caption">{card.description}</p>
              <Link
                href={card.link}
                className="nav-ribbon-card-button"
                {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={card.external ? (e) => handleExternalClick(e, card.link) : undefined}
              >
                {card.title}
                <i className={`ml-2 fa-lg ${card.icon}`}></i>
              </Link>
            </div>
          ))}
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
