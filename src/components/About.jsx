import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Layout, Shield, Cloud, Terminal, Activity, FileCode, Brain } from 'lucide-react';

const techStack = [
  {
    category: "Backend Engineering",
    icon: <Server size={24} />,
    skills: ["Node.js (v22+)", "Express (v5)", "Prisma", "PostgreSQL", "MongoDB", "JWT Auth"]
  },
  {
    category: "Currently Learning",
    icon: <Brain size={24} />,
    skills: ["NestJS", "Docker", "Docker Compose", "Prometheus", "Grafana"]
  },
  {
    category: "Cloud & Deployment",
    icon: <Cloud size={24} />,
    skills: ["Vercel", "Render", "CI/CD"]
  },
  {
    category: "Modern Frontend",
    icon: <Layout size={24} />,
    skills: ["React 19", "TanStack Query", "Zustand", "React Router 7", "Vite", "Google OAuth"]
  },
  {
    category: "Testing & Utilities",
    icon: <Terminal size={24} />,
    skills: ["Vitest", "Razorpay", "ESLint/Prettier"]
  }
];

const About = () => {
  return (
    <section id="about" className="about bg-dark-secondary">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-text"
          >
            <h2 className="section-title text-left">Internal <span className="gradient-text">Architecture</span></h2>
            <p className="about-description">
              I’m a Backend Engineer who loves the challenge of building systems that are fast, resilient, and ready to scale. 
              My day-to-day usually involves architecting server-side logic and orchestrating environments with Docker. 
              I’m also currently expanding my knowledge in system monitoring and observability—working with Prometheus 
              and Grafana to understand how to keep complex systems running smoothly.
            </p>
            <p className="about-description">
              I don't just write code; I build infrastructure. From ensuring type safety across the stack to 
              optimizing data fetching with TanStack Query, I focus on creating a robust backend that delivers 
               a seamless, high-performance experience for the end user.
            </p>
          </motion.div>
          
          <div className="tech-stack-grid">
            {techStack.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="tech-card glass-card"
              >
                <div className="tech-card-header">
                  <div className="tech-icon gradient-bg">
                    {item.icon}
                  </div>
                  <h4>{item.category}</h4>
                </div>
                <div className="tech-tags">
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
            
            {/* Roadmap Badge Integration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="roadmap-card glass-card"
            >
              <div className="roadmap-header">
                <Activity size={20} className="text-accent" />
                <h4>Learning Roadmap</h4>
              </div>
              <div className="roadmap-content">
                <a href="https://roadmap.sh/card/wide/694eba96be04d9e99d609095?variant=dark&roadmaps=" target="_blank" rel="noopener noreferrer" className="roadmap-link">
                  <img 
                    src="https://roadmap.sh/card/wide/694eba96be04d9e99d609095?variant=dark" 
                    alt="roadmap.sh"
                    className="roadmap-img"
                  />
                  <div className="roadmap-overlay">
                    <span>View Full Roadmap</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }
        
        .section-title.text-left {
          text-align: left;
          margin-bottom: 32px;
        }
        
        .about-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        
        .tech-stack-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .tech-card {
          padding: 24px;
          transition: var(--transition);
        }
        
        .tech-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        
        .tech-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .tech-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
        
        .tech-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tech-tag {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-muted);
        }

        /* Roadmap Card Styles */
        .roadmap-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          grid-column: span 2; /* Spanning full width for the wide card */
          overflow: hidden;
        }

        .roadmap-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .roadmap-content {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          height: 100%;
          display: flex;
          justify-content: center;
        }

        .roadmap-link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .roadmap-img {
          width: 100%;
          height: auto;
          display: block;
          transition: var(--transition);
        }

        .roadmap-overlay {
          position: absolute;
          inset: 0;
          background: hsla(263, 70%, 50%, 0.2);
          backdrop-filter: blur(2px);
          opacity: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: var(--transition);
        }

        .roadmap-overlay span {
          background: var(--primary);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .roadmap-link:hover .roadmap-overlay {
          opacity: 1;
        }

        .roadmap-link:hover .roadmap-img {
          transform: scale(1.05);
        }

        .text-accent {
          color: var(--accent);
        }
        
        @media (max-width: 1200px) {
           .about-grid { grid-template-columns: 1fr; }
           .tech-stack-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
           .roadmap-card { grid-column: auto; }
        }
        
        @media (max-width: 640px) {
           .tech-stack-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </section>
  );
};

export default About;
