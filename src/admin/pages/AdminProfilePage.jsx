"use client";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectLogin, logoutAsync } from '../../features/adminSlice/auth/loginSlice';
import { selectUserProfile, getProfileAsync } from '../../features/adminSlice/profile/profileSlice';
import { selectSettings, fetchSettingsAsync } from '../../features/adminSlice/Settings/SettingsSlice';
import { 
    PencilIcon, KeyIcon, ArrowLeftOnRectangleIcon,
    BuildingOffice2Icon, AtSymbolIcon, PhoneIcon, MapPinIcon, ChevronRightIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/solid';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
import EditProfileModal from '../components/profile/EditProfileModal'; 

const SERVER_URL = "https://vaidhei-backend.onrender.com";

// --- SKELETON LOADER COMPONENT ---
// Yeh component poore page ke layout ka dhancha (skeleton) dikhata hai jab data load ho raha hota hai.
const ProfilePageSkeleton = () => {
  return (
    <div className="bg-slate-100/70 min-h-full p-4 md:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Card Skeleton */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-slate-200"></div>
            <div className="p-6">
              <div className="relative -mt-24">
                <div className="w-32 h-32 bg-slate-200 rounded-full ring-4 ring-white mx-auto sm:mx-0"></div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-start">
                <div className="mb-4 sm:mb-0 w-full sm:w-1/2">
                  <div className="h-8 w-3/4 bg-slate-200 rounded-md"></div>
                  <div className="h-5 w-1/2 bg-slate-200 rounded-md mt-2"></div>
                  <div className="h-4 w-2/3 bg-slate-200 rounded-md mt-3"></div>
                </div>
                <div className="h-10 w-36 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Company Info Card Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-7 w-1/2 bg-slate-200 rounded-md mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-6 h-6 bg-slate-200 rounded-md mr-4 mt-1 flex-shrink-0"></div>
                  <div className="w-full">
                    <div className="h-4 w-1/3 bg-slate-200 rounded-md"></div>
                    <div className="h-5 w-2/3 bg-slate-200 rounded-md mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-6 w-3/4 bg-slate-200 rounded-md mb-6"></div>
            <ul className="divide-y divide-slate-200">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <div className="w-6 h-6 mr-4 bg-slate-200 rounded-md"></div>
                      <div className="w-full">
                        <div className="h-5 w-1/2 bg-slate-200 rounded-md"></div>
                        <div className="h-4 w-3/4 bg-slate-200 rounded-md mt-2"></div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


const AdminProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(selectUserProfile); 
  const { isAuthenticated } = useSelector(selectLogin);
  const { data: settingsData, status: settingsStatus } = useSelector(selectSettings);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getProfileAsync());
    }
    if (settingsStatus === 'idle') {
      dispatch(fetchSettingsAsync());
    }
  }, [dispatch, isAuthenticated, user, settingsStatus]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
        dispatch(logoutAsync()).unwrap().then(() => navigate('/admin-login')).catch(() => navigate('/admin-login'));
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
  };
  
  const handleProfileUpdateSuccess = () => {
    setIsEditModalOpen(false);
  };
  
  const handleChangePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
  };

  // Jab tak user ya settings ka data load nahi hota, skeleton dikhao.
  if (!user || settingsStatus !== 'succeeded') {
    return <ProfilePageSkeleton />;
  }

  return (
    <>
      <div className="bg-slate-100/70 min-h-full p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-slate-600 to-slate-800">
                {user.banner ? (
                  <img src={`${SERVER_URL}${user.banner}`} alt="User Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full"></div>
                )}
              </div>
              
              <div className="p-6">
                <div className="relative -mt-24">
                  <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center text-4xl font-bold text-red-600 ring-4 ring-white overflow-hidden mx-auto sm:mx-0">
                    {user.avatar ? (
                      <img src={`${SERVER_URL}${user.avatar}`} alt="User Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{getInitials(user.name)}</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start">
                  <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                    <p className="text-slate-600 mt-1">{user.role || 'Administrator'}</p>
                    <p className="text-sm text-slate-500 mt-2">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors shadow-sm"
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Company Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-900 border-b pb-4 mb-6">Company Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                <InfoItem icon={BuildingOffice2Icon} label="Company Name" value={settingsData.general?.companyName} />
                <InfoItem icon={AtSymbolIcon} label="Contact Email" value={settingsData.general?.contactEmail} />
                <InfoItem icon={PhoneIcon} label="Contact Phone" value={settingsData.general?.contactPhone} />
                <InfoItem icon={MapPinIcon} label="Address" value={settingsData.general?.address} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Account & Settings</h2>
              <ul className="divide-y divide-slate-200">
                <SidebarLinkItem 
                    icon={Cog6ToothIcon} 
                    title="Website Settings" 
                    description="Manage company details & more." 
                    to="/admin/settings"
                />
                <SidebarActionItem 
                    icon={KeyIcon} 
                    title="Change Password" 
                    description="Update your account security." 
                    onClick={() => setIsPasswordModalOpen(true)}
                />
                <SidebarActionItem 
                    icon={ArrowLeftOnRectangleIcon} 
                    title="Logout" 
                    description="End your current session." 
                    onClick={handleLogout} 
                    isDestructive={true} 
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)}
        onUpdateSuccess={handleChangePasswordSuccess} 
      />
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={user}
        onUpdateSuccess={handleProfileUpdateSuccess}
      />
    </>
  );
};

// Helper Components
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start">
    <Icon className="w-6 h-6 text-slate-500 mr-4 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="font-medium text-slate-800">{value || 'Not Set'}</p>
    </div>
  </div>
);

const SidebarActionItem = ({ icon: Icon, title, description, onClick, isDestructive = false }) => (
    <li className="py-4">
        <button onClick={onClick} className="w-full flex items-center justify-between text-left group transition-opacity hover:opacity-80">
            <div className="flex items-center">
                <Icon className={`w-6 h-6 mr-4 ${isDestructive ? 'text-red-500' : 'text-slate-500'}`} />
                <div>
                    <p className={`font-semibold ${isDestructive ? 'text-red-700' : 'text-slate-800'}`}>{title}</p>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-1" />
        </button>
    </li>
);

const SidebarLinkItem = ({ icon: Icon, title, description, to }) => (
    <li className="py-4">
        <Link to={to} className="w-full flex items-center justify-between text-left group transition-opacity hover:opacity-80">
            <div className="flex items-center">
                <Icon className="w-6 h-6 mr-4 text-slate-500" />
                <div>
                    <p className="font-semibold text-slate-800">{title}</p>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-1" />
        </Link>
    </li>
);

export default AdminProfilePage;