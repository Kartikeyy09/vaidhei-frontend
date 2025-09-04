// ✅ FILE: src/admin/AdminLayout.jsx (CREATE THIS NEW FILE)

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

// Slices se zaroori cheezein import karein
import { selectLogin, logoutAsync } from '../../features/adminSlice/auth/loginSlice';
import { selectUserProfile, getProfileAsync } from '../../features/adminSlice/profile/profileSlice';
import ScrollToTop from "../../commonPages/components/ScrollToTop";

import Header from './Header'; // Apne components ke path adjust karein
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Auth state (sirf isAuthenticated ke liye)
    const { isAuthenticated } = useSelector(selectLogin);
    // Profile state (user object ke liye)
    const user = useSelector(selectUserProfile);

    // ✅ YAHI SABSE ZAROORI HISSA HAI
    useEffect(() => {
        // Condition: Agar client-side kehta hai ki user logged in hai,
        // lekin hamare paas profileSlice mein user ka data nahi hai (ye page refresh par hota hai).
        if (isAuthenticated && !user) {
            dispatch(getProfileAsync())
                .unwrap()
                .catch(() => {
                    // Agar getProfileAsync fail hota hai, iska matlab token invalid hai.
                    // User ko forcefully logout kar do.
                    toast.error("Your session has expired. Please log in again.");
                    dispatch(logoutAsync());
                    navigate('/admin-login');
                });
        }
    }, [isAuthenticated, user, dispatch, navigate]);

    // Agar user authenticated nahi hai, to use login page par bhej do
    if (!isAuthenticated) {
        return <Navigate to="/admin-login" replace />;
    }

    // Agar user authenticated hai, to layout (Sidebar, Header) aur child route (Outlet) dikhao
    return (
        <div>
            <ScrollToTop/>
            <Sidebar />
            <div className="lg:pl-72"> {/* Sidebar ki width ke anusaar */}
                <Header />
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* Aapke admin pages yahan render honge */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;