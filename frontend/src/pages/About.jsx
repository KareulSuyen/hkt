import React, { useState, useEffect } from 'react';
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiDjango, SiReact, SiSass, SiCss3, SiJavascript, SiHtml5 } from "react-icons/si";
import styles from '../styles/about.module.scss';
import heheh from '../../public/images/heheh.jpg'


const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techStack = [
    { name: 'Django', icon: SiDjango, color: '#092e20' },
    { name: 'React', icon: SiReact, color: '#61dafb' },
    { name: 'SCSS', icon: SiSass, color: '#cc6699' },
    { name: 'CSS', icon: SiCss3, color: '#1572b6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { name: 'HTML', icon: SiHtml5, color: '#e34f26' }
  ];

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={heheh} />
          <br />
        </div>
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>Boneng Malakas</h2>
          <p className={styles.description}>
            We are a dedicated team of four researchers passionate about addressing one of the most 
            pressing global challenges of our time: overpopulation. Through extensive research and 
            innovative solutions, we aim to contribute meaningful insights and tools to help understand 
            and tackle the complex issues surrounding population growth and its environmental, social, 
            and economic impacts.
          </p>
        </div>

        <hr />
        {/* Boneng's Employers */}
        <div className={styles.projectSection}>
          <div className={styles.projectCard}>
            <div className={styles.projectInfo}>
              <h4 className={styles.projectName}>Over<span>Population</span></h4>
              <p className={styles.projectDescription}>
                This project was developed as part of BonengMalakas. We're leveraging technology 
                and data analysis to provide innovative solutions for understanding and addressing 
                overpopulation challenges through interactive visualizations and research tools.
              </p>
              
              {/* Tech Stack Section */}
              <div className={styles.techStack}>
                <h5 className={styles.techStackTitle}>Built with</h5>
                <div className={styles.techGrid}>
                  {techStack.map((tech, index) => {
                    const IconComponent = tech.icon;
                    return (
                      <div key={index} className={styles.techItem}>
                        <IconComponent className={styles.techIcon} style={{ color: tech.color }} />
                        <span className={styles.techName}>{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.projectLinks}>
                <a 
                  href="https://github.com/greysuyen/hkktn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <FaGithub />
                  View on GitHub
                </a>
                <span className={styles.hackathonBadge}>
                  🏆 Hackathon 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;