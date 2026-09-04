import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      timeline
        .to(".mask img", { transform: "scale(1.1)" })
        .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      <div className="media">
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />
        <div className="mask">
          <img src="/mask-logo.svg" alt="Aijaz Ahmed monogram reveal" />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Engineering with purpose.</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                I am <span className="text-white">Aijaz Ahmed, a Full Stack Software Engineer</span> focused on building software that is useful, secure and maintainable.
              </p>
              <p>
                My work combines modern React interfaces, ASP.NET Core services, structured databases and deployment workflows designed for real business environments.
              </p>
              <p>
                I care about clean architecture, thoughtful user experience, reliable APIs and code that another developer can understand and extend.
              </p>
              <a className="text-primary" href="#performance">Explore selected projects</a>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Built</p>
              <h3>20+ projects</h3>
              <p>across enterprise, full-stack, AI and real-time applications</p>
            </div>
            <div className="space-y-2">
              <p>Working with</p>
              <h3>15+ technologies</h3>
              <p>from frontend engineering to cloud deployment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Showcase;
