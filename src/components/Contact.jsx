import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
        
        <div className="contact-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="contact-info glass-card"
          >
            <h3 className="contact-info-title">Let's Talk About Your Project</h3>
            <p className="contact-info-text">
              I'm always open to discussing new projects, creative ideas or 
              opportunities to be part of your visions.
            </p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method-icon gradient-bg">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="contact-method-label">Email Me</span>
                  <a href="mailto:kushagrasinghchauhan6@gmail.com" className="contact-method-value">kushagrasinghchauhan6@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-method-icon gradient-bg">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="contact-method-label">Call Me</span>
                  <a href="tel:+919579141928" className="contact-method-value">+91 9579141928</a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-method-icon gradient-bg">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="contact-method-label">Location</span>
                  <span className="contact-method-value">Bhopal, India</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="contact-form-container glass-card"
          >
            <form className="contact-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" className="form-input glass" />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" className="form-input glass" />
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell me about your amazing project..." className="form-input form-textarea glass"></textarea>
              </div>
              
              <button type="submit" className="btn-primary w-full shadow-lg">
                Send Message <Send size={18} className="inline-icon" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
        }
        
        .contact-info-title {
          font-size: 1.8rem;
          margin-bottom: 24px;
          font-weight: 700;
        }
        
        .contact-info-text {
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        .contact-method {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        
        .contact-method-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
        
        .contact-method-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        
        .contact-method-value {
          font-weight: 600;
          color: var(--text-primary);
          transition: var(--transition);
        }
        
        .contact-method-value:hover { color: var(--primary); }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        
        .form-input {
          padding: 16px 24px;
          border-radius: 12px;
          color: white;
          font-family: inherit;
          transition: var(--transition);
        }
        
        .form-input:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.08);
          outline: none;
        }
        
        .form-textarea {
          resize: none;
          height: 150px;
        }
        
        .w-full { width: 100%; }
        
        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </section>
  );
};

export default Contact;
