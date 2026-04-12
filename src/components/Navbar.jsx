import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          KUSHAGRA
        </a>
        
        {/* Desktop Links */}
        <ul className="nav-links">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <div className="nav-cta hide-mobile">
            <a href="#contact" className="btn-primary">Let's Connect</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#home" className="mobile-nav-link" onClick={toggleMenu}>Home</a>
          <a href="#about" className="mobile-nav-link" onClick={toggleMenu}>About</a>
          <a href="#projects" className="mobile-nav-link" onClick={toggleMenu}>Projects</a>
          <a href="#contact" className="mobile-nav-link" onClick={toggleMenu}>Contact</a>
          <div className="mobile-menu-cta">
            <a href="#contact" className="btn-primary" onClick={toggleMenu}>Let's Connect</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
