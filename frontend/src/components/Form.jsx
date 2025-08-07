import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import formstyle from '../styles/form.module.scss';


const Form = ({ method, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const actionType = method === 'login' ? 'login' : 'register';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password});
            
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }

        } catch (err) {
            console.log(err.response?.data?.message || err.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        };
    };

    return (
        <>
            <form className={formstyle['auth-container']} onSubmit={handleSubmit}>
                <h2>{ actionType.charAt(0).toUpperCase() + actionType.slice(1) }</h2>
                <input 
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder='Username'
                    className={formstyle['form-auth']}
                    required
                />
                <input 
                    type='text'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='Password'
                    className={formstyle['form-auth']}
                    required
                />
                <button type='submit' disabled={loading} className={formstyle['submit-btn']}>
                    { loading ? 'Please wait' : actionType }
                </button>
            </form>
        </>
    );
}

export default Form;