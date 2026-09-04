import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { performanceImages, performanceImgPositions } from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef(null);

  useGSAP(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    gsap.fromTo(
      ".content p",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".content p",
          start: "top bottom",
          end: "top center",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    if (isMobile) return;

    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
      scrollTrigger: {
        trigger: sectionEl,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    performanceImgPositions.forEach((item) => {
      if (item.id === "p5") return;
      const vars = {};
      if (typeof item.left === "number") vars.left = `${item.left}%`;
      if (typeof item.right === "number") vars.right = `${item.right}%`;
      if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;
      if (item.transform) vars.transform = item.transform;
      tl.to(`.${item.id}`, vars, 0);
    });
  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Selected projects. Real-world engineering.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img key={item.id} src={item.src} className={item.id} alt={item.alt || `Project screen ${index + 1}`} />
        ))}
      </div>

      <div className="content">
        <p>
          My portfolio includes an <span className="text-white">enterprise IT inventory system</span>, a secure contextual AI assistant, a real-time watch-party platform and modern management applications. Each project demonstrates frontend design, backend APIs, database modeling, security decisions and practical deployment—not only visual presentation.
        </p>
      </div>
    </section>
  );
};
export default Performance;
