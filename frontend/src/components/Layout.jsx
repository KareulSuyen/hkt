import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
     return (
        <>
            <Navbar toggleSidebar={toggleSidebar}/>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;