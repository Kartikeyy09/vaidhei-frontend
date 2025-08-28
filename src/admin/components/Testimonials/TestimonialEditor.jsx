// src/admin/components/TestimonialEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/solid';

// Reusable Input Components
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


const TestimonialEditor = ({ isOpen, onClose, onSave, testimonial }) => {
    const [formData, setFormData] = useState({ authorName: '', authorTitle: '', quote: '', rating: 5, status: 'Published' });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (testimonial) {
                setFormData({
                    authorName: testimonial.authorName || '', authorTitle: testimonial.authorTitle || '',
                    quote: testimonial.quote || '', rating: testimonial.rating || 5, status: testimonial.status || 'Published'
                });
                setAvatarPreview(testimonial.avatarUrl || null);
            } else {
                setFormData({ authorName: '', authorTitle: '', quote: '', rating: 5, status: 'Published' });
                setAvatarPreview(null);
                setAvatarFile(null);
            }
        }
    }, [testimonial, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = { ...formData, rating: Number(formData.rating), avatarUrl: avatarPreview };
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
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                        {/* Left Column: Avatar Uploader */}
                                        <div className="md:col-span-1 flex flex-col items-center">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Author's Photo</label>
                                            <div onClick={() => fileInputRef.current.click()} className="relative w-32 h-32 rounded-full flex items-center justify-center bg-slate-100 border-2 border-dashed border-gray-300 cursor-pointer hover:border-red-500 group">
                                                {avatarPreview ? (
                                                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover rounded-full" />
                                                ) : (
                                                    <UserCircleIcon className="w-20 h-20 text-gray-400" />
                                                )}
                                                 <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-semibold">Change</span>
                                                </div>
                                            </div>
                                            <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept="image/*"/>
                                        </div>

                                        {/* Right Column: Text Details */}
                                        <div className="md:col-span-2 space-y-6">
                                            <FloatingLabelInput id="authorName" label="Author's Name" value={formData.authorName} onChange={(e) => setFormData({...formData, authorName: e.target.value})} />
                                            <FloatingLabelInput id="authorTitle" label="Author's Title / Company" value={formData.authorTitle} onChange={(e) => setFormData({...formData, authorTitle: e.target.value})} />
                                            <div className="grid grid-cols-2 gap-6">
                                                 <div>
                                                    <label htmlFor="rating" className="text-sm font-medium text-gray-700">Rating</label>
                                                    <select id="rating" name="rating" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} className="mt-1 w-full rounded-md border-gray-300" required>
                                                        <option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option><option value={2}>2 Stars</option><option value={1}>1 Star</option>
                                                    </select>
                                                </div>
                                                 <div>
                                                    <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                                                    <select id="status" name="status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="mt-1 w-full rounded-md border-gray-300" required>
                                                        <option>Published</option><option>Draft</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Full Width Quote */}
                                        <div className="md:col-span-3">
                                             <FloatingLabelTextarea id="quote" label="Client's Quote" value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} rows={5} />
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold">Save Testimonial</button>
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

export default TestimonialEditor;