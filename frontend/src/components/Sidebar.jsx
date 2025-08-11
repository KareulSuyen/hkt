import { NavLink } from 'react-router-dom';
import sidebarstyle from '../styles/sidebar.module.scss';
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const setActive = ({ isActive }) =>
        isActive ? `${sidebarstyle.link} ${sidebarstyle.active}` : sidebarstyle.link
    return (
        <>
            <aside className={`${sidebarstyle.sidebar} ${isSidebarOpen ? sidebarstyle.open : sidebarstyle.closed}`}>
                <div className={sidebarstyle['toggle-btn']}>
                    <button onClick={toggleSidebar}>
                        <TbLayoutSidebarRightExpandFilled size={30} />
                    </button>
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