import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { selectLogin, logoutAsync } from '../../features/adminSlice/auth/loginSlice';
import { selectUserProfile, getProfileAsync } from '../../features/adminSlice/profile/profileSlice';
import ScrollToTop from "../../commonPages/components/ScrollToTop";

import Header from './Header';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const { isAuthenticated } = useSelector(selectLogin);
    const user = useSelector(selectUserProfile);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(getProfileAsync())
                .unwrap()
                .catch(() => {
                    toast.error("Your session has expired. Please log in again.");
                    dispatch(logoutAsync());
                    navigate('/admin-login');
                });
        }
    }, [isAuthenticated, user, dispatch, navigate]);

    if (!isAuthenticated) {
        return <Navigate to="/admin-login" replace />;
    }

    return (
        // ✅ PREMIUM UPGRADE: Poore page ko soft gray background diya
        <div className="min-h-screen bg-slate-100">
            <ScrollToTop/>
            <Sidebar 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
            />
            {/* Sidebar ki width ke anusaar left padding */}
            <div className="lg:pl-60 "> 
                <Header 
                    setIsSidebarOpen={setIsSidebarOpen} 
                />
                {/* ✅ PREMIUM UPGRADE: Main content ke liye behtar padding */}
                <main className="py-8 px-4">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* Aapke admin pages (cards, forms, tables) yahan render honge */}
                        {/* Example: <div className="p-6 bg-white rounded-lg shadow-md">...</div> */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;