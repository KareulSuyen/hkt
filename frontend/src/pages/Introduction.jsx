import styles from '../styles/intro.module.scss';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const Intro = () => {
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };

  return (
    <div className={styles.darkIntro}>
      {/* Navigation - Pag-navigate */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <h1 className={styles.logo}>Boneng<span>Malakas</span></h1>
          <div className={styles.navLinks}>
            <a onClick={handleLogout} href="/login" className={styles.navLink}>Login</a>
            <a onClick={handleLogout} href="/register" className={styles.navLink}>Register</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Pangunahing Seksyon */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h2>Pag-unawa sa Ating <span>Planetaryong Limitasyon</span></h2>
            <p>
              Sa website na ito, matututo ka tungkol sa overpopulation at mga hamon nito.
              Tuklasin ang kritikal na ugnayan ng paglaki ng populasyon, 
              pagkonsumo ng mga likas na yaman, at pagpapanatili ng kalikasan 
              sa ating panahon ng data-driven na mundo. Maaari ka ring sumubok
              ng iyong kaalaman sa pamamagitan ng aming mga pagsusulit.
            </p>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>8.1B</div>
              <div className={styles.statLabel}>Kasalukuyang Populasyon</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>+81M</div>
              <div className={styles.statLabel}>Taunang Paglaki</div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} SPCC hackathon 2025</p>
      </footer>
    </div>
  );
};

export default Intro;