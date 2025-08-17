import { NavLink } from 'react-router-dom';
import navstyle from '../styles/navbar.module.scss';
import { FaHandsHelping, FaHome } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";


const Navbar = ({ toggleSidebar, toggleProfile }) => {
    const setActive = ({ isActive }) =>
        isActive ? `${navstyle.link} ${navstyle.active}` : navstyle.link
    return (
        <>
            <nav className={navstyle['nav-bar']}>
                <div className={navstyle['toggle-btn']}> {/* Navbar toggle btn */}
                    <button onClick={toggleSidebar}>
                        <RxHamburgerMenu size={30} />
                    </button>
                </div>
                <div className={navstyle['nav-center']}>
                    <NavLink to='/' className={setActive}>
                        <FaHome size={30} />
                    </NavLink>
                    <NavLink to='/help' className={setActive}>
                        <FaHandsHelping size={30} />
                    </NavLink>
                    <div className={navstyle['profile-btn']}> 
                        <button onClick={toggleProfile}> 
                            <CgProfile size={30}/>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};


export default Navbar;