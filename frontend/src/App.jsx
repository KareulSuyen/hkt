import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './pages/Notfound';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { useEffect } from 'react';
import { sendPrompt } from './api';

const handleLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const Logout = () => {
  handleLogout();
  return <Navigate to='/login' replace />;
};

export const LogoutAndRegister = () => {
  handleLogout();
  return <Navigate to='/register' replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<Home />} />
          <Route path='/help' element={<Help />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
