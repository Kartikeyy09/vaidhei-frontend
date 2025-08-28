// src/admin/components/TenderEditor.jsx

import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, DocumentTextIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';

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


const TenderEditor = ({ isOpen, onClose, onSave, tender }) => {
    const [formData, setFormData] = useState({ title: '', tenderId: '', client: '', status: 'Active', dueDate: '', description: '' });
    const [documentFile, setDocumentFile] = useState(null);
    const [documentUrl, setDocumentUrl] = useState(''); // To hold existing URL
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (tender) {
                setFormData({
                    title: tender.title || '', tenderId: tender.tenderId || '', client: tender.client || '',
                    status: tender.status || 'Active', 
                    dueDate: tender.dueDate ? new Date(tender.dueDate).toISOString().split('T')[0] : '',
                    description: tender.description || ''
                });
                setDocumentUrl(tender.documentUrl || '');
            } else {
                setFormData({ title: '', tenderId: '', client: '', status: 'Active', dueDate: '', description: '' });
                setDocumentUrl('');
                setDocumentFile(null);
            }
        }
    }, [tender, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocumentFile(file);
            setDocumentUrl(''); // Clear existing URL if a new file is chosen
        }
    };
    
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = { ...formData, documentUrl, documentFile };
        onSave(dataToSave);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-40" /></Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-slate-900">{tender ? 'Edit Tender' : 'Add New Tender'}</Dialog.Title>
                                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                                
                                <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-h-[75vh] overflow-y-auto pr-4">
                                    <FloatingLabelInput id="title" label="Tender Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingLabelInput id="tenderId" label="Tender ID (e.g., IR-2023-...)" value={formData.tenderId} onChange={(e) => setFormData({...formData, tenderId: e.target.value})} />
                                        <FloatingLabelInput id="client" label="Client (e.g., Indian Railways)" value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">Due Date</label>
                                            <input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="mt-1 w-full rounded-md border-gray-300" required />
                                        </div>
                                        <div>
                                            <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                                            <select id="status" name="status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="mt-1 w-full rounded-md border-gray-300" required>
                                                <option>Active</option><option>Submitted</option><option>Awarded</option><option>Closed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Tender Document (PDF)</label>
                                        <div className="mt-2 flex items-center gap-4">
                                            <div className="flex-grow">
                                                {documentFile ? (
                                                     <div className="flex items-center gap-3 rounded-lg border border-gray-300 p-2">
                                                        <DocumentTextIcon className="h-6 w-6 text-red-500 flex-shrink-0"/>
                                                        <div className="text-sm">
                                                            <p className="font-semibold text-slate-700 truncate">{documentFile.name}</p>
                                                            <p className="text-slate-500">{formatFileSize(documentFile.size)}</p>
                                                        </div>
                                                     </div>
                                                ) : documentUrl ? (
                                                    <div className="text-sm p-2">Existing document linked. Upload a new file to replace it.</div>
                                                ) : (
                                                    <div className="text-sm p-2 text-gray-500">No document uploaded.</div>
                                                )}
                                            </div>
                                            <button type="button" onClick={() => fileInputRef.current.click()} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">
                                                <ArrowUpTrayIcon className="w-4 h-4" /> Upload
                                            </button>
                                        </div>
                                        <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx"/>
                                    </div>
                                    <FloatingLabelTextarea id="description" label="Brief Description (optional)" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                                    
                                    <div className="pt-4 flex justify-end gap-4 sticky bottom-0 bg-white/80 backdrop-blur-sm -mx-8 px-8 pb-1">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold">Save Tender</button>
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

export default TenderEditor;