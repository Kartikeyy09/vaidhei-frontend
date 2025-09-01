// FILE: src/admin/components/services/ServiceEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid';

// --- Reusable UI Components ---
const FloatingLabelInput = ({ id, label, ...props }) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      required
      className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600"
      placeholder=" "
      {...props}
    />
    <label
      htmlFor={id}
      className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600"
    >
      {label}
    </label>
  </div>
);

const FloatingLabelTextarea = ({ id, label, rows = 3, ...props }) => (
  <div className="relative">
    <textarea
      id={id}
      name={id}
      rows={rows}
      className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600"
      placeholder=" "
      {...props}
    ></textarea>
    <label
      htmlFor={id}
      className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600"
    >
      {label}
    </label>
  </div>
);


// --- Main ServiceEditor Component ---
const ServiceEditor = ({ isOpen, onClose, onSave, service, isSaving }) => {
  // ✅ UPDATED: State now matches the backend model structure
  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    description: '',       // Corresponds to the top-level description field
    overview: '',          // Corresponds to details.overview
    keyFeatures: '',       // Corresponds to details.keyFeatures (as a string)
    bestFor: '',           // Corresponds to details.bestFor
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ UPDATED: Effect correctly maps service data (including nested 'details') to the form state
  useEffect(() => {
    if (isOpen) {
      if (service) { // For "Edit" mode
        setFormData({
          title: service.title || '',
          icon: service.icon || '',
          description: service.description || '',
          overview: service.details?.overview || '',
          keyFeatures: service.details?.keyFeatures?.join(', ') || '', // Convert array back to comma-separated string for editing
          bestFor: service.details?.bestFor || '',
        });
        setImagePreview(service.details?.coverImage || null);
        setImageFile(null);
      } else { // For "Add New" mode, reset all fields
        setFormData({ title: '', icon: '', description: '', overview: '', keyFeatures: '', bestFor: '' });
        setImagePreview(null);
        setImageFile(null);
      }
    }
  }, [service, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ UPDATED: handleSubmit now creates FormData that matches the backend controller's expectations
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = new FormData();
    
    // Append all fields required by the backend controller
    dataToSave.append('title', formData.title);
    dataToSave.append('icon', formData.icon);
    dataToSave.append('description', formData.description);
    dataToSave.append('overview', formData.overview);
    dataToSave.append('keyFeatures', formData.keyFeatures); // Sent as string, backend will split it
    dataToSave.append('bestFor', formData.bestFor);
    
    const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    dataToSave.append('slug', slug);

    if (imageFile) {
      dataToSave.append('coverImage', imageFile); // Key must be 'coverImage'
    }
    
    onSave(dataToSave);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">
                  {service ? 'Edit Service' : 'Add New Service'}
                </Dialog.Title>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>

                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-h-[75vh] overflow-y-auto pr-4">
                    {/* Image Upload Section */}
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Service Image</label>
                      <div onClick={() => fileInputRef.current.click()} className={`relative flex justify-center items-center h-full w-full rounded-lg border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-red-500 ${imagePreview ? 'p-0 border-solid' : ''}`}>
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                            <p className="mt-2 text-sm text-gray-600">Click to upload</p>
                          </div>
                        )}
                      </div>
                      <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                    </div>

                    {/* ✅ UPDATED: Form fields now match the backend model */}
                    <div className="md:col-span-1 space-y-6">
                      <FloatingLabelInput id="title" label="Service Title" value={formData.title} onChange={handleChange} />
                      <FloatingLabelInput id="icon" label="Heroicon Name (e.g., Cog6ToothIcon)" value={formData.icon} onChange={handleChange} />
                      <FloatingLabelTextarea id="description" label="Short Description (for cards)" value={formData.description} onChange={handleChange} />
                      <FloatingLabelTextarea id="overview" label="Detailed Overview (for service page)" value={formData.overview} onChange={handleChange} rows={5} />
                      <FloatingLabelInput id="keyFeatures" label="Key Features (comma-separated)" value={formData.keyFeatures} onChange={handleChange} />
                      <FloatingLabelInput id="bestFor" label="Best For (e.g., Startups, Enterprises)" value={formData.bestFor} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold disabled:opacity-50" disabled={isSaving}>
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save Service'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ServiceEditor;