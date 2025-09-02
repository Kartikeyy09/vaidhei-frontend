// FILE: src/admin/components/profile/ChangePasswordModal.jsx (PREMIUM UPDATE)

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon, KeyIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAsync, selectSettings, resetPasswordStatus } from '../../../features/adminSlice/Settings/SettingsSlice';

// Reusable input component for consistent styling
const InputWithIcon = ({ id, type, value, onChange, placeholder, icon: Icon }) => (
    <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
    </div>
);

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { passwordChangeStatus, passwordChangeError } = useSelector(selectSettings);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // ✅ Best Practice: Reset Redux state when modal is closed
  const handleClose = () => {
    dispatch(resetPasswordStatus());
    onClose();
  };
  
  // Close the modal after a successful password change
  useEffect(() => {
      if (passwordChangeStatus === 'succeeded') {
          setTimeout(() => {
            handleClose();
          }, 2000);
      }
  }, [passwordChangeStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.'); return;
    }
    if (newPassword.length < 6) {
        setError('New password must be at least 6 characters long.'); return;
    }
    dispatch(changePasswordAsync({ currentPassword, newPassword }));
  };

  const isSaving = passwordChangeStatus === 'loading';

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">Change Password</Dialog.Title>
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                
                {passwordChangeStatus === 'succeeded' ? (
                    <div className="text-center py-10">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-slate-800">Password Changed!</h4>
                        <p className="text-slate-500 mt-2">Your password has been updated successfully.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <InputWithIcon id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Current Password" icon={KeyIcon} />
                        <InputWithIcon id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" icon={KeyIcon} />
                        <InputWithIcon id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" icon={KeyIcon} />
                        {(error || passwordChangeError) && <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error || passwordChangeError}</div>}
                        <div className="pt-4 flex justify-end gap-3">
                            <button type="button" onClick={handleClose} disabled={isSaving} className="px-4 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                            <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50">{isSaving ? 'Saving...' : 'Save Changes'}</button>
                        </div>
                    </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChangePasswordModal;