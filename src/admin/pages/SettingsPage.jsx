import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BuildingOffice2Icon, AtSymbolIcon, PhoneIcon, MapPinIcon,
    KeyIcon, LinkIcon, CheckCircleIcon, ArrowPathIcon
} from "@heroicons/react/24/solid";
import { fetchSettingsAsync, updateSettingsAsync, changePasswordAsync, selectSettings } from "../../features/adminSlice/Settings/SettingsSlice";
import { selectLogin } from "../../features/adminSlice/auth/loginSlice";

// --- SKELETON LOADER COMPONENT ---
// This component mimics the entire settings page layout.
const SettingsPageSkeleton = () => (
    <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
            <div>
                <div className="h-8 w-48 bg-slate-200 rounded-md"></div>
                <div className="h-4 w-72 bg-slate-200 rounded-md mt-2"></div>
            </div>
            <div className="h-12 w-36 bg-slate-200 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                {/* General Settings Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="h-6 w-1/3 bg-slate-200 rounded-md border-b pb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 w-1/4 bg-slate-200 rounded-md mb-2"></div>
                                <div className="h-11 w-full bg-slate-200 rounded-md"></div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Social Media Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="h-6 w-1/2 bg-slate-200 rounded-md border-b pb-4"></div>
                    <div className="grid grid-cols-1 gap-6 mt-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 w-1/4 bg-slate-200 rounded-md mb-2"></div>
                                <div className="h-11 w-full bg-slate-200 rounded-md"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Admin Account Skeleton */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="h-6 w-2/3 bg-slate-200 rounded-md border-b pb-4"></div>
                    <div className="space-y-6 mt-6">
                        <div>
                            <div className="h-4 w-1/3 bg-slate-200 rounded-md mb-2"></div>
                            <div className="h-11 w-full bg-slate-200 rounded-md"></div>
                        </div>
                        <div className="h-px w-full bg-slate-200"></div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 w-1/2 bg-slate-200 rounded-md mb-2"></div>
                                <div className="h-11 w-full bg-slate-200 rounded-md"></div>
                            </div>
                        ))}
                        <div className="h-10 w-full bg-slate-300 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Reusable component for a single input field
const SettingInput = ({ label, id, icon: Icon, value, onChange, type = 'text', placeholder, readOnly = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
                type={type}
                name={id}
                id={id}
                className={`block w-full rounded-md border-gray-300 pl-10 focus:border-red-500 focus:ring-red-500 ${readOnly ? 'bg-gray-100' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
            />
        </div>
    </div>
);

const SettingsPage = () => {
    const dispatch = useDispatch();
    const { data: settingsData, status: settingsStatus, passwordChangeStatus, passwordChangeError } = useSelector(selectSettings);
    const { user: adminUser } = useSelector(selectLogin);

    const [settings, setSettings] = useState({ general: {}, social: {} });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (settingsStatus === 'idle') {
            dispatch(fetchSettingsAsync());
        }
    }, [dispatch, settingsStatus]);
    
    useEffect(() => {
        if (settingsData) {
            setSettings(settingsData);
        }
    }, [settingsData]);

    const handleGeneralChange = (e) => setSettings(prev => ({ ...prev, general: { ...prev.general, [e.target.name]: e.target.value } }));
    const handleSocialChange = (e) => setSettings(prev => ({ ...prev, social: { ...prev.social, [e.target.name]: e.target.value } }));
    const handlePasswordChange = (e) => setPasswordData(prev => ({...prev, [e.target.name]: e.target.value}));

    const handleSaveChanges = (e) => {
        e.preventDefault();
        dispatch(updateSettingsAsync({ general: settings.general, social: settings.social }))
            .unwrap()
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2500);
            })
            .catch(err => alert(`Error saving settings: ${err}`));
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Validation checks...
        dispatch(changePasswordAsync({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }))
            .unwrap()
            .then(() => {
                alert("Password changed successfully!");
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            })
            .catch(err => alert(`Error: ${err}`));
    };

    // Show skeleton while initial data is fetching
    if (settingsStatus === 'loading' || settingsStatus === 'idle') {
        return <SettingsPageSkeleton />;
    }

    const isSaving = settingsStatus === 'updating';
    const isChangingPassword = passwordChangeStatus === 'loading';

    return (
        <div>
            <form onSubmit={handleSaveChanges} className="mb-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
                        <p className="text-slate-500 mt-1">Manage your website's global configuration.</p>
                    </div>
                    <button type="submit" className="flex items-center justify-center w-36 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-all duration-300 disabled:bg-red-400" disabled={isSaving}>
                        {isSaving ? <ArrowPathIcon className="w-5 h-5 animate-spin"/> : showSuccess ? <><CheckCircleIcon className="w-5 h-5"/> Saved!</> : <span>Save Changes</span>}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-4">General Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <SettingInput label="Company Name" id="companyName" icon={BuildingOffice2Icon} value={settings.general?.companyName || ''} onChange={handleGeneralChange} />
                                <SettingInput label="Contact Email" id="contactEmail" icon={AtSymbolIcon} type="email" value={settings.general?.contactEmail || ''} onChange={handleGeneralChange} />
                                <SettingInput label="Contact Phone" id="contactPhone" icon={PhoneIcon} type="tel" value={settings.general?.contactPhone || ''} onChange={handleGeneralChange} />
                                <SettingInput label="Address" id="address" icon={MapPinIcon} value={settings.general?.address || ''} onChange={handleGeneralChange} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-4">Social Media Links</h2>
                            <div className="grid grid-cols-1 gap-6 mt-6">
                                <SettingInput label="LinkedIn" id="linkedIn" icon={LinkIcon} value={settings.social?.linkedIn || ''} onChange={handleSocialChange} placeholder="https://linkedin.com/..." />
                                <SettingInput label="Twitter / X" id="twitter" icon={LinkIcon} value={settings.social?.twitter || ''} onChange={handleSocialChange} placeholder="https://twitter.com/..." />
                                <SettingInput label="Facebook" id="facebook" icon={LinkIcon} value={settings.social?.facebook || ''} onChange={handleSocialChange} placeholder="https://facebook.com/..." />
                            </div>
                        </div>
                    </div>

                    {/* <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-4">Admin Account</h2>
                            <form onSubmit={handleChangePassword} className="space-y-6 mt-6">
                                <SettingInput label="Email Address" id="email" icon={AtSymbolIcon} value={adminUser?.email || ''} readOnly />
                                <hr />
                                <SettingInput label="Current Password" id="currentPassword" name="currentPassword" icon={KeyIcon} type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                                <SettingInput label="New Password" id="newPassword" name="newPassword" icon={KeyIcon} type="password" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                                <SettingInput label="Confirm New Password" id="confirmPassword" name="confirmPassword" icon={KeyIcon} type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                                {passwordChangeError && <p className="text-sm text-red-500">{passwordChangeError}</p>}
                                <button type="submit" disabled={isChangingPassword} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400">
                                    {isChangingPassword ? <ArrowPathIcon className="w-5 h-5 animate-spin"/> : 'Change Password'}
                                </button>
                            </form>
                        </div>
                    </div> */}
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;