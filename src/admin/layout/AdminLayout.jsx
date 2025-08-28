import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="lg:pl-64">
                <Header setIsSidebarOpen={setIsSidebarOpen} />
                <main className="p-4 sm:p-6 lg:p-8">
                    {/* The content for each page will be rendered here */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;