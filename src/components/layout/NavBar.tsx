import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import LogoAnimation from "../shared/LogoAnimation";
import "./NavBar.css";

const navLinks = [
  { key: "work", label: "01/WORK", url: "/" },
  { key: "projects", label: "02/PROJECTS", url: "/projects" },
  { key: "about", label: "03/ABOUT", url: "/about" },
  { key: "contact", label: "04/CONTACT", url: "/contact" },
];

export default function NavBar() {
  const { theme, toggleTheme, locale, setLocale, toggleCommandPalette } = useAppContext();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for header shrink transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const isActive = (url: string) => {
    if (url === "/") return currentPath === "/";
    return currentPath.startsWith(url);
  };

  return (
    <>
      <nav className={`navbar${isScrolled ? " navbar--scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        {/* ── Left: Logo ─────────────────────────────────── */}
        <Link to="/" className="nav-logo" aria-label="Home">
          <LogoAnimation size={isScrolled ? 40 : 60} className="nav-logo-animation" />
        </Link>

        {/* ── Center: Nav Links ───────────────────────────── */}
        <ul className="nav-links" role="list">
          {navLinks.map((link) => {
            const active = isActive(link.url);
            return (
              <li key={link.url} className="nav-item">
                <Link
                  to={link.url}
                  className={`nav-link${active ? " nav-link--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="nav-link-label">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Right: Controls ────────────────────────────── */}
        <div className="nav-controls">
          {/* Ctrl+K hint */}
          <button
            className="nav-ctrl-k"
            onClick={toggleCommandPalette}
            aria-label="Open command palette (Ctrl+K)"
            id="nav-command-palette-btn"
          >
            <span>⌘K</span>
          </button>

          {/* Language toggle */}
          <button
            className="nav-toggle"
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
            id="nav-locale-toggle"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger${isMobileMenuOpen ? " open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            id="nav-mobile-menu-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ─────────────────────────── */}
      <div
        className={`nav-mobile-overlay${isMobileMenuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <ul className="nav-mobile-links" role="list">
          {navLinks.map((link) => {
            const active = isActive(link.url);
            return (
              <li key={link.url}>
                <Link
                  to={link.url}
                  className={`nav-mobile-link${active ? " active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="nav-mobile-num">{link.label.split("/")[0]}</span>
                  <span>{link.label.split("/")[1]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="nav-mobile-controls">
          <button
            className="nav-toggle chamfered"
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            id="nav-mobile-locale"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
          <button
            className="nav-toggle chamfered"
            onClick={toggleTheme}
            id="nav-mobile-theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </div>
    </>
  );
}
