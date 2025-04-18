// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import "./globals.css"

export default function Home() {
  const navCards = [
    {
      title: "Calculator",
      caption: "Use our calculator to estimate your current sustainability score.",
      href: "/calculator",
      icon: "fa-solid fa-calculator",
    },
    {
      title: "Chatbot",
      caption: "Ask our chatbot any questions you have about sustainable living.",
      href: "/chatbot",
      icon: "fa-regular fa-comment",
    },
    {
      title: "FAQ",
      caption: "Find answers to frequently asked questions.",
      href: "/faq",
      icon: "fa-regular fa-question-circle",
    },
    {
      title: "Glossary",
      caption: "Use our glossary to understand sustainability terms.",
      href: "/glossary",
      icon: "fa-regular fa-lightbulb",
    },
  ];  
  return (
    <div>
      <div className="home-page-bg">
        <div className="flex-col-centered gap-[2vh]">
          <div className="flex flex-row-centered gap-[1vw]">
            <div className="flex-col-centered">
              <Image
                className="w-[100px] h-[100px]"
                src="/greenliving_iconv1.png"
                alt="SustainABLE logo"
                loading="eager"
                width={100}
                height={100}
                priority
              />
            </div>
            <div className="flex-col-centered">
              <h1 className="text-6xl font-semibold">Sustain</h1>
              <h1 className="text-6xl mr-auto">ABLE</h1>
            </div>
          </div>
          {/* Title after icon */}
          <div className="mt-16 sm:mt-0 px-4 text-center"> {/* add margin and centering of the text when mobile only*/}
            <p className="text-2xl">
              <span>
                Creating
              </span>
              <span className="coffee-green font-semibold" style={{color:"#006241"}}>
                &nbsp;Resourceful Communities&nbsp;
              </span>
              <span>
                and Promoting
              </span>
              <span className="coffee-green font-semibold" style={{color:"#006241"}}>
                &nbsp;Sustainable Living&nbsp;
              </span> 
            </p>
          </div>
        </div>
        {/* Ribbon Card Creation */}
        <div className="nav-ribbon-body mt-[1vh]">
          {navCards.map((card, index) => (
            <div className="nav-ribbon-card" key={index}>
              <h2 className="nav-ribbon-card-title">{card.title}</h2>
              <p className="nav-ribbon-card-caption">{card.caption}</p>
              <Link href={card.href} className="nav-ribbon-card-button">
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
            <p className="footer-text hoverable-faq"> SustainABLE vs. GreenifyAI </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
