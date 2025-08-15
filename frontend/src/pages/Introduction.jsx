{/* Static Intro page loloololol boneng boneng boneng boneng boneng boneng boneng boneng boneng */}
import styles from '../styles/intro.module.scss';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import city from '../../public/images/city.png'
import spcc from '../../public/images/spcc-bg.png'
import logo from '../../public/images/logo.png'


const Intro = () => {
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };
  
  return (
    <div className={styles.darkIntro}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <h1 className={styles.logo}>
            <span>
              <img src={logo} />
            </span>Over<span>Population</span></h1>
          <div className={styles.navLinks}>
            <a onClick={handleLogout} href="/login" className={styles.navLink}>Login</a>
            <a onClick={handleLogout} href="/register" className={styles.navLink}>Register</a>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h2>Pag-unawa sa Ating <span>Planetaryong Limitasyon</span></h2>
            <p>
              Sa site na to, matututo ka tungkol sa sobrang populasyon at mga hamon nito.
              Tuklasin ang kritikal na ugnayan ng paglaki ng populasyon, 
              pagkonsumo ng mga likas na yaman, at pagpapanatili ng kalikasan 
              sa ating panahon ng data-driven na mundo. Maaari ka ring sumubok
              ng iyong kaalaman sa pamamagitan ng aming mga pagsusulit.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat} id={styles.world}>
                <div className={styles.statNumber}>8.1B</div>
                <div className={styles.statLabel}>Kasalukuyang Populasyon ng mundo</div>
              </div>
              <div className={styles.stat} id={styles.stats}>
                <div className={styles.statNumber}>112.7M</div>
                <div className={styles.statLabel}>Kasalukuyang populasyon sa Pilipinas</div>
              </div>
            </div>
          </div>
          
          <div className={styles.heroImage}>
            <img 
              src={city} 
              alt="Earth showing population density and environmental impact"
              className={styles.planetImage}
            />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          <span>
          <img src={spcc} alt="spcc logo" className={styles['spcc-logo']}/>
        </span>
          {new Date().getFullYear()}&nbsp;<span id={styles['school-name']}>
          <a href='https://spcc.edu.ph/' target='blank'>
            SPCC&nbsp;
          </a>
        </span>
        Hackathon</p>
      </footer>
    </div>
  );
};

export default Intro;
