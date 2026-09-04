import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.35;
  }, []);

  return (
    <section id="hero">
      <div>
        <h1>Aijaz Ahmed</h1>
        <img src="/title.png" alt="Full Stack Software Engineer" />
      </div>

      <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

      <a className="hero-cta" href="#performance">View Projects</a>

      <p>React · .NET · SQL Server · AI · Cloud</p>
    </section>
  );
};
export default Hero;
