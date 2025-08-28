// src/admin/pages/ManageInquiries.jsx

import { useState, useEffect } from "react";
import { TrashIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import InquiryViewer from "../components/contactInquiry/InquiryViewer";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


// --- MOCK DATA (This will come from your backend API) ---
const initialInquiriesData = [
    { id: 1, name: "Rohan Sharma", email: "rohan.s@example.com", subject: "Quote for Railway Tender", message: "Hello, we are interested in submitting a bid for the upcoming Northern Railway tender. Could you please provide us with more details about your bidding assistance services?", receivedAt: "2023-10-26T10:30:00Z", status: "New"},
    { id: 2, name: "Priya Desai", email: "priya.d@buildwell.com", subject: "Partnership Opportunity", message: "We are a leading construction firm and would like to explore a potential partnership with Vaidehi Enterprises for upcoming municipal projects in the Mumbai region.", receivedAt: "2023-10-26T09:15:00Z", status: "New"},
    { id: 3, name: "Amit Patel", email: "amit.patel@gov.in", subject: "Service Question", message: "Can you clarify the scope of your end-to-end project management services? We are looking for a comprehensive solution.", receivedAt: "2023-10-25T14:00:00Z", status: "Read"},
    { id: 4, name: "Sunita Rao", email: "sunita.rao@consultants.com", subject: "Previous Project Follow-up", message: "Following up on our discussion regarding the Delhi Metro Phase 4 project. Please let me know when you are available for a call.", receivedAt: "2023-10-24T11:45:00Z", status: "Read"},
];

const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
        {status === 'New' && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>}
        {status}
    </span>
);

const formatDate = (dateString) => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateString));

const ManageInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    useEffect(() => { setInquiries(initialInquiriesData); }, []);

    const handleView = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsViewerOpen(true);
        // Mark as read when viewed
        setInquiries(inquiries.map(i => i.id === inquiry.id ? { ...i, status: 'Read' } : i));
    };

    const handleDeleteClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedInquiry) {
            setInquiries(inquiries.filter(i => i.id !== selectedInquiry.id));
            setIsDeleteModalOpen(false);
            setSelectedInquiry(null);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Contact Inquiries</h1>
                <p className="text-slate-500 mt-1">Review and respond to messages from your website.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">From</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Subject</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Received</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map(inquiry => (
                            <tr key={inquiry.id} className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer" onClick={() => handleView(inquiry)}>
                                <td className="p-4">
                                    <p className="font-semibold text-slate-800">{inquiry.name}</p>
                                    <p className="text-xs text-slate-500">{inquiry.email}</p>
                                </td>
                                <td className="p-4 text-slate-600">{inquiry.subject}</td>
                                <td className="p-4 text-slate-500 hidden md:table-cell">{formatDate(inquiry.receivedAt)}</td>
                                <td className="p-4"><StatusBadge status={inquiry.status} /></td>
                                <td className="p-4">
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(inquiry); }} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <InquiryViewer isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} inquiry={selectedInquiry} setInquiries={setInquiries} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={`inquiry from ${selectedInquiry?.name}`} />
        </div>
    );
};

export default ManageInquiries;