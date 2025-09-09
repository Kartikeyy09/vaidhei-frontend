// ✅ FILE: src/admin/components/projects/ProjectEditor.jsx (Fully Updated)

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/solid';

// Reusable Components (No changes)
const FloatingLabelInput = ({ id, label, ...props }) => (
    <div className="relative">
        <input id={id} name={id} required className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " {...props} />
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);
const FloatingLabelTextarea = ({ id, label, ...props }) => (
    <div className="relative">
        <textarea id={id} name={id} required rows="4" className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " {...props}></textarea>
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);

const ProjectEditor = ({ isOpen, onClose, onSave, project, isSaving }) => {
    // ✅ UPDATED: State expanded for status, coverImage, and galleryImages
    const [formData, setFormData] = useState({ title: '', location: '', description: '', status: 'Completed' });
    const [details, setDetails] = useState({ challenge: '', solution: '', results: '' });
    
    // States for the 3 types of images
    const [imageFile, setImageFile]                   = useState(null);
    const [imagePreview, setImagePreview]             = useState(null);
    const [coverImageFile, setCoverImageFile]         = useState(null);
    const [coverImagePreview, setCoverImagePreview]   = useState(null);
    const [galleryFiles, setGalleryFiles]             = useState([]);
    const [galleryPreviews, setGalleryPreviews]       = useState([]);

    const imageInputRef = useRef(null);
    const coverImageInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    // ✅ UPDATED: useEffect populates all new fields for editing
    useEffect(() => {
        if (isOpen) {
            const SERVER_URL = import.meta.env.VITE_BASE_URL;
            if (project) { // Edit Mode
                setFormData({
                    title: project.title || '',
                    location: project.location || '',
                    description: project.description || '',
                    status: project.status || 'Completed',
                });
                setDetails({
                    challenge: project.details?.challenge || '',
                    solution: project.details?.solution || '',
                    results: project.details?.results || '',
                });
                setImagePreview(project.image ? `${serverUrl}${project.image}` : null);
                setCoverImagePreview(project.coverImage ? `${serverUrl}${project.coverImage}` : null);
                setGalleryPreviews(project.galleryImages ? project.galleryImages.map(img => `${serverUrl}${img}`) : []);
                // Reset file inputs
                setImageFile(null);
                setCoverImageFile(null);
                setGalleryFiles([]);
            } else { // Add New Mode
                setFormData({ title: '', location: '', description: '', status: 'Completed' });
                setDetails({ challenge: '', solution: '', results: '' });
                setImagePreview(null);
                setCoverImagePreview(null);
                setGalleryPreviews([]);
                setImageFile(null);
                setCoverImageFile(null);
                setGalleryFiles([]);
            }
        }
    }, [project, isOpen]);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleDetailsChange = (e) => setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));

    // File Handlers for each input
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleCoverImageChange = (e) => {
        if (e.target.files[0]) {
            setCoverImageFile(e.target.files[0]);
            setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeGalleryImage = (index) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // ✅ UPDATED: handleSubmit appends all new fields to FormData
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = new FormData();
        
        dataToSave.append('title', formData.title);
        dataToSave.append('location', formData.location);
        dataToSave.append('description', formData.description);
        dataToSave.append('status', formData.status);
        dataToSave.append('slug', formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
        dataToSave.append('details', JSON.stringify(details));

        if (imageFile) dataToSave.append('image', imageFile);
        if (coverImageFile) dataToSave.append('coverImage', coverImageFile);
        if (galleryFiles.length > 0) {
            galleryFiles.forEach(file => dataToSave.append('galleryImages', file));
        }
        
        onSave(dataToSave);
    };

    const ImageUploader = ({ label, preview, inputRef, onChange }) => (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            <div onClick={() => inputRef.current.click()} className={`flex justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-red-500 ${preview ? 'p-0 border-solid' : ''}`}>
                {preview ? <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg"/> : <div className="text-center"><PhotoIcon className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-2 text-sm text-gray-600">Click to upload image</p></div>}
            </div>
            <input ref={inputRef} type="file" onChange={onChange} className="hidden" accept="image/*"/>
        </div>
    );

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* ... Dialog backdrop ... */}
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-40" /></Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{project ? 'Edit Case Study' : 'Add New Case Study'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4">
                                        <FloatingLabelInput id="title" name="title" label="Project Title" value={formData.title} onChange={handleChange} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FloatingLabelInput id="location" name="location" label="Location" value={formData.location} onChange={handleChange} />
                                            <div>
                                                <label htmlFor="status" className="block text-sm font-medium text-slate-700">Project Status</label>
                                                <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required>
                                                    <option>Completed</option><option>Ongoing</option><option>Upcoming</option>
                                                </select>
                                            </div>
                                        </div>
                                        <FloatingLabelTextarea id="description" name="description" label="Short Description" value={formData.description} onChange={handleChange} />

                                        <div className="pt-4 border-t">
                                            <h4 className="text-lg font-semibold text-slate-800 mb-4">Case Study Details</h4>
                                            <div className="space-y-6">
                                                <FloatingLabelTextarea id="challenge" name="challenge" label="The Challenge" value={details.challenge} onChange={handleDetailsChange} />
                                                <FloatingLabelTextarea id="solution" name="solution" label="Our Solution" value={details.solution} onChange={handleDetailsChange} />
                                                <FloatingLabelTextarea id="results" name="results" label="The Results" value={details.results} onChange={handleDetailsChange} />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t space-y-6">
                                            <ImageUploader label="Card Image (Thumbnail)" preview={imagePreview} inputRef={imageInputRef} onChange={handleImageChange} />
                                            <ImageUploader label="Cover Image (Hero Banner)" preview={coverImagePreview} inputRef={coverImageInputRef} onChange={handleCoverImageChange} />
                                            
                                            {/* Gallery Uploader */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Gallery Images</label>
                                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                                    {galleryPreviews.map((src, index) => (
                                                        <div key={index} className="relative group">
                                                            <img src={src} alt={`Gallery preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                                                            <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <div onClick={() => galleryInputRef.current.click()} className="flex items-center justify-center w-full h-24 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-red-500">
                                                        <div className="text-center"><PhotoIcon className="mx-auto h-8 w-8 text-gray-300" /><p className="mt-1 text-xs text-gray-600">Add more</p></div>
                                                    </div>
                                                </div>
                                                <input ref={galleryInputRef} type="file" onChange={handleGalleryChange} className="hidden" accept="image/*" multiple/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold disabled:opacity-50" disabled={isSaving}>Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Project'}</button>
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