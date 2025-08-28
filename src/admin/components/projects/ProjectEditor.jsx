// src/admin/components/ProjectEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/solid';

// Reusable Input Components
const FloatingLabelInput = ({ id, value, onChange, label, type = 'text' }) => (
    <div className="relative">
        <input id={id} name={id} type={type} value={value} onChange={onChange} required className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " />
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);
const FloatingLabelTextarea = ({ id, value, onChange, label, rows = 3 }) => (
     <div className="relative">
        <textarea id={id} name={id} value={value} onChange={onChange} rows={rows} className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" "></textarea>
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);


const ProjectEditor = ({ isOpen, onClose, onSave, project }) => {
    const [formData, setFormData] = useState({ title: '', category: '', location: '', status: 'Upcoming', shortDescription: '', detailedDescription: '' });
    const [mainImageFile, setMainImageFile] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]); // Will hold File objects or existing URL strings
    const mainFileInputRef = useRef(null);
    const galleryFileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (project) {
                setFormData({
                    title: project.title || '', category: project.category || '', location: project.location || '',
                    status: project.status || 'Upcoming', shortDescription: project.shortDescription || '', detailedDescription: project.detailedDescription || ''
                });
                setMainImagePreview(project.imageUrl || null);
                setGalleryFiles(project.galleryImages || []);
            } else {
                setFormData({ title: '', category: '', location: '', status: 'Upcoming', shortDescription: '', detailedDescription: '' });
                setMainImagePreview(null); setMainImageFile(null);
                setGalleryFiles([]);
            }
        }
    }, [project, isOpen]);

    const handleMainFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImageFile(file);
            setMainImagePreview(URL.createObjectURL(file));
        }
    };
    
    const handleGalleryFilesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // We store the File object itself to be uploaded later
            setGalleryFiles(prev => [...prev, ...files]);
        }
    };
    
    const removeGalleryImage = (indexToRemove) => {
        setGalleryFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        // In a real app, you'd handle file uploads here via multipart/form-data
        const dataToSave = { ...formData, slug, imageUrl: mainImagePreview, galleryImages: galleryFiles.map(file => typeof file === 'string' ? file : URL.createObjectURL(file)) };
        onSave(dataToSave);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-40" /></Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{project ? 'Edit Project' : 'Add New Project'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 max-h-[75vh] overflow-y-auto pr-4">
                                        {/* Left Column: Text Details */}
                                        <div className="space-y-6">
                                            <FloatingLabelInput id="title" label="Project Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                                            <div className="grid grid-cols-2 gap-6">
                                                <FloatingLabelInput id="category" label="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                                                <FloatingLabelInput id="location" label="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                                            </div>
                                            <div>
                                                <label htmlFor="status" className="text-sm font-medium text-slate-700">Status</label>
                                                <select id="status" name="status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="mt-1 w-full rounded-md border-gray-300" required>
                                                    <option>Upcoming</option><option>Ongoing</option><option>Completed</option>
                                                </select>
                                            </div>
                                            <FloatingLabelTextarea id="shortDescription" label="Short Description (for cards)" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} />
                                            <FloatingLabelTextarea id="detailedDescription" label="Detailed Description (for project page)" value={formData.detailedDescription} onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})} rows={6} />
                                        </div>

                                        {/* Right Column: Image Uploaders */}
                                        <div className="space-y-6">
                                            {/* Main Image Uploader */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Main Project Image</label>
                                                <div onClick={() => mainFileInputRef.current.click()} className={`flex justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-red-500 ${mainImagePreview ? 'p-0 border-solid' : ''}`}>
                                                    {mainImagePreview ? <img src={mainImagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg"/> : <div className="text-center"><PhotoIcon className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-2 text-sm text-gray-600">Click to upload</p></div>}
                                                </div>
                                                <input ref={mainFileInputRef} type="file" onChange={handleMainFileChange} className="hidden" accept="image/*"/>
                                            </div>
                                            {/* Gallery Image Uploader */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Gallery Images</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {galleryFiles.map((file, index) => (
                                                        <div key={index} className="relative group">
                                                            <img src={typeof file === 'string' ? file : URL.createObjectURL(file)} alt={`Gallery preview ${index + 1}`} className="h-24 w-full object-cover rounded-md"/>
                                                            <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100"><TrashIcon className="w-4 h-4"/></button>
                                                        </div>
                                                    ))}
                                                    <div onClick={() => galleryFileInputRef.current.click()} className="flex items-center justify-center h-24 w-full rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500 cursor-pointer">
                                                        <PhotoIcon className="w-8 h-8"/>
                                                    </div>
                                                </div>
                                                <input ref={galleryFileInputRef} type="file" onChange={handleGalleryFilesChange} className="hidden" accept="image/*" multiple/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold">Save Project</button>
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

export default ProjectEditor;