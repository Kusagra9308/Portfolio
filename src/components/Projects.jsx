import React from 'react';
import { motion } from 'framer-motion';
import { Github } from './Icons';
import { Code2, ExternalLink, MessageSquare } from 'lucide-react';

const projects = [
  {
    title: "Taskra",
    description: "Gamified task platform with team collaboration and real-time observability. Features optimistic updates and multi-container Docker orchestration.",
    tags: ["React 19", "Express", "Docker", "PostgreSQL", "Grafana"],
    github: "https://github.com/Kusagra9308/To-Do-App",
    demo: "https://to-do-app-self-tau.vercel.app/",
    color: "hsl(280, 70%, 50%)",
    icon: <Code2 size={24} />
  },
  {
    title: "NexusChat",
    description: "Enterprise-grade real-time messaging engine with end-to-end encryption and WebSocket-driven collaboration rooms. (In Development)",
    tags: ["NestJS", "WebSockets", "Redis", "TypeScript"],
    github: "https://github.com/Kusagra9308",
    demo: "#",
    color: "hsl(190, 70%, 50%)",
    icon: <MessageSquare size={24} />
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Selected <span className="gradient-text">Works</span></h2>
        
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="project-card glass-card"
            >
              <div className="project-icon-box" style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}>
                {project.icon}
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="project-links">
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  <Github size={20} /> Code
                </a>
                <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={20} /> Live
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }
        
        .project-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .project-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .project-title {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }
        
        .project-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex-grow: 1;
        }
        
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        
        .tag {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-muted);
        }
        
        .project-links {
          display: flex;
          gap: 20px;
          border-top: 1px solid var(--border);
          padding-top: 20px;
        }
        
        .project-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .project-link:hover {
          color: var(--primary);
        }
      `}} />
    </section>
  );
};

export default Projects;
