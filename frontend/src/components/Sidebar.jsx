import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import sidebarstyle from '../styles/sidebar.module.scss';
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const sidebarRef = useRef(null);
    const scrollPositionRef = useRef(0);
    
    const setActive = ({ isActive }) =>
        isActive ? `${sidebarstyle.link} ${sidebarstyle.active}` : sidebarstyle.link;

    // Outside click detection
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

    // Fixed scroll position handling
    useEffect(() => {
        if (isSidebarOpen) {
            // Store current scroll position when opening
            scrollPositionRef.current = window.scrollY || window.pageYOffset;
            
            // Prevent body scroll
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body styles
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            
            // Restore scroll position
            if (scrollPositionRef.current > 0) {
                window.scrollTo({
                    top: scrollPositionRef.current,
                    left: 0,
                    behavior: 'instant'
                });
            }
        }

        // Cleanup function
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
        };
    }, [isSidebarOpen]);

    return (
        <>
            {/* Re-added backdrop for blur effect */}
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