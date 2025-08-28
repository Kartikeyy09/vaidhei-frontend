// src/admin/pages/ManageTenders.jsx

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import TenderEditor from "../components/tenders/TenderEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


// --- MOCK DATA (This will come from your backend API) ---
const initialTendersData = [
    { id: 1, tenderId: "IR-2023-08-451", title: "Northern Railway Track Renewal", client: "Indian Railways", dueDate: "2023-11-15", status: "Active", documentUrl: "#"},
    { id: 2, tenderId: "MNC-2023-09-012", title: "Mumbai Municipal Waste Management", client: "Mumbai Nagar Nigam", dueDate: "2023-10-30", status: "Awarded", documentUrl: "#"},
    { id: 3, tenderId: "DDA-2023-07-205", title: "DDA Park Landscaping", client: "Delhi Development Authority", dueDate: "2023-09-01", status: "Closed", documentUrl: "#"},
];

// Reusable component for status badges
const StatusBadge = ({ status }) => {
    const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        'Active': 'bg-blue-100 text-blue-800',
        'Awarded': 'bg-green-100 text-green-800',
        'Closed': 'bg-gray-100 text-gray-800',
        'Submitted': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

// Function to format dates nicely
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
    });
};

const ManageTenders = () => {
    const [tenders, setTenders] = useState([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTender, setSelectedTender] = useState(null);

    useEffect(() => { setTenders(initialTendersData); }, []);

    const handleAddNew = () => { setSelectedTender(null); setIsEditorOpen(true); };
    const handleEdit = (tender) => { setSelectedTender(tender); setIsEditorOpen(true); };
    const handleDeleteClick = (tender) => { setSelectedTender(tender); setIsDeleteModalOpen(true); };

    const confirmDelete = () => {
        if (selectedTender) {
            setTenders(tenders.filter(t => t.id !== selectedTender.id));
            setIsDeleteModalOpen(false);
            setSelectedTender(null);
        }
    };

    const handleSave = (tenderData) => {
        if (selectedTender) {
            setTenders(tenders.map(t => t.id === selectedTender.id ? { ...t, ...tenderData } : t));
        } else {
            setTenders([...tenders, { ...tenderData, id: Date.now() }]);
        }
        setIsEditorOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Tenders</h1>
                    <p className="text-slate-500 mt-1">Track and manage all bidding opportunities.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Tender
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Tender Title</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Client</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Due Date</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenders.map(tender => (
                            <tr key={tender.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-4">
                                    <p className="font-semibold text-slate-800">{tender.title}</p>
                                    <p className="text-xs text-slate-500 font-mono">{tender.tenderId}</p>
                                </td>
                                <td className="p-4 text-slate-600 hidden md:table-cell">{tender.client}</td>
                                <td className="p-4 text-slate-600 hidden lg:table-cell">{formatDate(tender.dueDate)}</td>
                                <td className="p-4"><StatusBadge status={tender.status} /></td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1">
                                        <a href={tender.documentUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-gray-800 rounded-full hover:bg-gray-100" title="View Document">
                                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                        </a>
                                        <button onClick={() => handleEdit(tender)} className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-100" title="Edit">
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(tender)} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100" title="Delete">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <TenderEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} tender={selectedTender} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedTender?.title} />
        </div>
    );
};

export default ManageTenders;