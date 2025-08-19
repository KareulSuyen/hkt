import { NavLink } from 'react';
import profilestyle from '../styles/profile.module.scss';
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";


const Profile = ({ isProfileOpen, toggleProfile }) => {
    return (
        <>
            <aside className={`${profilestyle.profile} ${isProfileOpen ? profilestyle.open : profilestyle.closed}`}>
                <div className={profilestyle['toggle-btn']}> {/* Profile toggle-btn */}
                    <button onClick={toggleProfile}>
                        <TbLayoutSidebarRightCollapseFilled size={30}/>
                    </button>
                </div>
                <div className={profilestyle['profile-links']}>
                    

                    <div className={profilestyle['logout-btn']}>
                        <button>Log Out</button>
                    </div>
                </div>
            </aside>
        </>
    )
}


export default Profile;