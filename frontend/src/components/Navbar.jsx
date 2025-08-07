import { NavLink } from 'react-router-dom';
import navstyle from '../styles/navbar.module.scss';

const Navbar = ({toggleSidebar}) => {
    const setActive = ({ isActive }) =>
        isActive ? `${navstyle.link} ${navstyle.active}` : navstyle.link
    return (
        <>
            <nav className={navstyle['nav-bar']}>
                <div className={navstyle['toggle-btn']}> {/* Navbar toggle btn */}
                    <button onClick={toggleSidebar}>X</button>
                </div>
                <div className={navstyle['nav-center']}>
                    <NavLink to='/' className={setActive}>Home</NavLink>
                    <NavLink to='/help' className={setActive}>Help</NavLink>
                    <NavLink className={setActive}>Profile</NavLink>
                </div>
            </nav>
        </>
    );
};


export default Navbar;