// src/admin/pages/ManageTestimonials.jsx

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import TestimonialEditor from "../components/Testimonials/TestimonialEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


// --- MOCK DATA (This will come from your backend API) ---
const initialTestimonialsData = [
    { id: 1, authorName: "Rohan Sharma", authorTitle: "Project Manager, ABC Corp", quote: "Vaidehi Enterprises delivered our project ahead of schedule and with exceptional quality. Their professionalism is unmatched.", rating: 5, status: "Published", avatarUrl: "https://..."},
    { id: 2, authorName: "Priya Desai", authorTitle: "Director, BuildWell Infra", quote: "Navigating the tender process was seamless with their expert team. Highly recommended for any large-scale public project.", rating: 5, status: "Published", avatarUrl: "https://..."},
    { id: 3, authorName: "Amit Patel", authorTitle: "Municipal Engineer", quote: "A reliable and trustworthy partner for all municipal infrastructure needs.", rating: 4, status: "Draft", avatarUrl: "https://..."},
];

// Reusable component for visual star ratings
const StarRating = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            i < rating 
                ? <StarIcon key={i} className="w-5 h-5 text-yellow-400" /> 
                : <StarIconOutline key={i} className="w-5 h-5 text-gray-300" />
        ))}
    </div>
);

// Reusable component for status badges
const StatusBadge = ({ status }) => (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {status}
    </span>
);

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    useEffect(() => { setTestimonials(initialTestimonialsData); }, []);

    const handleAddNew = () => { setSelectedTestimonial(null); setIsEditorOpen(true); };
    const handleEdit = (testimonial) => { setSelectedTestimonial(testimonial); setIsEditorOpen(true); };
    const handleDeleteClick = (testimonial) => { setSelectedTestimonial(testimonial); setIsDeleteModalOpen(true); };

    const confirmDelete = () => {
        if (selectedTestimonial) {
            setTestimonials(testimonials.filter(t => t.id !== selectedTestimonial.id));
            setIsDeleteModalOpen(false);
            setSelectedTestimonial(null);
        }
    };

    const handleSave = (testimonialData) => {
        if (selectedTestimonial) {
            setTestimonials(testimonials.map(t => t.id === selectedTestimonial.id ? { ...t, ...testimonialData } : t));
        } else {
            setTestimonials([...testimonials, { ...testimonialData, id: Date.now() }]);
        }
        setIsEditorOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Testimonials</h1>
                    <p className="text-slate-500 mt-1">Curate and display client feedback.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Testimonial
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Author</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Quote Snippet</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Rating</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map(testimonial => (
                            <tr key={testimonial.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <img src={testimonial.avatarUrl || `https://ui-avatars.com/api/?name=${testimonial.authorName}`} alt={testimonial.authorName} className="w-10 h-10 object-cover rounded-full" />
                                        <div>
                                            <p className="font-semibold text-slate-800">{testimonial.authorName}</p>
                                            <p className="text-xs text-slate-500">{testimonial.authorTitle}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600 hidden lg:table-cell italic">"{testimonial.quote.slice(0, 70)}..."</td>
                                <td className="p-4"><StarRating rating={testimonial.rating} /></td>
                                <td className="p-4"><StatusBadge status={testimonial.status} /></td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(testimonial)} className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-100"><PencilIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleDeleteClick(testimonial)} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100"><TrashIcon className="w-5 h-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <TestimonialEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} testimonial={selectedTestimonial} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={`testimonial from ${selectedTestimonial?.authorName}`} />
        </div>
    );
};

export default ManageTestimonials;