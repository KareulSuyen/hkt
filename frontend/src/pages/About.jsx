import React, { useState, useEffect } from 'react';
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import styles from '../styles/about.module.scss';
import logo from '/images/logo.png'

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const teamMembers = [
    {
      name: "Team Member 1",
      role: "Role/Specialization",
      github: "https://github.com/username1",
      facebook: "https://facebook.com/username1",
      instagram: "https://instagram.com/username1"
    },
    {
      name: "Team Member 2", 
      role: "Role/Specialization",
      github: "https://github.com/username2",
      facebook: "https://facebook.com/username2",
      instagram: "https://instagram.com/username2"
    },
    {
      name: "Team Member 3",
      role: "Role/Specialization", 
      github: "https://github.com/username3",
      facebook: "https://facebook.com/username3",
      instagram: "https://instagram.com/username3"
    },
    {
      name: "Team Member 4",
      role: "Role/Specialization",
      github: "https://github.com/username4", 
      facebook: "https://facebook.com/username4",
      instagram: "https://instagram.com/username4"
    }
  ];

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {/* Image hehhehehehe */}
        </div>

        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <p className={styles.description}>
            We are a dedicated team of four researchers passionate about addressing one of the most 
            pressing global challenges of our time: overpopulation. Through extensive research and 
            innovative solutions, we aim to contribute meaningful insights and tools to help understand 
            and tackle the complex issues surrounding population growth and its environmental, social, 
            and economic impacts.
          </p>
        </div>

        {/* Boneng's Employers */}
        <div className={styles.teamSection}>
          <h3 className={styles.teamTitle}>Our Team</h3>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <div className={styles.memberInfo}>
                  <h4 className={styles.memberName}>{member.name}</h4>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
                <div className={styles.socialLinks}>
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href={member.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a 
                    href={member.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.projectSection}>
          <h3 className={styles.projectTitle}>Current Project</h3>
          <div className={styles.projectCard}>
            <div className={styles.projectInfo}>
              <h4 className={styles.projectName}>Hackathon Project Name</h4>
              <p className={styles.projectDescription}>
                This project was developed as part of [Hackathon Name]. We're leveraging technology 
                and data analysis to provide innovative solutions for understanding and addressing 
                overpopulation challenges through interactive visualizations and research tools.
              </p>
              <div className={styles.projectLinks}>
                <a 
                  href="https://github.com/your-team/project-repo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <FaGithub />
                  View on GitHub
                </a>
                <span className={styles.hackathonBadge}>
                  🏆 Hackathon 2024
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