// src/admin/components/MilestoneEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid';

// Reusable Floating Label Input for consistency
const FloatingLabelInput = ({ id, value, onChange, label, type = 'text', required = false }) => (
    <div className="relative">
        <input
            id={id} name={id} type={type} value={value} onChange={onChange} required={required}
            className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600"
            placeholder=" "
        />
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">
            {label}
        </label>
    </div>
);

const MilestoneEditor = ({ isOpen, onClose, onSave, milestone }) => {
    const [formData, setFormData] = useState({ year: '', title: '', description: '', outcomes: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (milestone) {
                setFormData({
                    year: milestone.year || '',
                    title: milestone.title || '',
                    description: milestone.description || '',
                    outcomes: Array.isArray(milestone.outcomes) ? milestone.outcomes.join('\n') : ''
                });
                setImagePreview(milestone.imageUrl || null);
            } else {
                setFormData({ year: '', title: '', description: '', outcomes: '' });
                setImagePreview(null);
                setImageFile(null);
            }
        }
    }, [milestone, isOpen]);

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            outcomes: formData.outcomes.split('\n').filter(line => line.trim() !== ''),
            // Simplified for mock save
            imageUrl: imagePreview
        };
        onSave(finalData);
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
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{milestone ? 'Edit Milestone' : 'Add New Milestone'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-h-[75vh] overflow-y-auto pr-4">
                                    {/* Image Uploader */}
                                    <div className="col-span-full">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Milestone Image</label>
                                        <div onClick={() => fileInputRef.current.click()} className={`mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 cursor-pointer hover:border-red-500 ${imagePreview ? 'p-0 border-solid' : ''}`}>
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg"/>
                                            ) : (
                                                <div className="text-center">
                                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                                    <p className="mt-4 text-sm text-gray-600">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-gray-600">PNG, JPG up to 10MB</p>
                                                </div>
                                            )}
                                        </div>
                                        <input ref={fileInputRef} type="file" name="imageFile" onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg"/>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingLabelInput id="year" label="Year" value={formData.year} onChange={handleChange} required />
                                        <FloatingLabelInput id="title" label="Title" value={formData.title} onChange={handleChange} required />
                                    </div>
                                    
                                    <div className="relative">
                                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " required></textarea>
                                        <label htmlFor="description" className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">Description</label>
                                    </div>
                                    
                                    <div className="relative">
                                        <textarea id="outcomes" name="outcomes" value={formData.outcomes} onChange={handleChange} rows="4" className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" "></textarea>
                                        <label htmlFor="outcomes" className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">Key Outcomes (one per line)</label>
                                    </div>

                                    <div className="pt-4 flex justify-end gap-4 sticky bottom-0 bg-white/80 backdrop-blur-sm pb-1 -mx-8 px-8">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold">Save Milestone</button>
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

export default MilestoneEditor;