import { useNavigate } from 'react-router-dom';
import profilestyle from '../styles/profile.module.scss';
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { CiLogout } from "react-icons/ci";


const Profile = ({ isProfileOpen, toggleProfile }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/introduction'); 
    };

    return (
        <>
            <aside className={`${profilestyle.profile} ${isProfileOpen ? profilestyle.open : profilestyle.closed}`}>
                <div className={profilestyle['toggle-btn']}> {/* Profile toggle-btn */}
                    <button onClick={toggleProfile}>X</button>
                </div>
                <div className={profilestyle['profile-links']}>
                    <a href="#">Test</a>
                    <a href="#">Test</a>

                    <div className={profilestyle['logout-btn']}>
                        <CiLogout size={25}/>
                        <span>
                            <button onClick={handleLogout}>
                                Log Out
                            </button>
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
};


export default Profile;