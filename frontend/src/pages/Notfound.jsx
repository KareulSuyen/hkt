import styles from '../styles/notfound.module.scss';
import { RiAliensLine } from "react-icons/ri";
import { HiOutlineRocketLaunch } from "react-icons/hi2";


const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Oops! Page not found</h2>
                <p className={styles.text}>The page you're looking for has gone on a little adventure.</p>
                <div className={styles.illustration}>
                    <div className={styles.planet}></div>
                    <div className={styles.rocket}><HiOutlineRocketLaunch size={55}/></div>
                    <div className={styles.alien}><RiAliensLine size={45}/></div>
                </div>
                <a href="/" className={styles.button}>Take me home</a>
            </div>
        </div>
    );
};

export default NotFound;