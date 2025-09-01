// ✅ FILE: src/admin/components/gallery/GalleryEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

// Reusable Floating Label Input
const FloatingLabelInput = ({ id, label, ...props }) => (
    <div className="relative">
        <input id={id} name={id} type="text" required className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " {...props} />
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);

const GalleryEditor = ({ isOpen, onClose, onSave, item, isSaving }) => {
    const [formData, setFormData] = useState({ title: '', category: '', type: 'image', videoUrl: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (item) { // Edit mode
                setFormData({
                    title: item.title || '',
                    category: item.category || '',
                    type: item.type || 'image',
                    videoUrl: item.videoUrl || '',
                });
                setImagePreview(item.imageUrl ? `http://localhost:3000${item.imageUrl}` : null);
                setImageFile(null); // Reset file on open
            } else { // Add mode
                setFormData({ title: '', category: '', type: 'image', videoUrl: '' });
                setImagePreview(null);
                setImageFile(null);
            }
        }
    }, [item, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = new FormData();
        dataToSave.append('title', formData.title);
        dataToSave.append('category', formData.category);
        dataToSave.append('type', formData.type);

        if (formData.type === 'image' && imageFile) {
            // IMPORTANT: Yeh key 'image' aapke backend ke multer middleware se match honi chahiye
            // e.g., upload.single('image')
            dataToSave.append('image', imageFile);
        }
        if (formData.type === 'video') {
            dataToSave.append('videoUrl', formData.videoUrl);
        }
        
        onSave(dataToSave);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-40" /></Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{item ? 'Edit Gallery Item' : 'Add New Item to Gallery'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    {/* Type Selector */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Item Type</label>
                                        <div className="mt-2 grid grid-cols-2 gap-4">
                                            <button type="button" onClick={() => setFormData({...formData, type: 'image'})} className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${formData.type === 'image' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                                                <PhotoIcon className="w-5 h-5" /> Image
                                            </button>
                                            <button type="button" onClick={() => setFormData({...formData, type: 'video'})} className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${formData.type === 'video' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                                                <VideoCameraIcon className="w-5 h-5" /> Video
                                            </button>
                                        </div>
                                    </div>

                                    {/* Conditional Inputs */}
                                    {formData.type === 'image' ? (
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Image File</label>
                                            <div onClick={() => fileInputRef.current.click()} className={`flex justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-red-500 ${imagePreview ? 'p-0 border-solid' : ''}`}>
                                                {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg"/> : <div className="text-center"><PhotoIcon className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-2 text-sm text-gray-600">Click to upload</p></div>}
                                            </div>
                                            <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                                        </div>
                                    ) : (
                                        <FloatingLabelInput id="videoUrl" name="videoUrl" label="YouTube Share URL" value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} />
                                    )}

                                    <FloatingLabelInput id="title" name="title" label="Title / Caption" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                                    <FloatingLabelInput id="category" name="category" label="Category (e.g., Railways)" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />

                                    <div className="pt-4 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold disabled:opacity-50" disabled={isSaving}>Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Item'}</button>
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