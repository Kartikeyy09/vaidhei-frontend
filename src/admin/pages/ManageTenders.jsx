import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, InboxIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchTendersAsync, selectManageTenders, addTenderAsync, updateTenderAsync, deleteTenderAsync } from "../../features/adminSlice/ManageTenders/ManageTendersSlice";
import TenderEditor from "../components/tenders/TenderEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import toast from "react-hot-toast";

// --- SKELETON LOADER COMPONENT ---
// This component renders a skeleton version of the table body.
const TenderTableSkeleton = () => (
    <tbody className="animate-pulse">
        {[...Array(8)].map((_, i) => (
            <tr key={i} className="border-b border-slate-200">
                <td className="p-4">
                    <div className="h-5 w-3/4 bg-slate-200 rounded-md"></div>
                    <div className="h-3 w-1/3 bg-slate-200 rounded-md mt-2"></div>
                </td>
                <td className="p-4 hidden md:table-cell"><div className="h-4 w-2/3 bg-slate-200 rounded-md"></div></td>
                <td className="p-4 hidden lg:table-cell"><div className="h-4 w-1/2 bg-slate-200 rounded-md"></div></td>
                <td className="p-4 hidden lg:table-cell"><div className="h-4 w-3/4 bg-slate-200 rounded-md"></div></td>
                <td className="p-4"><div className="h-6 w-20 bg-slate-200 rounded-full"></div></td>
                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
);

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

    useEffect(() => { 
        if (tenders.length === 0) {
            dispatch(fetchTendersAsync()); 
        }
    }, [dispatch, tenders.length]);

    const handleAddNew = () => { setSelectedTender(null); setIsEditorOpen(true); };
    const handleEdit = (tender) => { setSelectedTender(tender); setIsEditorOpen(true); };
    const handleDeleteClick = (tender) => { setSelectedTender(tender); setIsDeleteModalOpen(true); };

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

                    {loading && tenders.length === 0 ? (
                        <TenderTableSkeleton />
                    ) : tenders.length > 0 ? (
                        <tbody>
                            {tenders.map(tender => (
                                <tr key={tender._id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
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
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center py-20 px-6">
                                    <InboxIcon className="mx-auto h-16 w-16 text-slate-400" />
                                    <h3 className="mt-4 text-xl font-semibold text-slate-700">No Tenders Found</h3>
                                    <p className="mt-2 text-base text-slate-500">
                                        Click "Add New Tender" to start tracking opportunities.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            
            <TenderEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} tender={selectedTender} isSaving={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedTender?.title} isDeleting={loading} />
        </div>
    );
};

export default ManageTenders;