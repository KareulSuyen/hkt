import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import sidebarstyle from '../styles/sidebar.module.scss';
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import spcc from '/images/spcc-bg.png'


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const sidebarRef = useRef(null);
    const scrollPositionRef = useRef(0);
    
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

            scrollPositionRef.current = window.scrollY || window.pageYOffset;
            
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            
            if (scrollPositionRef.current > 0) {
                window.scrollTo({
                    top: scrollPositionRef.current,
                    left: 0,
                    behavior: 'instant'
                });
            }
        }

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
                    <NavLink to='#' className={setActive}><MdOutlineQuiz size={28}/>Quiz</NavLink>
                    <NavLink to='#' className={setActive}>Test Link</NavLink>
                </div>

                <footer className={sidebarstyle.footer}>
                        <p>
                          <span>
                          <img src={spcc} alt="spcc logo" className={sidebarstyle['spcc-logo']}/>
                        </span>
                          {new Date().getFullYear()}&nbsp;<span id={sidebarstyle['school-name']}>
                          <a href='https://spcc.edu.ph/' target='blank'>
                            SPCC&nbsp;
                          </a>
                        </span>
                        Hackathon</p>
                      </footer>
            </aside>

        </>
    );
};

export default Sidebar;