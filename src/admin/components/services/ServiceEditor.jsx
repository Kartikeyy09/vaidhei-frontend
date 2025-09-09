// FILE: src/admin/components/services/ServiceEditor.jsx (Corrected for Image Previews)

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon, PlusIcon } from '@heroicons/react/24/solid';

const SERVER_URL = import.meta.env.VITE_BASE_URL;

// --- Reusable UI Components (No Changes) ---
const FloatingLabelInput = ({ id, label, ...props }) => (
    <div className="relative">
        <input id={id} name={id} required className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " {...props} />
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);
const FloatingLabelTextarea = ({ id, label, rows = 3, ...props }) => (
    <div className="relative">
        <textarea id={id} name={id} rows={rows} className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " {...props}></textarea>
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);

// ✅ NEW: Helper function to create a full image URL from a relative path
const getFullImageUrl = (path) => {
    if (!path) return null;
    // If it's already a full URL (like a blob for new previews), don't change it
    if (path.startsWith('http') || path.startsWith('blob:')) {
        return path;
    }
    return `${SERVER_URL}${path}`;
};


// --- Main ServiceEditor Component ---
const ServiceEditor = ({ isOpen, onClose, onSave, service, isSaving }) => {
    const [formData, setFormData] = useState({
        title: '', description: '', overview: '', keyFeatures: '', bestFor: '',
    });

    const [coverImageFile, setCoverImageFile] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);

    const [galleryImageFiles, setGalleryImageFiles] = useState([]);
    const [existingGalleryImages, setExistingGalleryImages] = useState([]);

    const coverFileInputRef = useRef(null);
    const galleryFileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (service) { // "Edit" mode
                setFormData({
                    title: service.title || '',  description: service.description || '',
                    overview: service.details?.overview || '',
                    keyFeatures: service.details?.keyFeatures?.join(', ') || '',
                    bestFor: service.details?.bestFor || '',
                });

                // ✅ UPDATED: Use the helper function to set correct preview URLs
                setCoverImagePreview(getFullImageUrl(service.details?.coverImage));
                setExistingGalleryImages(service.details?.galleryImages?.map(url => getFullImageUrl(url)) || []);
                
                // Reset file inputs
                setCoverImageFile(null);
                setGalleryImageFiles([]);
            } else { // "Add New" mode
                setFormData({ title: '', description: '', overview: '', keyFeatures: '', bestFor: '' });
                setCoverImagePreview(null);
                setExistingGalleryImages([]);
                setCoverImageFile(null);
                setGalleryImageFiles([]);
            }
        }
    }, [service, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImageFile(file);
            setCoverImagePreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length) {
            setGalleryImageFiles(prevFiles => [...prevFiles, ...files]);
        }
    };

    const handleRemoveNewGalleryImage = (indexToRemove) => {
        setGalleryImageFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = new FormData();
        
        Object.keys(formData).forEach(key => dataToSave.append(key, formData[key]));

        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        dataToSave.append('slug', slug);

        if (coverImageFile) {
            dataToSave.append('coverImage', coverImageFile);
        }
        
        if (galleryImageFiles.length > 0) {
            galleryImageFiles.forEach(file => {
                dataToSave.append('galleryImages', file);
            });
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{service ? 'Edit Service' : 'Add New Service'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>

                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 max-h-[75vh] overflow-y-auto pr-4">
                                        
                                        {/* Left Column: Image Uploads */}
                                        <div className="space-y-6">
                                            {/* Cover Image Section */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
                                                <div onClick={() => coverFileInputRef.current.click()} className={`relative flex justify-center items-center aspect-video w-full rounded-lg border-2 border-dashed border-gray-300 p-2 cursor-pointer hover:border-red-500 ${coverImagePreview ? 'p-0 border-solid' : ''}`}>
                                                    {coverImagePreview ? <img src={coverImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" /> : <div className="text-center"><PhotoIcon className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-2 text-sm text-gray-600">Click to upload cover image</p></div>}
                                                </div>
                                                <input ref={coverFileInputRef} type="file" onChange={handleCoverImageChange} className="hidden" accept="image/*" />
                                            </div>

                                            {/* Gallery Images Section */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Gallery Images</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {/* Display existing images */}
                                                    {existingGalleryImages.map((url, index) => (
                                                        <div key={`existing-${index}`} className="relative aspect-square"><img src={url} alt={`Existing gallery ${index + 1}`} className="w-full h-full object-cover rounded-md" /></div>
                                                    ))}
                                                    {/* Display new image previews with remove button */}
                                                    {galleryImageFiles.map((file, index) => (
                                                        <div key={`new-${index}`} className="relative aspect-square group">
                                                            <img src={URL.createObjectURL(file)} alt={`New preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                                            <button type="button" onClick={() => handleRemoveNewGalleryImage(index)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><XMarkIcon className="w-4 h-4" /></button>
                                                        </div>
                                                    ))}
                                                    {/* Add more images button */}
                                                    <div onClick={() => galleryFileInputRef.current.click()} className="flex justify-center items-center aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-red-500 hover:bg-red-50">
                                                        <div className="text-center text-slate-500"><PlusIcon className="mx-auto h-8 w-8" /><p className="text-xs mt-1">Add Images</p></div>
                                                    </div>
                                                </div>
                                                <input ref={galleryFileInputRef} type="file" onChange={handleGalleryImagesChange} className="hidden" accept="image/*" multiple />
                                            </div>
                                        </div>

                                        {/* Right Column: Form Fields */}
                                        <div className="space-y-6">
                                            <FloatingLabelInput id="title" label="Service Title" value={formData.title} onChange={handleChange} />
                                            
                                            <FloatingLabelTextarea id="description" label="Short Description (for cards)" value={formData.description} onChange={handleChange} />
                                            <FloatingLabelTextarea id="overview" label="Detailed Overview (for service page)" value={formData.overview} onChange={handleChange} rows={5} />
                                            <FloatingLabelInput id="keyFeatures" label="Key Features (comma-separated)" value={formData.keyFeatures} onChange={handleChange} />
                                            <FloatingLabelInput id="bestFor" label="Best For (e.g., Startups, Enterprises)" value={formData.bestFor} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold disabled:opacity-50" disabled={isSaving}>Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Service'}</button>
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