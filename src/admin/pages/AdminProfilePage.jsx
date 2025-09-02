// FILE: src/admin/pages/AdminProfilePage.jsx (CORRECTED & COMPLETE)

"use client";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectLogin, logoutAsync } from '../../features/adminSlice/auth/loginSlice';
import { selectSettings, fetchSettingsAsync } from '../../features/adminSlice/Settings/SettingsSlice';
import { 
    PencilIcon, KeyIcon, ArrowLeftOnRectangleIcon,
    BuildingOffice2Icon, AtSymbolIcon, PhoneIcon, MapPinIcon, ChevronRightIcon
} from '@heroicons/react/24/solid';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
// ✅ FIX: Correctly import the EditProfileModal component
import EditProfileModal from '../components/profile/EditProfileModal'; 

const SERVER_URL = "http://localhost:3000";

const AdminProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectLogin);
  const { data: settingsData, status: settingsStatus } = useSelector(selectSettings);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSettingsAsync());
  }, [dispatch]);

  if (!user || settingsStatus !== 'succeeded') {
    return <div className="flex justify-center items-center h-full"><p>Loading profile...</p></div>;
  }

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

  return (
    <>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
          <p className="text-slate-500 mt-1">Manage your account and view website settings.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            {/* DYNAMIC Admin Profile Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-slate-700 to-slate-900">
                {user.banner && <img src={`${SERVER_URL}${user.banner}`} alt="User Banner" className="w-full h-full object-cover" />}
              </div>
              <div className="p-6">
                <div className="relative flex items-end -mt-20">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-3xl font-bold text-red-600 ring-4 ring-white overflow-hidden">
                        {user.avatar ? <img src={`${SERVER_URL}${user.avatar}`} alt="User Avatar" className="w-full h-full object-cover" /> : <span>{getInitials(user.name)}</span>}
                    </div>
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                        <p className="text-slate-500">{user.email}</p>
                    </div>
                </div>
                 <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold mt-4 px-2.5 py-0.5 rounded-full">
                    {user.role || 'Administrator'}
                 </span>
              </div>
            </div>

            {/* ✅ FIX: The content for the Company Information card has been restored. */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-900">Company Information</h2>
                <Link to="/admin/settings" className="text-sm font-semibold text-red-600 hover:underline">Go to Settings</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoItem icon={BuildingOffice2Icon} label="Company Name" value={settingsData.general?.companyName} />
                <InfoItem icon={AtSymbolIcon} label="Contact Email" value={settingsData.general?.contactEmail} />
                <InfoItem icon={PhoneIcon} label="Contact Phone" value={settingsData.general?.contactPhone} />
                <InfoItem icon={MapPinIcon} label="Address" value={settingsData.general?.address} />
              </div>
            </div>
          </div>

          {/* UNIFIED Right Column: Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Account Actions</h2>
              <ul className="divide-y divide-slate-200">
                <ActionItem icon={PencilIcon} title="Edit Profile" description="Update name, email & images." onClick={() => setIsEditModalOpen(true)} />
                <ActionItem icon={KeyIcon} title="Change Password" description="Update your account security." onClick={() => setIsPasswordModalOpen(true)} />
                <ActionItem icon={ArrowLeftOnRectangleIcon} title="Logout" description="End your current session." onClick={handleLogout} isDestructive={true} />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
    </>
  );
};

// ✅ FIX: The full implementation for the helper components is provided below.
// Helper component for Company Information Card
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start">
    <Icon className="w-6 h-6 text-slate-400 mr-4 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">{value || 'Not Set'}</p>
    </div>
  </div>
);

// Helper component for Account Actions Card
const ActionItem = ({ icon: Icon, title, description, onClick, isDestructive = false }) => (
    <li className="py-3">
        <button onClick={onClick} className="w-full flex items-center justify-between text-left group">
            <div className="flex items-center">
                <Icon className={`w-6 h-6 mr-4 ${isDestructive ? 'text-red-500' : 'text-slate-500'}`} />
                <div>
                    <p className={`font-semibold ${isDestructive ? 'text-red-700' : 'text-slate-800'}`}>{title}</p>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
        </button>
    </li>
);

export default AdminProfilePage;