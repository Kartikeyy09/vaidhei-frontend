// src/admin/pages/ManageJourney.jsx

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import MilestoneEditor from "../components/journey/MilestoneEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


// --- MOCK DATA (This will come from your backend API) ---
const initialJourneyData = [
    { id: 1, year: "2008", title: "The Spark of an Idea", description: "Vaidehi Enterprises was founded on a simple yet powerful principle: to bring unparalleled integrity, quality, and reliability to India's public sector infrastructure projects.", outcomes: ["Established core company values.", "Built a foundational team of experts.", "Secured initial local municipal contracts."], imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, year: "2012", title: "Forging a Reputation", description: "Securing our first major tender with Indian Railways was a watershed moment. It tested our limits and proved our capability to deliver complex projects on time and on budget.", outcomes: ["Successfully entered the national railway sector.", "Expanded operational capacity by 200%."], imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, year: "2018", title: "Commitment to Excellence", description: "Achieving ISO 9001:2015 certification wasn't just a credential. It was the formalization of our obsession with quality.", outcomes: ["Achieved internationally recognized quality standard.", "Streamlined all internal operational processes."], imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" },
];

const ManageJourney = () => {
    const [milestones, setMilestones] = useState([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    useEffect(() => { setMilestones(initialJourneyData); }, []);

    const handleAddNew = () => { setSelectedMilestone(null); setIsEditorOpen(true); };
    const handleEdit = (milestone) => { setSelectedMilestone(milestone); setIsEditorOpen(true); };
    const handleDeleteClick = (milestone) => { setSelectedMilestone(milestone); setIsDeleteModalOpen(true); };

    const confirmDelete = () => {
        if (selectedMilestone) {
            setMilestones(milestones.filter(m => m.id !== selectedMilestone.id));
            setIsDeleteModalOpen(false);
            setSelectedMilestone(null);
        }
    };

    const handleSave = (milestoneData) => {
        if (selectedMilestone) {
            setMilestones(milestones.map(m => m.id === selectedMilestone.id ? { ...m, ...milestoneData } : m));
        } else {
            setMilestones([...milestones, { ...milestoneData, id: Date.now() }]);
        }
        setIsEditorOpen(false);
    };

    // --- NEW: Reordering Logic ---
    const handleMove = (index, direction) => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === milestones.length - 1) return;

        const newMilestones = [...milestones];
        const item = newMilestones.splice(index, 1)[0];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        newMilestones.splice(newIndex, 0, item);
        setMilestones(newMilestones);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Journey</h1>
                    <p className="text-slate-500 mt-1">Add, edit, reorder, or delete milestones from your company's history.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add Milestone
                </button>
            </div>

            <div className="space-y-6">
                {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="bg-white rounded-xl shadow-md p-6 flex gap-6 items-start relative">
                        {/* Reorder Controls */}
                        <div className="flex flex-col gap-2 items-center">
                            <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed">
                                <ArrowUpIcon className="w-5 h-5"/>
                            </button>
                            <span className="font-bold text-lg text-slate-700">{index + 1}</span>
                            <button onClick={() => handleMove(index, 'down')} disabled={index === milestones.length - 1} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed">
                                <ArrowDownIcon className="w-5 h-5"/>
                            </button>
                        </div>
                        
                        {/* Image */}
                        <img src={milestone.imageUrl} alt={milestone.title} className="w-48 h-32 object-cover rounded-lg flex-shrink-0" />

                        {/* Content */}
                        <div className="flex-grow">
                            <span className="font-bold text-red-600">{milestone.year}</span>
                            <h3 className="text-xl font-bold text-slate-800 mt-1">{milestone.title}</h3>
                            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                {milestone.description.slice(0, 150)}{milestone.description.length > 150 && '...'}
                            </p>
                            <p className="text-sm font-semibold text-slate-500 mt-3">
                                {milestone.outcomes.length} Key Outcomes
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="absolute top-6 right-6 flex gap-2">
                             <button onClick={() => handleEdit(milestone)} className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-100"><PencilIcon className="w-5 h-5" /></button>
                             <button onClick={() => handleDeleteClick(milestone)} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100"><TrashIcon className="w-5 h-5" /></button>
                        </div>
                    </div>
                ))}
            </div>
            
            <MilestoneEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} milestone={selectedMilestone} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={`milestone "${selectedMilestone?.title}"`} />
        </div>
    );
};

export default ManageJourney;