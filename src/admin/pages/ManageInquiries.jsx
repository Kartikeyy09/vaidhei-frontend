import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchInquiriesAsync, selectManageInquiries, fetchInquiryByIdAsync, deleteInquiryAsync, clearSelectedInquiry } from "../../features/adminSlice/ManageInquiries/ManageInquiriesSlice";
import InquiryViewer from "../components/contactInquiry/InquiryViewer";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

// --- SKELETON LOADER COMPONENT ---
// This component mimics the table structure while data is loading.
const TableSkeleton = () => (
    <div className="overflow-x-auto animate-pulse">
        <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="p-4"><div className="h-4 w-20 bg-slate-200 rounded-md"></div></th>
                    <th className="p-4"><div className="h-4 w-24 bg-slate-200 rounded-md"></div></th>
                    <th className="p-4"><div className="h-4 w-24 bg-slate-200 rounded-md"></div></th>
                    <th className="p-4"><div className="h-4 w-32 bg-slate-200 rounded-md"></div></th>
                    <th className="p-4 hidden md:table-cell"><div className="h-4 w-40 bg-slate-200 rounded-md"></div></th>
                    <th className="p-4"><div className="h-4 w-16 bg-slate-200 rounded-md"></div></th>
                    <th className="p-4"></th>
                </tr>
            </thead>
            <tbody>
                {[...Array(8)].map((_, i) => (
                    <tr key={i} className="border-b border-slate-200">
                        <td className="p-4">
                            <div className="h-5 w-3/4 bg-slate-200 rounded-md"></div>
                            <div className="h-3 w-1/2 bg-slate-200 rounded-md mt-2"></div>
                        </td>
                        <td className="p-4"><div className="h-4 w-2/3 bg-slate-200 rounded-md"></div></td>
                        <td className="p-4"><div className="h-4 w-3/4 bg-slate-200 rounded-md"></div></td>
                        <td className="p-4"><div className="h-4 w-5/6 bg-slate-200 rounded-md"></div></td>
                        <td className="p-4 hidden md:table-cell"><div className="h-4 w-full bg-slate-200 rounded-md"></div></td>
                        <td className="p-4"><div className="h-6 w-16 bg-slate-200 rounded-full"></div></td>
                        <td className="p-4 text-right"><div className="w-8 h-8 bg-slate-200 rounded-full"></div></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


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
    
    const isViewerOpen = !!selectedInquiry;

    useEffect(() => {
        // Fetch inquiries only if the list is empty to prevent re-fetching
        if (inquiries.length === 0) {
            dispatch(fetchInquiriesAsync());
        }
    }, [dispatch, inquiries.length]);

    const handleView = (inquiry) => {
        dispatch(fetchInquiryByIdAsync(inquiry._id));
    };

    const handleCloseViewer = () => {
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

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {loading && inquiries.length === 0 ? (
                    <TableSkeleton />
                ) : inquiries.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-slate-600">From</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Number</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Company</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Subject</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Received</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map(inquiry => (
                                    <tr key={inquiry._id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50 cursor-pointer" onClick={() => handleView(inquiry)}>
                                        <td className="p-4 align-top">
                                            <p className={`font-semibold text-slate-800 ${inquiry.status === 'New' ? 'font-bold' : ''}`}>{inquiry.name}</p>
                                            <p className="text-xs text-slate-500">{inquiry.email}</p>
                                        </td>
                                        <td className="p-4 align-top text-sm text-slate-600">{inquiry.phone}</td>
                                        <td className="p-4 align-top text-sm text-slate-600">{inquiry.company}</td>
                                        <td className="p-4 align-top text-slate-600">
                                            <span className={inquiry.status === 'New' ? 'font-bold text-slate-700' : ''}>{inquiry.subject}</span>
                                        </td>
                                        <td className="p-4 align-top text-slate-500 hidden md:table-cell">{formatDate(inquiry.createdAt)}</td>
                                        <td className="p-4 align-top"><StatusBadge status={inquiry.status} /></td>
                                        <td className="p-4 text-right align-top">
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
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold text-slate-700">Inbox Zero!</h3>
                        <p className="text-slate-500 mt-2">There are currently no inquiries to display.</p>
                    </div>
                )}
            </div>
            
            <InquiryViewer isOpen={isViewerOpen} onClose={handleCloseViewer} inquiry={selectedInquiry} isDeleting={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={`inquiry from ${inquiryToDelete?.name}`} isDeleting={loading} />
        </div>
    );
};

export default ManageInquiries;