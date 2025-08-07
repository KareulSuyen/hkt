import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const refreshToken = async () => {
        const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
        
        if (!storedRefreshToken) {
            console.log('No refresh token found');
            setIsAuthorized(false);
            return;
        }

        try {
            // Fix: Use the correct token refresh endpoint
            const res = await api.post('/api/token/refresh/', {
                refresh: storedRefreshToken,
            });

            if (res && res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                console.log('Token refresh failed:', res.status);
                setIsAuthorized(false);
            }
        } catch (err) {
            console.log('Token refresh error:', err);
            // Clear invalid tokens
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                console.log('Token expired, attempting refresh...');
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (err) {
            console.log('Token decode error:', err);
            // Token is malformed, clear it
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setIsAuthorized(false);
        }
    }     
    
    useEffect(() => {
        (async () => {
            try {
                await auth();
            } catch (err) {
                setIsAuthorized(false);
                console.log('Authorization failed:', err);
            }
        })();
    }, []);

    if (isAuthorized === null) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }

    return isAuthorized ? children : <Navigate to='/login' />
}

export default ProtectedRoute;