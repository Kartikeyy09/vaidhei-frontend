// ✅ FILE: src/admin/components/tenders/TenderEditor.jsx (REDESIGNED & CLEANED)

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

// Reusable Input/Textarea Components
const FloatingLabelInput = ({ id, label, ...props }) => (
    <div className="relative">
        <input id={id} name={id} required className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " {...props} />
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);

const FloatingLabelTextarea = ({ id, label, ...props }) => (
    <div className="relative">
        <textarea id={id} name={id} required className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600" placeholder=" " rows="3" {...props}></textarea>
        <label htmlFor={id} className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600">{label}</label>
    </div>
);

const TenderEditor = ({ isOpen, onClose, onSave, tender, isSaving }) => {
    const initialState = {
        title: '', tenderId: '', client: '', status: 'Active', dueDate: '',
        description: '', sector: 'Railway', features: ''
    };
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (isOpen) {
            if (tender) { // Edit Mode
                setFormData({
                    title: tender.title || '',
                    tenderId: tender.tenderId || '',
                    client: tender.client || '',
                    status: tender.status || 'Active', 
                    dueDate: tender.dueDate ? new Date(tender.dueDate).toISOString().split('T')[0] : '',
                    description: tender.description || '',
                    sector: tender.sector || 'Railway',
                    features: Array.isArray(tender.features) ? tender.features.join(', ') : '',
                });
            } else { // Add New Mode
                setFormData(initialState);
            }
        }
    }, [tender, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = new FormData();
        
        dataToSave.append('title', formData.title);
        dataToSave.append('tenderId', formData.tenderId);
        dataToSave.append('client', formData.client);
        dataToSave.append('status', formData.status);
        dataToSave.append('dueDate', formData.dueDate);
        dataToSave.append('description', formData.description);
        dataToSave.append('sector', formData.sector);
        // Frontend se comma-separated string bhej rahe hain, jise backend handle karega
        dataToSave.append('features', formData.features);
        
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
                                
                                {/* ✅ SCROLLER HIDE KARNE KA TRICK: Tailwind arbitrary variants ka istemal karke */}
                                <form 
                                  onSubmit={handleSubmit} 
                                  className="mt-6 space-y-6 max-h-[75vh] overflow-y-auto pr-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    <FloatingLabelInput id="title" name="title" label="Tender Title" value={formData.title} onChange={handleChange} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingLabelInput id="tenderId" name="tenderId" label="Tender ID (e.g., IR-2023-...)" value={formData.tenderId} onChange={handleChange} />
                                        <FloatingLabelInput id="client" name="client" label="Client (e.g., Indian Railways)" value={formData.client} onChange={handleChange} />
                                    </div>
                                    
                                    <FloatingLabelTextarea id="description" name="description" label="Tender Description" value={formData.description} onChange={handleChange} />
                                    
                                    {/* ✅ REDESIGNED SELECT */}
                                    <div>
                                        <label htmlFor="sector" className="block text-sm font-medium text-slate-700 mb-1">Sector</label>
                                        <select id="sector" name="sector" value={formData.sector} onChange={handleChange} className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white px-3 py-2.5" required>
                                            <option>Railway</option><option>Municipal</option><option>Government</option><option>Transport</option><option>Other</option>
                                        </select>
                                    </div>

                                    <FloatingLabelTextarea id="features" name="features" label="Key Features (comma-separated)" placeholder="e.g., High-resolution displays, Dynamic content" value={formData.features} onChange={handleChange} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* ✅ REDESIGNED DATE INPUT */}
                                        <div>
                                            <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                                            <input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white px-3 py-2.5" required />
                                        </div>
                                        {/* ✅ REDESIGNED STATUS SELECT */}
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                            <select id="status" name="status" value={formData.status} onChange={handleChange} className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white px-3 py-2.5" required>
                                                <option>Active</option><option>Submitted</option><option>Awarded</option><option>Closed</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold" disabled={isSaving}>Cancel</button>
                                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Tender'}</button>
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