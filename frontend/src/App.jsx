import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './pages/Notfound';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Introduction from './pages/Introduction';
import ScrollManager from './components/ScrollManager';

const handleLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const Logout = () => {
  handleLogout();
  return <Navigate to='/introduction' replace />;
};

export const LogoutAndRegister = () => {
  handleLogout();
  return <Navigate to='/register' replace />;
};

export const CheckToken = () => {
  localStorage.getItem(ACCESS_TOKEN);
  localStorage.getItem(REFRESH_TOKEN);

  if (ACCESS_TOKEN || REFRESH_TOKEN) {
    return <Navigate to='/dashboard' />
  } else if (!ACCESS_TOKEN || !REFRESH_TOKEN) {
    return <Navigate to='/introduction' />
  } else {
    return <Navigate to='/introduction' />
  }
} 

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