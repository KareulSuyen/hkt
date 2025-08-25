import api from '../api';
import formstyle from '../styles/form.module.scss';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const LoadingSpinner = () => (
    <div className={formstyle['spinner']}>
        <div className={formstyle['spinner-ring']}></div>
    </div>
);

const LoadingDots = () => (
    <div className={formstyle['loading-dots']}>
        <span></span>
        <span></span>
        <span></span>
    </div>
);

const Form = ({ method, route }) => {
    const setIsActive = ({isActive}) => isActive ? `${formstyle.link} ${formstyle.active}` : formstyle.link
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errormsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const navigate = useNavigate();
    const isLogin = method === 'login';
    const actionType = isLogin ? 'Login' : 'Register';

    const passwordStrength = useMemo(() => {
        if (!password || isLogin || password.length === 0) return null;
        
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;
        
        const strengthPoints = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars, isLongEnough]
            .filter(Boolean).length;
        
        if (strengthPoints < 3) return 'Weak';
        if (strengthPoints < 5) return 'Medium';
        return 'Strong';
    }, [password, isLogin]);

    const passwordStrengthColor = useMemo(() => {
        if (!passwordStrength) return 'transparent';
        
        switch(passwordStrength) {
            case 'Weak': return '#ff4444';
            case 'Medium': return '#ffbb33';
            case 'Strong': return '#00C851';
            default: return 'transparent';
        }
    }, [passwordStrength]);

    const handleTooltipEnter = useCallback(() => {
        setShowTooltip(true);
    }, []);

    const handleTooltipLeave = useCallback(() => {
        setShowTooltip(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        if (!isLogin && password !== confirmPassword) {
            setErrorMsg('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (!isLogin) {
            if (password.length < 8) {
                setErrorMsg('Password must be at least 8 characters long.');
                setLoading(false);
                return;
            }
            
            if (!/[A-Z]/.test(password)) {
                setErrorMsg('Password must contain at least one uppercase letter.');
                setLoading(false);
                return;
            }
            
            if (!/[a-z]/.test(password)) {
                setErrorMsg('Password must contain at least one lowercase letter.');
                setLoading(false);
                return;
            }
            
            if (!/\d/.test(password)) {
                setErrorMsg('Password must contain at least one number.');
                setLoading(false);
                return;
            }
        }

        try {
            const payload = isLogin
                ? { username, password }
                : { username, password, confirm_password: confirmPassword };

            const res = await api.post(route, payload);

            if (isLogin) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/'); 
            } else {
                navigate('/login'); 
            }
        } catch (err) {
            const status = err.response?.status;
            const data = err.response?.data;

            if (status === 401) {
                setErrorMsg('Invalid username or password');
            } else if (status === 400 && !isLogin && data?.username?.[0] === 'A user with that username already exists.') {
                setErrorMsg('Username already exists.');
            } else if (data?.password) {
                setErrorMsg(data.password[0]);
            } else if (data?.confirm_password) {
                setErrorMsg(data.confirm_password[0]);
            } else {
                setErrorMsg(data?.detail || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    return (
        <>
            {loading && (
                <div className={formstyle['loading-overlay']}>
                    <div className={formstyle['loading-content']}>
                        <LoadingSpinner />
                        <p>{isLogin ? 'Signing you in...' : 'Creating your account...'}</p>
                    </div>
                </div>
            )}
            
            <div className={`${formstyle['auth-page']} ${loading ? formstyle['loading'] : ''}`}>
                <div className={formstyle['auth-title']}>
                    <h2>Ready to learn?</h2>
                    <p>
                        Planet Earth: Lag na.
                        Overpopulation is clogging up the system — it's time to debug society.
                        Let's build smarter ways to live and grow.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className={formstyle['form-container']}>
                    <h1>{actionType}</h1>

                    <div className={formstyle['auth-container']}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            className={formstyle['auth-input']}
                            placeholder="Username"
                            required
                            maxLength="30"
                            disabled={loading}
                        />
                        
                        <div className={formstyle['password-wrapper']}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                placeholder="Password"
                                className={formstyle['auth-input']}
                                required
                                minLength={isLogin ? undefined : "8"}
                                disabled={loading}
                            />
                            <button 
                                type="button" 
                                className={formstyle['toggle-password']}
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                disabled={loading}
                            >
                                {showPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                            </button>
                        </div>
                        
                        {!isLogin && password.length > 0 && (
                            <div className={formstyle['password-strength']}>
                                <span>Strength: </span>
                                <span 
                                    style={{ 
                                        color: passwordStrengthColor,
                                        transition: 'color 0.3s ease',
                                        fontWeight: '600',
                                        padding: '10px',
                                    }}
                                >
                                    {passwordStrength}
                                </span>
                                {showTooltip && (
                                    <div className={formstyle['tooltip']}>
                                        <div style={{
                                            width: '100%',
                                            height: '4px',
                                            background: `linear-gradient(to right, 
                                                #ff4444 0%, 
                                                #ff4444 40%, 
                                                #ffbb33 40%, 
                                                #ffbb33 70%, 
                                                #00C851 70%, 
                                                #00C851 100%)`,
                                            marginBottom: '8px',
                                            borderRadius: '2px'
                                        }}/>
                                        Password strength factors:
                                        <ul>
                                            <li>Length (8+ characters recommended)</li>
                                            <li>Uppercase letters</li>
                                            <li>Lowercase letters</li>
                                            <li>Numbers</li>
                                            <li>Special characters</li>
                                            <li>Avoid common patterns</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {!isLogin && (
                            <div className={formstyle['password-wrapper']}>
                                <input
                                    className={formstyle['auth-input']}
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                    placeholder="Confirm Password"
                                    required
                                    disabled={loading}
                                />
                                <button 
                                    type="button" 
                                    className={formstyle['toggle-password']}
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={loading}
                                >
                                    {showPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                                </button>
                            </div>
                        )}
                        
                        <button 
                            className={`${formstyle['submit-btn']} ${loading ? formstyle['loading'] : ''}`}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? (
                                <div className={formstyle['button-loading']}>
                                    <LoadingDots />
                                    <span>Please wait...</span>
                                </div>
                            ) : (
                                actionType
                            )}
                        </button>

                        {errormsg && <p className={formstyle['error-msg']}>{errormsg}</p>}

                        <div className={formstyle['switch-auth']}>
                            {isLogin ? (
                                <p>
                                    Don't have an account?{' '}
                                    <NavLink to="/register" className={setIsActive}>Register here</NavLink>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{' '}
                                    <NavLink to="/login" className={setIsActive}>Login here</NavLink>
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;