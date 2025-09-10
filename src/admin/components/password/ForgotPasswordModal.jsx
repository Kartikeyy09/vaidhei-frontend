// ✅ FILE: components/admin/ForgotPasswordModal.jsx (NEW)

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetLinkAsync, resetPasswordState } from '../../../features/adminSlice/auth/passwordResetSlice';
import { ArrowPathIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const FloatingLabelInput = ({ id, label, type, value, onChange, hasError }) => (
    <div className="relative">
      <input id={id} type={type} value={value} onChange={onChange} placeholder=" " className={`peer w-full rounded-lg border px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 ${hasError ? "border-red-500" : "border-gray-300"}`} required />
      <label htmlFor={id} className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-red-500 peer-focus:text-sm">{label}</label>
    </div>
);

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector((state) => state.passwordReset);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetLinkAsync({ email }));
  };

  const handleClose = () => {
    dispatch(resetPasswordState());
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">Reset Password</h2>
        
        {successMessage ? (
          <div className="text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-slate-600">{successMessage}</p>
            <button onClick={handleClose} className="mt-6 w-full py-3 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-center text-slate-500">Enter your email address and we'll send you a link to reset your password.</p>
            <FloatingLabelInput
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              hasError={!!error}
            />
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;