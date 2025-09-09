import { useState, useEffect, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/solid';

// Reusable Input Components
const FloatingLabelInput = ({ id, label, ...props }) => (
    <div className="relative">
        <input
            id={id}
            name={id}
            type="text"
            required
            className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600"
            placeholder=" "
            {...props}
        />
        <label
            htmlFor={id}
            className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600"
        >
            {label}
        </label>
    </div>
);

const FloatingLabelTextarea = ({ id, label, rows = 3, ...props }) => (
    <div className="relative">
        <textarea
            id={id}
            name={id}
            rows={rows}
            className="block w-full px-4 py-3 pt-6 text-slate-800 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-red-600"
            placeholder=" "
            {...props}
        />
        <label
            htmlFor={id}
            className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-600"
        >
            {label}
        </label>
    </div>
);

const TestimonialEditor = ({ isOpen, onClose, onSave, testimonial, isSaving }) => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        status: 'Published',
        color: 'indigo-600',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    const SERVER_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (isOpen) {
            if (testimonial) {
                // Edit Mode
                setFormData({
                    name: testimonial.name || '',
                    position: testimonial.position || '',
                    company: testimonial.company || '',
                    content: testimonial.content || '',
                    rating: testimonial.rating || 5,
                    status: testimonial.status || 'Published',
                    color: testimonial.color || 'indigo-600',
                });

                // Backend से आने वाला avatar URL ठीक करना
                if (testimonial.avatar) {
                    const fullUrl = testimonial.avatar.startsWith('http')
                        ? testimonial.avatar
                        : `${SERVER_URL}/${testimonial.avatar}`;
                    setAvatarPreview(fullUrl);
                } else {
                    setAvatarPreview(null);
                }

                setAvatarFile(null);
            } else {
                // Add Mode
                setFormData({
                    name: '',
                    position: '',
                    company: '',
                    content: '',
                    rating: 5,
                    status: 'Published',
                    color: 'indigo-600',
                });
                setAvatarPreview(null);
                setAvatarFile(null);
            }
        }
    }, [testimonial, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            if (avatarPreview && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = new FormData();
        dataToSave.append('name', formData.name);
        dataToSave.append('position', formData.position);
        dataToSave.append('company', formData.company);
        dataToSave.append('content', formData.content);
        dataToSave.append('rating', Number(formData.rating));
        dataToSave.append('status', formData.status);
        dataToSave.append('color', formData.color);

        if (avatarFile) {
            dataToSave.append('avatar', avatarFile);
        }
        onSave(dataToSave);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-bold leading-6 text-slate-900"
                                >
                                    {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                                </Dialog.Title>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>

                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                        {/* Avatar Uploader */}
                                        <div className="md:col-span-1 flex flex-col items-center">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Author's Photo
                                            </label>
                                            <div
                                                onClick={() => fileInputRef.current.click()}
                                                className="relative w-32 h-32 rounded-full flex items-center justify-center bg-slate-100 border-2 border-dashed border-gray-300 cursor-pointer hover:border-red-500 group"
                                            >
                                                {avatarPreview ? (
                                                    <img
                                                        key={avatarPreview}
                                                        src={avatarPreview}
                                                        alt="Avatar Preview"
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                ) : (
                                                    <UserCircleIcon className="w-20 h-20 text-gray-400" />
                                                )}
                                                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-semibold">
                                                        Change
                                                    </span>
                                                </div>
                                            </div>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </div>

                                        {/* Text Details */}
                                        <div className="md:col-span-2 space-y-6">
                                            <FloatingLabelInput
                                                id="name"
                                                name="name"
                                                label="Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            <FloatingLabelInput
                                                id="position"
                                                name="position"
                                                label="Position (e.g., Brand Manager)"
                                                value={formData.position}
                                                onChange={handleChange}
                                            />
                                            <FloatingLabelInput
                                                id="company"
                                                name="company"
                                                label="Company"
                                                value={formData.company}
                                                onChange={handleChange}
                                            />

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label
                                                        htmlFor="rating"
                                                        className="text-sm font-medium text-gray-700"
                                                    >
                                                        Rating
                                                    </label>
                                                    <select
                                                        id="rating"
                                                        name="rating"
                                                        value={formData.rating}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                                        required
                                                    >
                                                        <option value={5}>5 Stars</option>
                                                        <option value={4}>4 Stars</option>
                                                        <option value={3}>3 Stars</option>
                                                        <option value={2}>2 Stars</option>
                                                        <option value={1}>1 Star</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="status"
                                                        className="text-sm font-medium text-gray-700"
                                                    >
                                                        Status
                                                    </label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                                        required
                                                    >
                                                        <option>Published</option>
                                                        <option>Draft</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <FloatingLabelInput
                                                id="color"
                                                name="color"
                                                label="Color (e.g., orange-500)"
                                                value={formData.color}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Content/Quote */}
                                        <div className="md:col-span-3">
                                            <FloatingLabelTextarea
                                                id="content"
                                                name="content"
                                                label="Client's Content"
                                                value={formData.content}
                                                onChange={handleChange}
                                                rows={5}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold"
                                            disabled={isSaving}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50"
                                            disabled={isSaving}
                                        >
                                            {isSaving ? 'Saving...' : 'Save Testimonial'}
                                        </button>
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