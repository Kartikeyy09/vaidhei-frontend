// src/admin/components/ServiceEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid';

// Reusable Input Components for consistency
const FloatingLabelInput = ({ id, value, onChange, label }) => (
    <div className="relative">
        <input id={id} name={id} type="text" value={value} onChange={onChange} required className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " />
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);
const FloatingLabelTextarea = ({ id, value, onChange, label, rows = 3 }) => (
     <div className="relative">
        <textarea id={id} name={id} value={value} onChange={onChange} rows={rows} className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" "></textarea>
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);


const ServiceEditor = ({ isOpen, onClose, onSave, service }) => {
    const [formData, setFormData] = useState({ title: '', icon: '', shortDescription: '', detailedDescription: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (service) {
                setFormData({
                    title: service.title || '', icon: service.icon || '', 
                    shortDescription: service.shortDescription || '', detailedDescription: service.detailedDescription || ''
                });
                setImagePreview(service.imageUrl || null);
            } else {
                setFormData({ title: '', icon: '', shortDescription: '', detailedDescription: '' });
                setImagePreview(null);
                setImageFile(null);
            }
        }
    }, [service, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const dataToSave = { ...formData, slug, imageUrl: imagePreview };
        onSave(dataToSave);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-40" /></Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{service ? 'Edit Service' : 'Add New Service'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-h-[75vh] overflow-y-auto pr-4">
                                        {/* Left Column: Image Uploader */}
                                        <div className="md:col-span-1">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Service Image</label>
                                            <div onClick={() => fileInputRef.current.click()} className={`relative flex justify-center items-center h-full w-full rounded-lg border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-red-500 ${imagePreview ? 'p-0 border-solid' : ''}`}>
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg"/>
                                                ) : (
                                                    <div className="text-center">
                                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                                        <p className="mt-2 text-sm text-gray-600">Click to upload</p>
                                                    </div>
                                                )}
                                            </div>
                                            <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept="image/*"/>
                                        </div>

                                        {/* Right Column: Text Details */}
                                        <div className="md:col-span-1 space-y-6">
                                            <FloatingLabelInput id="title" label="Service Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                                            <FloatingLabelInput id="icon" label="Heroicon Name (e.g., Cog6ToothIcon)" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} />
                                            <FloatingLabelTextarea id="shortDescription" label="Short Description (for cards)" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} />
                                            <FloatingLabelTextarea id="detailedDescription" label="Detailed Description (for service page)" value={formData.detailedDescription} onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})} rows={5} />
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold">Save Service</button>
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