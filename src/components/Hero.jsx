import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile_no_bg.png';
import { Github, Codeforces, LeetCode, Linkedin } from './Icons';
import { ArrowRight, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="mesh-bg"></div>
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text-container"
        >
          <span className="hero-subline">Backend Engineer</span>
          <h1 className="hero-title">
            <span className="gradient-text">Kushagra</span> <br />
            Singh Chauhan
          </h1>
          <p className="hero-description">
            Building modern, high-performance full-stack applications with a deep focus 
            on scalable backend architectures and real-time data synchronization.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              View Work <ArrowRight className="inline-icon" size={18} />
            </a>
            <a 
              href="https://drive.google.com/file/d/1363D4YsnhJJtQdTwK2fztiPGsyGnp0mk/view" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              Resume <FileText className="inline-icon" size={18} />
            </a>
            <div className="social-links">
              <a href="https://github.com/Kusagra9308" target="_blank" rel="noreferrer" className="social-icon" title="GitHub"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/kushagra-singh-chauhan-a50597302" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn"><Linkedin size={24} /></a>
              <a href="https://codeforces.com/profile/Kushagra123" target="_blank" rel="noreferrer" className="social-icon" title="Codeforces"><Codeforces size={24} /></a>
              <a href="https://leetcode.com/u/t0c9ziG9yt/" target="_blank" rel="noreferrer" className="social-icon" title="LeetCode"><LeetCode size={24} /></a>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image-container"
        >
          <div className="hero-image-glow glass">
            <img src={profileImg} alt="Kushagra Singh Chauhan" className="hero-image" />
            <div className="abstract-visual-overlay">
               <div className="orbit-1"></div>
               <div className="orbit-2"></div>
               <div className="orbit-3"></div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .mesh-bg {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 80%;
          height: 150%;
          background: radial-gradient(circle at center, var(--primary) 0%, transparent 60%);
          filter: blur(120px);
          opacity: 0.15;
          z-index: 1;
        }
        
        .hero-subline {
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 16px;
          display: block;
        }
        
        .hero-title {
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        
        .hero-description {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 40px;
        }
        
        .hero-cta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        
        .inline-icon {
          vertical-align: middle;
          margin-left: 8px;
        }
        
        .social-links {
          display: flex;
          gap: 20px;
        }
        
        .social-icon {
          color: var(--text-muted);
          transition: var(--transition);
        }
        
        .social-icon:hover {
          color: var(--primary);
          transform: translateY(-2px);
        }
        
        .hero-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .hero-image-glow {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 60px 10px hsla(263, 70%, 50%, 0.15);
          overflow: hidden;
        }
        
        .hero-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          position: relative;
          z-index: 1;
        }

        .hero-image-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: inset 0 0 30px 5px rgba(10, 10, 18, 0.4);
          z-index: 2;
          pointer-events: none;
        }
        
        .abstract-visual-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .orbit-1, .orbit-2, .orbit-3 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid hsla(0, 0%, 100%, 0.1);
          border-radius: 50%;
        }
        
        .orbit-1 { width: 320px; height: 320px; animation: rotate 20s linear infinite; }
        .orbit-2 { width: 360px; height: 360px; animation: rotate-reverse 25s linear infinite; }
        .orbit-3 { width: 400px; height: 400px; animation: rotate 30s linear infinite; }
        
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes rotate-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-description {
            margin: 0 auto 40px;
          }
          
          .hero-cta {
            justify-content: center;
          }
          
          .hero-title {
            font-size: 3.5rem;
          }
          
          .hero-image-container {
            display: none;
          }
        }
      `}} />
    </section>
  );
};

export default Hero;
