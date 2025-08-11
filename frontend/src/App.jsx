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

const handleLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const Logout = () => {
  handleLogout();
  return <Navigate to='/intro' replace />;
};

export const LogoutAndRegister = () => {
  handleLogout();
  return <Navigate to='/register' replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Introduction Route - First page users see */}
        <Route path='/' element={<Introduction />} />
        <Route path='/intro' element={<Introduction />} />
        
        {/* Authentication Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='help' element={<Help />} />
        </Route>

        {/* Logout Route */}
        <Route path='/logout' element={<Logout />} />
        
        {/* 404 Route */}
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;