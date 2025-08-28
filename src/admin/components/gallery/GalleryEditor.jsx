// src/admin/components/GalleryEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';

// Reusable Floating Label Input for consistency
const FloatingLabelInput = ({ id, value, onChange, label, hasError = false }) => (
    <div className="relative">
        <input
            id={id} name={id} type="text" value={value} onChange={onChange} required
            className={`block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer ${hasError ? 'border-red-500' : 'border-gray-300 focus:border-red-600'}`}
            placeholder=" "
        />
        <label htmlFor={id} className={`absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${hasError ? 'text-red-600' : 'peer-focus:text-red-600'}`}>
            {label}
        </label>
    </div>
);

const GalleryEditor = ({ isOpen, onClose, onSave, image }) => {
    const [formData, setFormData] = useState({ title: '', category: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (image) {
                setFormData({ title: image.title || '', category: image.category || '' });
                setImagePreview(image.imageUrl || null);
            } else {
                setFormData({ title: '', category: '' });
                setImagePreview(null);
                setImageFile(null);
            }
        }
    }, [image, isOpen]);
    
    // Cleanup the object URL to prevent memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(image?.imageUrl || null); // Revert to original if editing, else null
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        
        // IMPORTANT: Backend integration logic
        // If imageFile exists, you send the file itself (multipart/form-data).
        // If not, you send the original imageUrl (or null).
        // For this mock, we'll just log it.
        console.log("Submitting with file:", imageFile);
        console.log("Submitting with form data:", { ...formData, slug });

        const dataToSave = {
            ...formData,
            slug,
            // This is a simplified way to handle the mock save
            imageUrl: imagePreview 
        };

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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{image ? 'Edit Image' : 'Add New Image'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    {/* Image Uploader */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg"/>
                                                <div className="absolute top-2 right-2 flex gap-2">
                                                    <button type="button" onClick={() => fileInputRef.current.click()} className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white/80 rounded-full shadow-sm hover:bg-white backdrop-blur-sm">Change</button>
                                                    <button type="button" onClick={handleRemoveImage} className="px-3 py-1 text-xs font-semibold text-red-700 bg-white/80 rounded-full shadow-sm hover:bg-white backdrop-blur-sm">Remove</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div 
                                                onClick={() => fileInputRef.current.click()}
                                                className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 cursor-pointer hover:border-red-500"
                                            >
                                                <div className="text-center">
                                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <p className="pl-1">Click to upload or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        )}
                                        <input ref={fileInputRef} type="file" name="imageFile" onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/gif" />
                                    </div>

                                    <FloatingLabelInput id="title" label="Image Title / Caption" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                                    <FloatingLabelInput id="category" label="Category (e.g., Railways)" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />

                                    <div className="pt-4 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold">Save Image</button>
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

export default GalleryEditor;