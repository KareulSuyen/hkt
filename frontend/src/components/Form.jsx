import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../api';
import { useState } from 'react';
import formstyle from '../styles/form.module.scss';
import { NavLink } from 'react-router-dom';

const Form = ({ method, route }) => {
    const setIsActive = ({isActive}) => isActive ? `${formstyle.link} ${formstyle.active}` : formstyle.link
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errormsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const isLogin = method === 'login';
    const actionType = isLogin ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        setLoading(false);
        return;
    }

    try {
        const payload = isLogin
            ? { username, password }
            : { username, password, confirm_password: confirmPassword };

        const res = await api.post(route, payload);

        if (isLogin) {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate('/dashboard');
        } else {
            navigate('/introduction');
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

    return (
        <>
            <div className={formstyle['auth-page']}>
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
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Password"
                            className={formstyle['auth-input']}
                            required
                        />
                            {!isLogin && (
                                <input
                                    className={formstyle['auth-input']}
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                    placeholder="Confirm Password"
                                    required
                                />
                            )}
                        <button className={formstyle['submit-btn']} disabled={loading}>
                            {loading ? 'Please wait...' : actionType}
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
                                    <NavLink to="/login"  className={setIsActive}>Login here</NavLink>
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