// src/admin/pages/SettingsPage.jsx

import { useState, useEffect } from "react";
import { 
    BuildingOffice2Icon, 
    AtSymbolIcon, 
    PhoneIcon, 
    MapPinIcon, 
    UserCircleIcon,
    KeyIcon,
    LinkIcon,
    CheckCircleIcon
} from "@heroicons/react/24/solid";

// --- MOCK DATA (This will be fetched from your API, e.g., GET /api/settings) ---
const initialSettingsData = {
    general: {
        companyName: "Vaidehi Enterprises",
        contactEmail: "contact@vaidehienterprises.com",
        contactPhone: "+91 98765 43210",
        address: "123 Business Hub, New Delhi, India 110001"
    },
    social: {
        linkedIn: "https://linkedin.com/company/vaidehi-enterprises",
        twitter: "https://twitter.com/vaidehi",
        facebook: ""
    },
    admin: {
        username: "admin_user",
        email: "admin@vaidehienterprises.com"
    }
};

// Reusable component for a single input field
const SettingInput = ({ label, id, icon: Icon, value, onChange, type = 'text', placeholder }) => (
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
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-red-500 focus:ring-red-500"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

const SettingsPage = () => {
    const [settings, setSettings] = useState(initialSettingsData);
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // In a real app, you'd fetch settings here
        setSettings(initialSettingsData);
    }, []);

    const handleGeneralChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, general: { ...prev.general, [name]: value } }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, social: { ...prev.social, [name]: value } }));
    };
    
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({...prev, [name]: value}));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setShowSuccess(false);

        // --- MOCK API CALL ---
        // In a real app: await fetch('/api/settings', { method: 'PUT', body: JSON.stringify(settings) });
        console.log("Saving settings:", settings);

        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000); // Hide success message after 2s
        }, 1000);
    };

    return (
        <form onSubmit={handleSaveChanges}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your website's global configuration.</p>
                </div>
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-all duration-300 disabled:bg-red-400"
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <span>Saving...</span>
                    ) : showSuccess ? (
                        <> <CheckCircleIcon className="w-5 h-5"/> <span>Saved!</span> </>
                    ) : (
                        <span>Save Changes</span>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: General & Social */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Settings Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800 border-b pb-4">General Settings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <SettingInput label="Company Name" id="companyName" icon={BuildingOffice2Icon} value={settings.general.companyName} onChange={handleGeneralChange} />
                            <SettingInput label="Contact Email" id="contactEmail" icon={AtSymbolIcon} type="email" value={settings.general.contactEmail} onChange={handleGeneralChange} />
                            <SettingInput label="Contact Phone" id="contactPhone" icon={PhoneIcon} type="tel" value={settings.general.contactPhone} onChange={handleGeneralChange} />
                            <SettingInput label="Address" id="address" icon={MapPinIcon} value={settings.general.address} onChange={handleGeneralChange} />
                        </div>
                    </div>

                    {/* Social Media Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800 border-b pb-4">Social Media Links</h2>
                        <div className="grid grid-cols-1 gap-6 mt-6">
                            <SettingInput label="LinkedIn" id="linkedIn" icon={LinkIcon} value={settings.social.linkedIn} onChange={handleSocialChange} placeholder="https://linkedin.com/..." />
                            <SettingInput label="Twitter / X" id="twitter" icon={LinkIcon} value={settings.social.twitter} onChange={handleSocialChange} placeholder="https://twitter.com/..." />
                            <SettingInput label="Facebook" id="facebook" icon={LinkIcon} value={settings.social.facebook} onChange={handleSocialChange} placeholder="https://facebook.com/..." />
                        </div>
                    </div>
                </div>

                {/* Right Column: Admin Account */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800 border-b pb-4">Admin Account</h2>
                        <div className="space-y-6 mt-6">
                            <SettingInput label="Username" id="username" icon={UserCircleIcon} value={settings.admin.username} onChange={()=>{}} />
                            <SettingInput label="Email Address" id="email" icon={AtSymbolIcon} value={settings.admin.email} onChange={()=>{}} />
                            <hr />
                            <SettingInput label="Current Password" id="current" icon={KeyIcon} type="password" value={passwordData.current} onChange={handlePasswordChange} placeholder="••••••••" />
                            <SettingInput label="New Password" id="new" icon={KeyIcon} type="password" value={passwordData.new} onChange={handlePasswordChange} placeholder="••••••••" />
                            <SettingInput label="Confirm New Password" id="confirm" icon={KeyIcon} type="password" value={passwordData.confirm} onChange={handlePasswordChange} placeholder="••••••••" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SettingsPage;