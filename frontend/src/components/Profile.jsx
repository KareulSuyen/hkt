import { NavLink } from 'react';
import profilestyle from '../styles/profile.module.scss';


const Profile = ({ isProfileOpen, toggleProfile }) => {
    return (
        <>
            <aside className={`${profilestyle.profile} ${isProfileOpen ? profilestyle.open : profilestyle.closed}`}>
                <div className={profilestyle['toggle-btn']}> {/* Profile toggle-btn */}
                    <button onClick={toggleProfile}>X</button>
                </div>
                <div className={profilestyle['profile-links']}>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                </div>
            </aside>
        </>
    )
}


export default Profile;