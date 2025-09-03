// ✅ FILE: src/admin/components/profile/ChangePasswordModal.jsx (FINAL AND CORRECTED)

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  changePasswordAsync,
  selectProfileStatus,
  selectProfileError,
  resetProfileStatus, // <-- Ye state ko reset karne ke liye zaroori hai
} from '../../../features/adminSlice/profile/profileSlice';
// import toast from 'react-hot-toast'; // Toast ko uncomment ya install karein

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Redux se state lein
  const status = useSelector(selectProfileStatus);
  const error = useSelector(selectProfileError);
  const isLoading = status === 'loading';

  // Local state sirf input fields ke liye
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState(null);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setValidationError(null);
  };

  // Jab modal band ho, to Redux state ko bhi reset karein
  const handleClose = () => {
    resetForm();
    dispatch(resetProfileStatus());
    onClose();
  };
  
  // ✅ YAHI SABSE ZAROORI HISSA HAI
  // Redux state mein badlav par side effects (toast, close, reset) handle karein
  useEffect(() => {
    // Jab password update safal ho
    if (status === 'succeeded') {
      // toast.success('Password changed successfully!');
      handleClose(); // Modal band karein aur state 'idle' par reset karein
    }
    // Jab API se koi error aaye
    if (status === 'failed' && error) {
      // toast.error(error); // Redux se aaya error dikhayein
      // User ko dobara try karne ke liye state 'idle' par reset karein
      dispatch(resetProfileStatus()); 
    }
  }, [status, error, dispatch]); // Ye effect in dependencies ke badalne par chalega


  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setValidationError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }
    setValidationError(null);

    const passwordData = { currentPassword, newPassword };
    // Sirf action dispatch karein. Baaki sab useEffect handle karega.
    dispatch(changePasswordAsync(passwordData));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Input fields... */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" required />
            </div>
            {validationError && <p className="text-sm text-red-600">{validationError}</p>}
          </div>
          <div className="bg-slate-50 px-6 py-3 flex flex-row-reverse rounded-b-lg">
            <button type="submit" disabled={isLoading} className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:bg-red-400 disabled:cursor-not-allowed">
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
            <button type="button" onClick={handleClose} className="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;