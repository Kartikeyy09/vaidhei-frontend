// FILE: src/admin/components/profile/EditProfileModal.jsx (NEW FILE)

import { useState, useEffect, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, UserIcon, AtSymbolIcon, PhotoIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAsync, selectLogin } from '../../../features/adminSlice/auth/loginSlice';

const SERVER_URL = "http://localhost:3000";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectLogin);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  
  // Populate form with existing user data when modal opens
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAvatarPreview(user.avatar ? `${SERVER_URL}${user.avatar}` : null);
      setBannerPreview(user.banner ? `${SERVER_URL}${user.banner}` : null);
      setAvatarFile(null);
      setBannerFile(null);
      setIsSuccess(false);
    }
  }, [user, isOpen]);

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatarFile) formData.append('avatar', avatarFile);
    if (bannerFile) formData.append('banner', bannerFile);

    dispatch(updateProfileAsync(formData))
      .unwrap()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => onClose(), 2000);
      });
  };
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* ... Backdrop ... */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">Edit Profile</Dialog.Title>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                
                {isSuccess ? (
                    <div className="text-center py-10"><CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" /><h4 className="text-xl font-semibold">Profile Updated!</h4><p className="text-slate-500 mt-2">Your changes have been saved successfully.</p></div>
                ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  {/* Image Uploads */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Avatar Upload */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Avatar</label>
                      <div onClick={() => avatarInputRef.current.click()} className="mt-1 flex items-center gap-4 cursor-pointer">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center ring-2 ring-slate-200 overflow-hidden">
                          {avatarPreview ? <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" /> : <PhotoIcon className="w-10 h-10 text-slate-400" />}
                        </div>
                        <span className="rounded-md border border-slate-300 bg-white py-1.5 px-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">Change</span>
                      </div>
                      <input type="file" ref={avatarInputRef} onChange={(e) => handleFileChange(e, setAvatarFile, setAvatarPreview)} className="hidden" accept="image/*" />
                    </div>
                    {/* Banner Upload */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Banner</label>
                      <div onClick={() => bannerInputRef.current.click()} className="mt-1 flex justify-center items-center w-full h-20 rounded-md border-2 border-dashed border-gray-300 p-2 cursor-pointer hover:border-red-500 overflow-hidden">
                        {bannerPreview ? <img src={bannerPreview} alt="Banner Preview" className="h-full object-cover" /> : <div className="text-center text-sm text-slate-500">Click to upload</div>}
                      </div>
                      <input type="file" ref={bannerInputRef} onChange={(e) => handleFileChange(e, setBannerFile, setBannerPreview)} className="hidden" accept="image/*" />
                    </div>
                  </div>
                  {/* Text Inputs */}
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                  </div>
                  {error && <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>}
                  <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50">{loading ? 'Saving...' : 'Save Changes'}</button>
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

export default EditProfileModal;