// src/admin/pages/AdminLoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, KeyIcon, ArrowPathIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

// --- REUSABLE FLOATING LABEL INPUT COMPONENT ---
const FloatingLabelInput = ({ id, name, type, value, onChange, label, icon: Icon, required = false, hasError = false }) => {
    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className={`
                    block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none
                    focus:outline-none focus:ring-0
                    peer
                    ${hasError ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-red-600'}
                `}
                placeholder=" " // This space is crucial for the effect
            />
            <label 
                htmlFor={id} 
                className={`
                    absolute text-slate-500 duration-300 transform 
                    -translate-y-3 scale-75 top-4 z-10 origin-[0] 
                    left-4 
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 
                    peer-focus:-translate-y-3
                    ${hasError ? 'text-red-600' : 'peer-focus:text-red-600'}
                `}
            >
                {label}
            </label>
             {Icon && <Icon className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 text-gray-400" />}
        </div>
    );
};


const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            if (email === 'admin@vaidehi.com' && password === 'password123') {
                navigate('/admin');
            } else {
                setError('Invalid email or password. Please try again.');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800">Vaidehi Admin</h1>
                        <p className="text-slate-500 mt-2">Sign in to manage your website</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FloatingLabelInput 
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            required
                            hasError={!!error}
                        />

                        <div className="relative">
                             <FloatingLabelInput 
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                required
                                hasError={!!error}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                            </button>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}
                        
                        <div className="flex items-center justify-end">
                            <a href="#" className="text-sm text-red-600 hover:underline font-medium">
                                Forgot password?
                            </a>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;