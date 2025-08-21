import { useNavigate } from 'react-router-dom';
import profilestyle from '../styles/profile.module.scss';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { CiLogout } from "react-icons/ci";
import { TbArrowGuide } from "react-icons/tb";


const Profile = ({ isProfileOpen, toggleProfile, onGuidelinesClick }) => { {/* Hulaan mo~~~ :> */}
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/introduction'); 
    };

    const handleGuidelinesClick = () => {
        toggleProfile(); 
        onGuidelinesClick();
    };

    return (
        <>
            <aside className={`${profilestyle.profile} ${isProfileOpen ? profilestyle.open : profilestyle.closed}`}>
                <div className={profilestyle['toggle-btn']}> {/* Profile toggle-btn */}
                    <button onClick={toggleProfile}>X</button>
                </div>
                <div className={profilestyle['profile-links']}>
                    <div className={profilestyle.guidelines}>
                        <TbArrowGuide size={25} />
                        <span>
                            <button onClick={handleGuidelinesClick}>Guidelines</button>
                        </span>
                    </div>
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