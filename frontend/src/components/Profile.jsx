import { NavLink } from 'react';
import profilestyle from '../styles/profile.module.scss';


const Profile = ({ isProfileOpen, toggleProfile }) => {
    <>
        <aside className={`${profilestyle.profile} ${isProfileOpen ? profilestyle.open : profilestyle.closed}`}>
            <div className={profilestyle['toggle-btn']}> {/* Profile toggle-btn */}
                <button onClick={toggleProfile}>X</button>
            </div>
            <div className={profilestyle['profile-links']}>
                <a href="#">Test link</a>
                <a href="#">Test link</a>
                <a href="#">Test link</a>
            </div>
        </aside>
    </>
}


export default Profile;