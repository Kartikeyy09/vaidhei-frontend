import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import MilestoneEditor from "../components/journey/MilestoneEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchMilestonesAsync, selectManageJourney, addMilestoneAsync, updateMilestoneAsync, deleteMilestoneAsync } from "../../features/adminSlice/ManageJourney/ManageJourneySlice";

// --- SKELETON LOADER COMPONENT ---
// This component mimics the layout of a single milestone card.
const MilestoneSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-start relative animate-pulse">
    {/* Image Placeholder */}
    <div className="w-full md:w-48 h-40 md:h-32 bg-slate-200 rounded-lg flex-shrink-0"></div>

    {/* Content Placeholder */}
    <div className="flex-grow w-full">
      <div className="h-4 w-1/4 bg-slate-200 rounded-md"></div>
      <div className="h-6 w-3/4 bg-slate-200 rounded-md mt-2"></div>
      <div className="h-4 w-full bg-slate-200 rounded-md mt-3"></div>
      <div className="h-4 w-5/6 bg-slate-200 rounded-md mt-2"></div>

      {/* Outcomes Placeholder */}
      <div className="mt-4">
        <div className="h-4 w-1/3 bg-slate-200 rounded-md"></div>
        <div className="mt-2 space-y-2">
          <div className="h-4 w-full bg-slate-200 rounded-md"></div>
          <div className="h-4 w-1/2 bg-slate-200 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
);


const ManageJourney = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    const SERVER_URL = "https://vaidhei-backend.onrender.com";

    const dispatch = useDispatch();
    const { data: milestones, loading, error } = useSelector(selectManageJourney);

    useEffect(() => {
        // Fetch only if the milestones list is empty to prevent re-fetching
        if (milestones.length === 0) {
            dispatch(fetchMilestonesAsync());
        }
    }, [dispatch, milestones.length]);

    const handleAddNew = () => { setSelectedMilestone(null); setIsEditorOpen(true); };
    const handleEdit = (milestone) => { setSelectedMilestone(milestone); setIsEditorOpen(true); };
    const handleDeleteClick = (milestone) => { setSelectedMilestone(milestone); setIsDeleteModalOpen(true); };

    const confirmDelete = () => {
        if (selectedMilestone) {
            dispatch(deleteMilestoneAsync(selectedMilestone._id))
                .unwrap()
                .then(() => {
                    setIsDeleteModalOpen(false);
                    setSelectedMilestone(null);
                })
                .catch(err => console.error("Failed to delete milestone:", err));
        }
    };

    const handleSave = (milestoneData) => {
        const action = selectedMilestone
            ? updateMilestoneAsync({ id: selectedMilestone._id, updatedData: milestoneData })
            : addMilestoneAsync(milestoneData);
        
        dispatch(action)
            .unwrap()
            .then(() => setIsEditorOpen(false))
            .catch(err => console.error("Failed to save milestone:", err));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Journey</h1>
                    <p className="text-slate-500 mt-1">Add, edit, or delete milestones from your company's history.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add Milestone
                </button>
            </div>

            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-4">Error: {error}</p>}

            <div className="space-y-6">
                {/* When loading and there's no data, show the skeleton */}
                {loading && milestones.length === 0 ? (
                    [...Array(4)].map((_, i) => <MilestoneSkeleton key={i} />)
                ) : milestones.length > 0 ? (
                    // Once loaded, show the actual milestones
                    milestones.map((milestone) => (
                        <div key={milestone._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-start relative transition-shadow hover:shadow-lg">
                            <img src={`${SERVER_URL}${milestone.imageUrl}`} alt={milestone.title} className="w-full md:w-48 h-40 md:h-32 object-cover rounded-lg flex-shrink-0 bg-gray-100" />
                            <div className="flex-grow">
                                <span className="font-bold text-red-600">{milestone.year}</span>
                                <h3 className="text-xl font-bold text-slate-800 mt-1">{milestone.title}</h3>
                                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{milestone.description}</p>
                                
                                {milestone.outcomes && milestone.outcomes.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-semibold text-slate-700">Key Outcomes:</h4>
                                        <ul className="list-disc list-inside mt-2 space-y-1">
                                            {milestone.outcomes.map((outcome, i) => (
                                                <li key={i} className="text-sm text-slate-600">{outcome}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => handleEdit(milestone)} className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-100"><PencilIcon className="w-5 h-5" /></button>
                                <button onClick={() => handleDeleteClick(milestone)} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100"><TrashIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))
                ) : (
                    // After loading, if there's still no data, show the empty state
                    <div className="text-center py-16 bg-white rounded-xl shadow-md border-dashed border-2 border-gray-300">
                        <h3 className="text-xl font-semibold text-slate-700">No Milestones Found</h3>
                        <p className="text-slate-500 mt-2">Click "Add Milestone" to start building your company's journey.</p>
                    </div>
                )}
            </div>
            
            <MilestoneEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} milestone={selectedMilestone} isSaving={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={`milestone "${selectedMilestone?.title}"`} isDeleting={loading} />
        </div>
    );
};

export default ManageJourney;