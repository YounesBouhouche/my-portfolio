import { Link } from "@tanstack/react-router";
import './NavBar.css'
import { useEffect, useState } from "react";


export default function NavBar() {
  const navLinks = [
    {
      label: "Home",
      url: "/"
    },
    {
      label: "About",
      url: "/about"
    },
    {
      label: "Projects",
      url: "/projects"
    },
    {
      label: "Contact",
      url: "/contact"
    }
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollOffset > windowHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={"navbar" + (isScrolled ? " scrolled" : "")}>
        <Link to="/" className="nav-brand">&lt;<span>YbCoding</span>/&gt;</Link>
        
        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.url} className="nav-item">
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.url} className="mobile-nav-item">
                <Link to={link.url} onClick={closeMobileMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}