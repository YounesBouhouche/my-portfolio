import { Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import BinaryRain from '../shared/BinaryRain';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const errorMessages = [
    "404",
    "ERROR: Page Not Found",
    "void main() { return null; }"
  ];
  const typingSpeed = 150;

  // Typewriter effect for error messages
  useEffect(() => {
    const currentText = errorMessages[currentPhase];
    
    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (currentPhase < errorMessages.length - 1) {
      // Move to next phase after a pause
      setTimeout(() => {
        setCurrentPhase(currentPhase + 1);
        setCurrentIndex(0);
        setDisplayedText('');
      }, 1500);
    }
  }, [currentIndex, currentPhase, errorMessages]);

  const glitchMessages = [
    "SEGMENTATION_FAULT",
    "NULL_POINTER_EXCEPTION", 
    "STACK_OVERFLOW",
    "ACCESS_DENIED",
    "MEMORY_LEAK_DETECTED",
    "INFINITE_LOOP_WARNING"
  ];

  return (
    <div className="min-h-screen py-30 bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Binary Rain Background */}
      <BinaryRain />

      {/* Glitch Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {glitchMessages.map((msg, index) => (
          <div
            key={index}
            className="absolute text-red-500 font-mono text-xs opacity-30"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `glitch 4s infinite`,
            }}
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Main Terminal Window */}
        <div className="terminal-window max-w-3xl mx-auto mb-12">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button close"></span>
              <span className="terminal-button minimize"></span>
              <span className="terminal-button maximize"></span>
            </div>
            <span className="terminal-title">system-error.log</span>
          </div>
          <div className="terminal-body p-8">
            <div className="space-y-6">
              {/* Terminal Prompt */}
              <div className="text-left">
                <span className="text-gray-400">$ </span>
                <span className="text-blue-400">cd</span>
                <span className="text-gray-300"> /requested-page</span>
              </div>
              
              {/* Error Display */}
              <div className="text-left font-mono">
                <div className="text-red-400 text-2xl md:text-4xl font-bold mb-4">
                  {displayedText}
                  {currentPhase === errorMessages.length - 1 && (
                    <span className="animate-pulse text-primary">|</span>
                  )}
                </div>
                
                {currentPhase >= 1 && (
                  <div className="space-y-2 text-gray-400">
                    <div>bash: /requested-page: No such file or directory</div>
                    <div className="text-yellow-400">Warning: The page you're looking for has been moved to /dev/null</div>
                    <div className="text-red-400">Error: Cannot resolve path '../requested-page'</div>
                  </div>
                )}
              </div>

              {/* Status Information */}
              {currentPhase >= 2 && (
                <div className="text-left space-y-2 border-t border-gray-700 pt-6">
                  <div className="text-gray-400">
                    <span className="text-blue-400">Status:</span> 404 - Resource not found
                  </div>
                  <div className="text-gray-400">
                    <span className="text-blue-400">Time:</span> {new Date().toLocaleString()}
                  </div>
                  <div className="text-gray-400">
                    <span className="text-blue-400">Process:</span> page_loader.exe has stopped working
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        {currentPhase >= 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-xl md:text-2xl text-gray-300">
              Don't worry, even the best developers get lost sometimes.
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/" className="terminal-button-link">
                <span>cd ~/ (Go Home)</span>
              </Link>
              
              <Link to="/projects" className="terminal-button-link">
                <span>ls projects/</span>
              </Link>
              
              <Link to="/contact" className="terminal-button-link">
                <span>./contact.sh</span>
              </Link>
            </div>

            {/* Debug Information */}
            <div className="terminal-window max-w-2xl mx-auto mt-8">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-button close"></span>
                  <span className="terminal-button minimize"></span>
                  <span className="terminal-button maximize"></span>
                </div>
                <span className="terminal-title">debug-info.txt</span>
              </div>
              <div className="terminal-body p-6">
                <div className="space-y-3 font-mono text-sm text-gray-400">
                  <div>
                    <span className="text-blue-400">Possible solutions:</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-primary">1.</span> Check the URL for typos
                  </div>
                  <div className="ml-4">
                    <span className="text-primary">2.</span> Navigate using the menu above
                  </div>
                  <div className="ml-4">
                    <span className="text-primary">3.</span> Return to the homepage
                  </div>
                  <div className="ml-4">
                    <span className="text-primary">4.</span> Contact the developer if you think this is a bug
                  </div>
                  <div className="mt-4 text-gray-500">
                    <span className="text-yellow-400">Note:</span> This page will self-destruct in... just kidding! 😄
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}