import { useState, useEffect } from 'react';

export default function Header() {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const textsToType = [
    "<YounesBouhouche/>",
    "Android Developer",
    "Web Developer", 
    "Laravel Beginner"
  ];
  
  const getTextColor = () => {
    switch (textIndex) {
      case 0: // Younes Bouhouche
        return 'text-primary';
      case 1: // Android Developer
        return 'text-android';
      case 2: // Web Developer (React)
        return 'text-react';
      case 3: // Laravel Beginner
        return 'text-laravel';
      default:
        return 'text-primary';
    }
  };

  const getBackgroundClass = () => {
    switch (textIndex) {
      case 0:
        return 'bg-primary-blur';
      case 1:
        return 'bg-android-blur';
      case 2:
        return 'bg-react-blur';
      case 3:
        return 'bg-laravel-blur';
      default:
        return 'bg-primary-blur';
    }
  };
  
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDelay = 2000;

  const images = [
    "https://developer.android.com/static/images/studio/studio-hero_1440.png",
    "https://developer.android.com/static/images/studio/studio-hero_1440.png",
    "https://code.visualstudio.com/assets/home/hero-poster-dark.webp",
    "https://www.jetbrains.com/guide/assets/thumbnail-942d90e0.png"
  ];

  useEffect(() => {
    const currentText = textsToType[textIndex];
    
    const timer = setTimeout(() => {
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
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, textIndex, textsToType]);

  return (
    <header className="header">
      <div className={`background ${getBackgroundClass()}`}></div>
      <div className="content">
        <h1>
          Welcome, I'm <br />
          <span className={`typewriter ${getTextColor()}`}>
            {displayedText}
            <span className="cursor">|</span>
          </span>
        </h1>
      </div>
      <div className={`overflow-hidden aspect-video w-[60%] absolute right-0 translate-x-1/4 shadow-2xl rounded-xl object-cover transition-all duration-500 ease-in-out
        ${textIndex > 0 ? 'opacity-100' : 'opacity-0 invisible'}
        `}>
        {
          images.map((src, idx) => (
            <img 
              key={idx}
              src={src} 
              alt={`Background ${idx + 1}`} 
              className={`absolute top-0 left-0 w-full h-full object-top-left object-cover transition-opacity duration-1000 ease-in-out ${idx === textIndex ? 'opacity-100' : 'opacity-0'}`} 
            />
          ))
        }
      </div>
      {/* <img src={picture}
        className={`absolute bottom-0 right-20 h-[calc(100%-120px)] transition-all ${textIndex == 0 ? 'opacity-100' : 'opacity-0 invisible'}`}
      /> */}
    </header>
  );
}