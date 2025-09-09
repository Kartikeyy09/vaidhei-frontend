import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, StarIcon, InboxIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonialsAsync, selectManageTestimonials, addTestimonialAsync, updateTestimonialAsync, deleteTestimonialAsync } from "../../features/adminSlice/ManageTestimonials/ManageTestimonialsSlice";
import TestimonialEditor from "../components/Testimonials/TestimonialEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

// --- SKELETON LOADER COMPONENT ---
// This component renders a skeleton version of the table body while data is loading.
const TestimonialTableSkeleton = () => (
    <tbody className="animate-pulse">
        {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-b border-slate-200">
                <td className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex-shrink-0"></div>
                        <div>
                            <div className="h-5 w-32 bg-slate-200 rounded-md"></div>
                            <div className="h-3 w-40 bg-slate-200 rounded-md mt-2"></div>
                        </div>
                    </div>
                </td>
                <td className="p-4 hidden lg:table-cell">
                    <div className="h-4 w-full bg-slate-200 rounded-md"></div>
                </td>
                <td className="p-4">
                    <div className="flex">
                        {[...Array(5)].map((_, j) => (
                            <div key={j} className="w-5 h-5 bg-slate-200 rounded-sm mr-0.5"></div>
                        ))}
                    </div>
                </td>
                <td className="p-4">
                    <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                </td>
                <td className="p-4">
                    <div className="flex gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
);

const StarRating = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            i < rating 
                ? <StarIcon key={i} className="w-5 h-5 text-yellow-400" /> 
                : <StarIconOutline key={i} className="w-5 h-5 text-gray-300" />
        ))}
    </div>
);

const StatusBadge = ({ status }) => (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {status}
    </span>
);

const ManageTestimonials = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    const SERVER_URL = import.meta.env.VITE_BASE_URL;

    const dispatch = useDispatch();
    const { data: testimonials, loading, error } = useSelector(selectManageTestimonials);

    useEffect(() => { 
        if (testimonials.length === 0) {
            dispatch(fetchTestimonialsAsync()); 
        }
    }, [dispatch, testimonials.length]);

    const handleAddNew = () => { setSelectedTestimonial(null); setIsEditorOpen(true); };
    const handleEdit = (testimonial) => { setSelectedTestimonial(testimonial); setIsEditorOpen(true); };
    const handleDeleteClick = (testimonial) => { setSelectedTestimonial(testimonial); setIsDeleteModalOpen(true); };

    const confirmDelete = () => {
        if (selectedTestimonial) {
            dispatch(deleteTestimonialAsync(selectedTestimonial._id))
                .unwrap()
                .then(() => {
                    setIsDeleteModalOpen(false);
                    setSelectedTestimonial(null);
                })
                .catch(err => console.error("Failed to delete testimonial:", err));
        }
    };

    const handleSave = (testimonialData) => {
        const action = selectedTestimonial
            ? updateTestimonialAsync({ id: selectedTestimonial._id, updatedData: testimonialData })
            : addTestimonialAsync(testimonialData);
        dispatch(action)
            .unwrap()
            .then(() => setIsEditorOpen(false))
            .catch(err => console.error("Failed to save testimonial:", err));
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

            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-4">Error: {error}</p>}

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Author</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Content Snippet</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Rating</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    
                    {loading && testimonials.length === 0 ? (
                        <TestimonialTableSkeleton />
                    ) : testimonials.length > 0 ? (
                        <tbody>
                            {testimonials.map(testimonial => (
                                <tr key={testimonial._id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={testimonial.avatar 
                                                    ? `${SERVER_URL}${testimonial.avatar}` 
                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}`} 
                                                alt={testimonial.name} 
                                                className="w-10 h-10 object-cover rounded-full bg-gray-200" 
                                            />
                                            <div>
                                                <p className="font-semibold text-slate-800">{testimonial.name}</p>
                                                <p className="text-xs text-slate-500">{`${testimonial.position}, ${testimonial.company}`}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600 hidden lg:table-cell italic">"{testimonial.content.slice(0, 70)}..."</td>
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
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="5">
                                    <div className="text-center py-20 px-6">
                                        <InboxIcon className="mx-auto h-16 w-16 text-slate-400" />
                                        <h3 className="mt-4 text-xl font-semibold text-slate-700">No Testimonials Yet</h3>
                                        <p className="mt-2 text-base text-slate-500">
                                            Click "Add New Testimonial" to feature your first client feedback.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            
            <TestimonialEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} testimonial={selectedTestimonial} isSaving={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={`testimonial from ${selectedTestimonial?.name}`} isDeleting={loading} />
        </div>
    );
};

export default ManageTestimonials;