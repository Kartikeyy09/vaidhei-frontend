// ✅ FILE: src/admin/pages/ManageInquiries.jsx

import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchInquiriesAsync, selectManageInquiries, fetchInquiryByIdAsync, deleteInquiryAsync, clearSelectedInquiry } from "../../features/adminSlice/ManageInquiries/ManageInquiriesSlice";
import InquiryViewer from "../components/contactInquiry/InquiryViewer";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
        {status === 'New' && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>}
        {status}
    </span>
);

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateString));
};

const ManageInquiries = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [inquiryToDelete, setInquiryToDelete] = useState(null);

    const dispatch = useDispatch();
    const { data: inquiries, selectedInquiry, loading, error } = useSelector(selectManageInquiries);
    
    // Viewer is open if there is a selected inquiry in the Redux state
    const isViewerOpen = !!selectedInquiry;

    useEffect(() => {
        dispatch(fetchInquiriesAsync());
    }, [dispatch]);

    const handleView = (inquiry) => {
        // Fetch full details, which also marks it as 'Read' on the backend and updates the state
        dispatch(fetchInquiryByIdAsync(inquiry._id));
    };

    const handleCloseViewer = () => {
        // Clear the selected inquiry from the Redux state to close the viewer
        dispatch(clearSelectedInquiry());
    };

    const handleDeleteClick = (inquiry) => {
        setInquiryToDelete(inquiry);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (inquiryToDelete) {
            dispatch(deleteInquiryAsync(inquiryToDelete._id))
                .unwrap()
                .then(() => {
                    setIsDeleteModalOpen(false);
                    setInquiryToDelete(null);
                })
                .catch(err => console.error("Failed to delete inquiry:", err));
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Contact Inquiries</h1>
                <p className="text-slate-500 mt-1">Review and respond to messages from your website.</p>
            </div>

            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-4">Error: {error}</p>}

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">From</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Company</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Subject</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Received</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && inquiries.length === 0 ? (
                            <tr><td colSpan="5" className="text-center p-8 text-gray-500">Loading inquiries...</td></tr>
                        ) : inquiries.map(inquiry => (
                            <tr key={inquiry._id} className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer" onClick={() => handleView(inquiry)}>
                                <td className="p-4">
                                    <p className={`font-semibold text-slate-800 ${inquiry.status === 'New' ? 'font-bold' : ''}`}>{inquiry.name}</p>
                                    <p className="text-xs text-slate-500">{inquiry.email}</p>
                                </td>
                                <td className="p-4">
                                    <p className={`font-semibold text-slate-800 ${inquiry.status === 'New' ? 'font-bold' : ''}`}>{inquiry.company}</p>
                                    {/* <p className="text-xs text-slate-500">{inquiry.phone}</p> */}
                                </td>
                                <td className="p-4 text-slate-600">
                                    <span className={inquiry.status === 'New' ? 'font-bold text-slate-700' : ''}>{inquiry.subject}</span>
                                </td>
                                <td className="p-4 text-slate-500 hidden md:table-cell">{formatDate(inquiry.createdAt)}</td>
                                <td className="p-4"><StatusBadge status={inquiry.status} /></td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteClick(inquiry); }} 
                                        className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-100"
                                        title="Delete Inquiry"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <InquiryViewer isOpen={isViewerOpen} onClose={handleCloseViewer} inquiry={selectedInquiry} isDeleting={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={`inquiry from ${inquiryToDelete?.name}`} isDeleting={loading} />
        </div>
    );
};

export default ManageInquiries;