import profilestyle from '../styles/profile.module.scss';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { RiUserSettingsLine } from "react-icons/ri";


const Profile = ({  isProfileOpen, toggleProfile }) => {
    const navigate = useNavigate();
        const handleLogout = () => {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            navigate('/logout');
        };
    return (
        <>
            <div className={`${profilestyle.profile} ${isProfileOpen ? profilestyle.open : profilestyle.closed}`}>
                <div className={profilestyle['toggle-btn']}>
                    <button onClick={toggleProfile}>X</button>
                </div>
                <div className={profilestyle['tab-contents']}>
                    <button className={profilestyle['section-btn']}>
                        <RiUserSettingsLine size={23} className={profilestyle['section-icon']} />
                        Settings
                    </button>
                    <button onClick={handleLogout} className={profilestyle['section-btn']}>
                        <CiLogout size={23} className={profilestyle['section-icon']} />
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;