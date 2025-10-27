import { useState, useEffect } from 'react';
import '../shared/ProjectCard.css';
import BinaryRain from '../shared/BinaryRain';

export default function ContactComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const textToType = "Get In Touch";
  const typingSpeed = 100;

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(textToType.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, textToType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative overflow-hidden">
      {/* Binary Rain Background */}
      <BinaryRain />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-primary">
              {displayedText}
              <span className="cursor text-primary animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate? Let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - Terminal Style */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <span className="terminal-title">contact-form.sh</span>
            </div>

            <div className="terminal-body p-6">
              <div className="terminal-prompt mb-4">
                <span className="text-gray-400">$ </span>
                <span className="text-primary">./send-message.sh</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="terminal-form-group">
                  <label className="terminal-label">
                    <span className="text-gray-400">$ </span>
                    <span className="text-blue-400">echo</span>
                    <span className="text-gray-300"> "Enter your name:"</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="terminal-input"
                    placeholder="YounesBouhouche"
                  />
                </div>

                {/* Email Field */}
                <div className="terminal-form-group">
                  <label className="terminal-label">
                    <span className="text-gray-400">$ </span>
                    <span className="text-blue-400">echo</span>
                    <span className="text-gray-300"> "Enter your email:"</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="terminal-input"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div className="terminal-form-group">
                  <label className="terminal-label">
                    <span className="text-gray-400">$ </span>
                    <span className="text-blue-400">echo</span>
                    <span className="text-gray-300"> "Enter subject:"</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="terminal-input"
                    placeholder="Let's collaborate"
                  />
                </div>

                {/* Message Field */}
                <div className="terminal-form-group">
                  <label className="terminal-label">
                    <span className="text-gray-400">$ </span>
                    <span className="text-blue-400">cat</span>
                    <span className="text-gray-300"> {'>'}  message.txt</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="terminal-textarea"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <div className="terminal-submit-section">
                  <div className="terminal-prompt mb-2">
                    <span className="text-gray-400">$ </span>
                    <span className="text-yellow-400">./send-message.sh</span>
                    <span className="text-gray-300"> --execute</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="terminal-button-link w-full cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                  </button>
                </div>

                {/* Success Message */}
                {submitMessage && (
                  <div className="terminal-output">
                    <span className="text-gray-400">$ </span>
                    <span className="text-primary">{submitMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-button close"></span>
                  <span className="terminal-button minimize"></span>
                  <span className="terminal-button maximize"></span>
                </div>
                <span className="terminal-title">contact-info.json</span>
              </div>
              <div className="terminal-body p-6">
                <div className="space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-blue-400">"email"</span>
                    <span className="text-gray-400">: </span>
                    <a href="mailto:younes.bouhouche12@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                      "younes.bouhouche12@gmail.com"
                    </a>
                  </div>
                  <div>
                    <span className="text-blue-400">"linkedin"</span>
                    <span className="text-gray-400">: </span>
                    <a href="https://www.linkedin.com/in/younesbouh05" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                      "linkedin.com/in/younesbouh05"
                    </a>
                  </div>
                  <div>
                    <span className="text-blue-400">"github"</span>
                    <span className="text-gray-400">: </span>
                    <a href="https://github.com/YounesBouhouche" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                      "github.com/YounesBouhouche"
                    </a>
                  </div>
                  <div>
                    <span className="text-blue-400">"twitter"</span>
                    <span className="text-gray-400">: </span>
                    <a href="https://twitter.com/younesbouh_05" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                      "@younesbouh_05"
                    </a>
                  </div>
                  <div>
                    <span className="text-blue-400">"instagram"</span>
                    <span className="text-gray-400">: </span>
                    <a href="https://instagram.com/younesb_05" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                      "@younesb_05"
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-button close"></span>
                  <span className="terminal-button minimize"></span>
                  <span className="terminal-button maximize"></span>
                </div>
                <span className="terminal-title">status.log</span>
              </div>
              <div className="terminal-body p-6">
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400">Available for new projects</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="text-blue-400">Response time:</span> Usually within 24 hours
                  </div>
                  <div className="text-gray-400">
                    <span className="text-blue-400">Preferred contact:</span> Email or LinkedIn
                  </div>
                  <div className="text-gray-400">
                    <span className="text-blue-400">Time zone:</span> UTC+1 (Central European Time)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
