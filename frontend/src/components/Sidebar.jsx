import { NavLink } from 'react-router-dom';
import sidebarstyle from '../styles/sidebar.module.scss';


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const setActive = ({ isActive }) =>
        isActive ? `${sidebarstyle.link} ${sidebarstyle.active}` : sidebarstyle.link
    return (
        <>
            <aside className={`${sidebarstyle.sidebar} ${isSidebarOpen ? sidebarstyle.open : sidebarstyle.closed}`}>
                <div className={sidebarstyle['toggle-btn']}>
                    <button onClick={toggleSidebar}>X</button>
                </div>  
                <div className={sidebarstyle['sidebar-links']}>
                    <NavLink to='#'>Test Link</NavLink>
                    <NavLink to='#'>Test Link</NavLink>
                    <NavLink to='#'>Test Link</NavLink>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;