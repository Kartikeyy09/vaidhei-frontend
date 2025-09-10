// ✅ FILE: pages/admin/ResetPasswordPage.jsx (NEW)

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAsync, resetPasswordState } from '../../../features/adminSlice/auth/passwordResetSlice';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const FloatingLabelInput = ({ id, label, type, value, onChange, hasError }) => (
    <div className="relative">
      <input id={id} type={type} value={value} onChange={onChange} placeholder=" " className={`peer w-full rounded-lg border px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 ${hasError ? "border-red-500" : "border-gray-300"}`} required />
      <label htmlFor={id} className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-red-500 peer-focus:text-sm">{label}</label>
    </div>
);

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchError, setMatchError] = useState('');

  const { loading, successMessage, error } = useSelector((state) => state.passwordReset);

  // Limpia el estado cuando el componente se desmonta
  useEffect(() => {
    return () => {
      dispatch(resetPasswordState());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatchError('');
    if (password !== confirmPassword) {
      setMatchError('Passwords do not match.');
      return;
    }
    dispatch(resetPasswordAsync({ token, password }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Set New Password</h1>

        {successMessage ? (
          <div className="text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-slate-600 mb-6">{successMessage}</p>
            <Link to="/admin/login" className="w-full block text-center py-3 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold">
              Go to Login
            </Link>
          </div>
        ) : error && error.includes('Invalid or expired') ? (
            <div className="text-center">
                <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <p className="text-slate-600 mb-6">{error}</p>
                 <Link to="/admin-login" className="w-full block text-center py-3 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold">
                    Back to Login
                </Link>
            </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingLabelInput
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="New Password"
              hasError={!!matchError}
            />
            <FloatingLabelInput
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm New Password"
              hasError={!!matchError}
            />

            {matchError && <p className="text-sm text-red-600">{matchError}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold disabled:bg-red-400"
            >
              {loading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;