import { useState, useEffect } from "react";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const textsToType = [
    "<YounesBouhouche/>",
    "Android Developer",
    "Web Developer",
    "Laravel Beginner",
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDelay = 2000;

  useEffect(() => {
    const currentText = textsToType[textIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayedText(currentText.substring(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseDelay);
          }
        } else {
          if (currentIndex > 0) {
            setDisplayedText(currentText.substring(0, currentIndex - 1));
            setCurrentIndex(currentIndex - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((prevIndex) => (prevIndex + 1) % textsToType.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, textIndex, textsToType]);

  return (
    <section className="relative w-full h-[800px] min-h-[100dvh] flex items-center bg-background overflow-hidden border-b border-white/5 py-20 lg:py-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_20%)] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Younes
            </span>
          </h1>

          <div className="h-16 md:h-20 flex items-center font-mono text-2xl md:text-4xl text-primary font-bold">
            <span className="mr-2 text-gray-500">{">"}</span>
            <span>{displayedText}</span>
            <span className="animate-pulse ml-1 text-primary">_</span>
          </div>

          <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
            Building robust applications for Android and the Web. Passionate
            about clean code, performance, and user experience.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="terminal-button-link">
              View Projects
            </a>
            <a
              href="/contact"
              className="px-8 py-3 text-sm font-semibold tracking-wider uppercase border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all font-mono"
            >
              Contact Me
            </a>
            <a
              href="./assets/cv/document.pdf"
              download="Younes_Bouhouche_CV.pdf"
              className="px-8 py-3 text-sm font-semibold tracking-wider uppercase border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 font-mono"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
      <div className="opacity-30 lg:opacity-100 flex justify-center items-end absolute top-0 bottom-0 right-0 w-full lg:w-1/2 overflow-hidden pointer-events-none">
        <img
          src="./assets/png/me_bw.png"
          alt="Younes Bouhouche"
          className="h-[80%] lg:h-full object-contain object-bottom animate-float-in origin-bottom"
        />
      </div>
    </section>
  );
}
