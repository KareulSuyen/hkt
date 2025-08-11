import { NavLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import sidebarstyle from '../styles/sidebar.module.scss';
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const sidebarRef = useRef(null);
    
    const setActive = ({ isActive }) =>
        isActive ? `${sidebarstyle.link} ${sidebarstyle.active}` : sidebarstyle.link;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
                toggleSidebar();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, toggleSidebar]);

    useEffect(() => {
        if (isSidebarOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isSidebarOpen]);

    return (
        <>
            {isSidebarOpen && (
                <div 
                    className={sidebarstyle.backdrop}
                    onClick={toggleSidebar}
                />
            )}
            <aside 
                ref={sidebarRef}
                className={`${sidebarstyle.sidebar} ${isSidebarOpen ? sidebarstyle.open : sidebarstyle.closed}`}
            >
                <div className={sidebarstyle['toggle-btn']}>
                    <button onClick={toggleSidebar}>
                        <TbLayoutSidebarRightExpandFilled size={27} />
                    </button>
                </div>  
                <div className={sidebarstyle['sidebar-links']}>
                    <NavLink to='#' className={setActive}>Test Link</NavLink>
                    <NavLink to='#' className={setActive}>Test Link</NavLink>
                    <NavLink to='#' className={setActive}>Test Link</NavLink>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;