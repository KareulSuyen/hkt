import React from 'react';
import styles from '../styles/intro.module.scss';

const Introduction = () => {
  return (
    <div className={styles.introductionPage}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <a href="/" className={styles.siteTitle}>Population Crisis</a>
          <div className={styles.navLinks}>
            <a href="/login" className={styles.navLink}>Login</a>
            <a href="/register" className={styles.navLink}>Register</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The Population Challenge</h1>
          <p className={styles.heroSubtitle}>
            Exploring the complex dynamics of global population growth and its impact on our planet's future. 
            Understanding the challenges we face and the solutions within our reach.
          </p>
          <a href="#introduction" className={styles.ctaButton}>Learn More</a>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Introduction Section */}
        <section id="introduction" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Understanding Overpopulation</h2>
            <p className={styles.sectionText}>
              Overpopulation occurs when a species' population exceeds the carrying capacity of its environment. 
              For humans, this means our resource consumption and environmental impact may surpass what Earth can 
              sustainably support. This phenomenon affects every aspect of human civilization, from food security 
              and water availability to climate change and biodiversity loss. Understanding these interconnected 
              challenges is crucial for developing effective solutions that ensure a sustainable future for all.
            </p>
          </div>
        </section>

        {/* Statistics Section */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Key Statistics</h2>
            <p className={styles.sectionText}>
              The numbers tell a compelling story about our planet's demographic trends and their implications 
              for sustainability, resource management, and environmental conservation.
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>8.1B</span>
                <span className={styles.statLabel}>Current Global Population</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>67M</span>
                <span className={styles.statLabel}>Annual Population Growth</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>10.4B</span>
                <span className={styles.statLabel}>Projected Peak Population</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>2086</span>
                <span className={styles.statLabel}>Estimated Peak Year</span>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Sustainable Solutions</h2>
            <p className={styles.sectionText}>
              Addressing population challenges requires a multifaceted approach that combines education, 
              technology, policy reform, and global cooperation. Here are key strategies that can help 
              create a more sustainable future.
            </p>
            <div className={styles.solutionsList}>
              <div className={styles.solutionItem}>
                <h3 className={styles.solutionTitle}>Education & Empowerment</h3>
                <p className={styles.solutionDesc}>
                  Improving access to education, particularly for women, has been shown to naturally reduce 
                  birth rates while improving quality of life and economic opportunities for communities worldwide.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <h3 className={styles.solutionTitle}>Sustainable Technology</h3>
                <p className={styles.solutionDesc}>
                  Developing and implementing clean technologies, renewable energy systems, and efficient 
                  resource management can help support larger populations with reduced environmental impact.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <h3 className={styles.solutionTitle}>Urban Planning</h3>
                <p className={styles.solutionDesc}>
                  Smart city design and sustainable urban development can accommodate growing populations 
                  while minimizing resource consumption and environmental degradation.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <h3 className={styles.solutionTitle}>Healthcare Access</h3>
                <p className={styles.solutionDesc}>
                  Comprehensive healthcare systems, including family planning services, can help communities 
                  make informed decisions about family size while improving overall population health.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2025 Population Crisis. Working towards a sustainable future for all.
        </p>
      </footer>
    </div>
  );
};

export default Introduction;