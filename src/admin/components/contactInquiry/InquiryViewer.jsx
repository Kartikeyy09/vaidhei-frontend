// src/admin/components/InquiryViewer.jsx

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
    XMarkIcon, 
    UserIcon, 
    EnvelopeIcon, 
    CalendarDaysIcon, 
    ArrowUturnLeftIcon,
    TrashIcon
} from '@heroicons/react/24/solid';

const formatDate = (dateString) => new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(dateString));

const InquiryViewer = ({ isOpen, onClose, inquiry, setInquiries, handleDelete }) => {
    if (!inquiry) return null;

    const handleMarkAsUnread = () => {
        setInquiries(prev => prev.map(i => i.id === inquiry.id ? { ...i, status: 'New' } : i));
        onClose();
    };
    
    const onDeleteClick = () => {
        handleDelete(inquiry);
        onClose();
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* --- KEY CHANGE: Refined Easing and Duration --- */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            {/* --- KEY CHANGE: Add opacity for a smooth fade-in during the slide --- */}
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-out duration-500"
                                enterFrom="translate-x-full opacity-0"
                                enterTo="translate-x-0 opacity-100"
                                leave="transform transition ease-in duration-300"
                                leaveFrom="translate-x-0 opacity-100"
                                leaveTo="translate-x-full opacity-0"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        {/* Header */}
                                        <div className="bg-slate-50 p-6 border-b border-gray-200">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <Dialog.Title className="text-2xl font-bold text-slate-900">{inquiry.subject}</Dialog.Title>
                                                    <p className="text-sm text-slate-500 mt-1">from {inquiry.name}</p>
                                                </div>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button type="button" className="rounded-md text-gray-400 hover:text-gray-600" onClick={onClose}>
                                                        <XMarkIcon className="h-6 w-6" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Main Content (Scrollable) */}
                                        <div className="relative flex-1 overflow-y-auto p-6 space-y-6">
                                            {/* Sender Details Card */}
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Sender Details</h3>
                                                <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                                    <div className="flex items-center gap-4">
                                                        <img src={`https://ui-avatars.com/api/?name=${inquiry.name.replace(' ', '+')}&background=random`} alt="" className="w-12 h-12 rounded-full" />
                                                        <div>
                                                            <p className="font-bold text-slate-800">{inquiry.name}</p>
                                                            <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">{inquiry.email}</a>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 pt-3 border-t">
                                                        <CalendarDaysIcon className="w-5 h-5 text-gray-400 flex-shrink-0"/>
                                                        <span className="text-sm text-slate-600">{formatDate(inquiry.receivedAt)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Full Message Card */}
                                            <div>
                                                 <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Message</h3>
                                                 <div className="mt-3 bg-slate-50 border border-gray-200 rounded-lg p-4">
                                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                                                 </div>
                                            </div>
                                        </div>
                                        
                                        {/* Action Footer */}
                                        <div className="flex flex-shrink-0 justify-between items-center border-t border-gray-200 p-4">
                                            <button onClick={onDeleteClick} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 rounded-md hover:bg-red-50">
                                                <TrashIcon className="w-4 h-4" /> Delete
                                            </button>
                                            <div className="flex gap-4">
                                                <button onClick={handleMarkAsUnread} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">
                                                    Mark as Unread
                                                </button>
                                                <a href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
                                                    <EnvelopeIcon className="w-5 h-5"/> Reply
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default InquiryViewer;