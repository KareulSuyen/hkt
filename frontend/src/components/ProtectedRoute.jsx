import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const refreshToken = async () => {
        const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
        let res;

        try {
            res = await api.post('api/user/register/', {
                refresh: storedRefreshToken,
            });

            if (res && res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
                return;
            }
        } catch (err) {
            setIsAuthorized(false);
            return;
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        };
    }     
    
    useEffect(() => {
        (async () => {
            try {
                await auth();
            } catch (err) {
                setIsAuthorized(false);
                console.log('unAuthorized : ', err);
            }
        }) ();
    }, []);

    if (isAuthorized === null) {
        return (
            <>
                <div>
                    <h2>Loading...</h2>
                </div>
            </>
        );
    }

    return isAuthorized ? children : <Navigate to='/login' />

}

export default ProtectedRoute;