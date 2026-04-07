import React from 'react';
import { Github, Codeforces, LeetCode, Linkedin } from './Icons';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo">KUSHAGRA</a>
            <p className="footer-brand-text">
              Building next-gen digital experiences with precision and passion.
            </p>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Links</h4>
            <ul className="footer-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4 className="footer-title">Connect</h4>
            <div className="social-links footer-social-links">
              <a href="https://github.com/Kusagra9308" target="_blank" rel="noreferrer" className="social-icon"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/kushagra-singh-chauhan-a50597302" target="_blank" rel="noreferrer" className="social-icon"><Linkedin size={24} /></a>
              <a href="https://codeforces.com/profile/Kushagra123" target="_blank" rel="noreferrer" className="social-icon"><Codeforces size={24} /></a>
              <a href="https://leetcode.com/u/t0c9ziG9yt/" target="_blank" rel="noreferrer" className="social-icon"><LeetCode size={24} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Kushagra Singh Chauhan. All rights reserved.</p>
          <button onClick={scrollToTop} className="scroll-top-btn glass">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .footer {
          padding: 80px 0 40px;
          border-top: 1px solid var(--border);
          background: hsla(240, 10%, 2%, 0.4);
        }
        
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        
        .footer-brand-text {
          color: var(--text-muted);
          max-width: 300px;
          margin-top: 16px;
        }
        
        .footer-title {
          font-size: 1.1rem;
          margin-bottom: 24px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
        }
        
        .footer-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .footer-list a {
          color: var(--text-muted);
          transition: var(--transition);
        }
        
        .footer-list a:hover { color: var(--primary); }
        
        .footer-social-links { gap: 16px; }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .scroll-top-btn {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          transition: var(--transition);
          cursor: pointer;
        }
        
        .scroll-top-btn:hover {
          background: var(--primary);
          transform: translateY(-4px);
        }
        
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 40px; }
        }
      `}} />
    </footer>
  );
};

export default Footer;
