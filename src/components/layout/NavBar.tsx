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

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollOffset > windowHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={"navbar" + (isScrolled ? " scrolled" : "")}>
      <Link to="/" className="nav-brand">&lt;<span>YbCoding</span>/&gt;</Link>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.url} className="nav-item">
            <Link to={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}