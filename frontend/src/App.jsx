import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './pages/Notfound';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Introduction from './pages/Introduction';
import ScrollManager from './components/ScrollManager';
import { useEffect } from 'react';

const handleLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    handleLogout();
    navigate('/introduction', { replace: true });
    
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function() {
      window.history.go(1);
    };
  }, [navigate]);

  return null;
};

export const LogoutAndRegister = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    handleLogout();
    navigate('/register', { replace: true });
    
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function() {
      window.history.go(1);
    };
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path='/' index element={<Dashboard />} />
          <Route path='help' element={<Help />} /> 
        </Route>
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;