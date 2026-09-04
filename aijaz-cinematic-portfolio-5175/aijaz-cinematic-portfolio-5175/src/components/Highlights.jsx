import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Highlights = () => {
  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });

  useGSAP(() => {
    gsap.to([".left-column", ".right-column"], {
      scrollTrigger: {
        trigger: "#highlights",
        start: isMobile ? "bottom bottom" : "top center",
      },
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="highlights">
      <h2>More than code. A complete engineering mindset.</h2>
      <h3>What I bring to every product and team.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Development workspace" />
            <p>Full-stack delivery from interface to database.</p>
          </div>
          <div>
            <img src="/sun.png" alt="Thoughtful user experience" />
            <p>Clean, responsive and accessible product experiences.</p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="Artificial intelligence" />
            <p>Practical <span>AI integration</span> for business workflows.</p>
          </div>
          <div>
            <img src="/battery.png" alt="Reliable engineering" />
            <p>
              Built for <span className="green-gradient">reliability and growth</span>.
              <span className="text-dark-100"> Clean architecture, security and maintainable code.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
