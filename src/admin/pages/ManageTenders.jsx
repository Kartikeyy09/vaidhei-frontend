// ✅ FILE: src/admin/pages/ManageTenders.jsx (COMPLETE AND FINAL)

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchTendersAsync, selectManageTenders, addTenderAsync, updateTenderAsync, deleteTenderAsync } from "../../features/adminSlice/ManageTenders/ManageTendersSlice";
import TenderEditor from "../components/tenders/TenderEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import toast from "react-hot-toast";

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
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
    });
};

const ManageTenders = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTender, setSelectedTender] = useState(null);

    const dispatch = useDispatch();
    const { data: tenders, loading, error } = useSelector(selectManageTenders);

    useEffect(() => { dispatch(fetchTendersAsync()); }, [dispatch]);

    const handleAddNew = () => { setSelectedTender(null); setIsEditorOpen(true); };
    const handleEdit = (tender) => { setSelectedTender(tender); setIsEditorOpen(true); };
    const handleDeleteClick = (tender) => { setSelectedTender(tender); setIsDeleteModalOpen(true); };

    const SERVER_URL = "https://vaidhei-backend.onrender.com";

    const confirmDelete = () => {
        if (selectedTender) {
            dispatch(deleteTenderAsync(selectedTender._id))
                .unwrap()
                .then(() => {
                    toast.success("Tender deleted successfully!");
                    setIsDeleteModalOpen(false);
                    setSelectedTender(null);
                })
                .catch(err => toast.error(err || "Failed to delete tender."));
        }
    };

    const handleSave = (tenderData) => {
        const action = selectedTender
            ? updateTenderAsync({ id: selectedTender._id, updatedData: tenderData })
            : addTenderAsync(tenderData);
            
        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success(`Tender ${selectedTender ? 'updated' : 'added'} successfully!`);
                setIsEditorOpen(false);
            })
            .catch(err => toast.error(err || "Failed to save tender."));
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

            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-4">Error: {error}</p>}

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Tender Title</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Client</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Sector</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Due Date</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && tenders.length === 0 ? (
                            <tr><td colSpan="6" className="text-center p-8 text-gray-500">Loading tenders...</td></tr>
                        ) : tenders.length === 0 ? (
                            <tr><td colSpan="6" className="text-center p-8 text-gray-500">No tenders found. Add one to get started!</td></tr>
                        ) : tenders.map(tender => (
                            <tr key={tender._id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-4">
                                    <p className="font-semibold text-slate-800">{tender.title}</p>
                                    <p className="text-xs text-slate-500 font-mono">{tender.tenderId}</p>
                                </td>
                                <td className="p-4 text-slate-600 hidden md:table-cell">{tender.client}</td>
                                <td className="p-4 text-slate-600 hidden lg:table-cell">{tender.sector}</td>
                                <td className="p-4 text-slate-600 hidden lg:table-cell">{formatDate(tender.dueDate)}</td>
                                <td className="p-4"><StatusBadge status={tender.status} /></td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1">
                                        {tender.documentUrl && (
                                            <a href={`${SERVER_URL}${tender.documentUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-gray-800 rounded-full hover:bg-gray-100" title="View Document">
                                                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                            </a>
                                        )}
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
            
            <TenderEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} tender={selectedTender} isSaving={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedTender?.title} isDeleting={loading} />
        </div>
    );
};

export default ManageTenders;