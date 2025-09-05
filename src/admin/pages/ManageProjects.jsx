import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ProjectEditor from "../components/projects/ProjectEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchProjectsAsync, 
    selectManageProjects, 
    addProjectAsync, 
    updateProjectAsync, 
    deleteProjectAsync 
} from "../../features/adminSlice/ManageProjects/ManageProjectsSlice";

// --- SKELETON LOADER COMPONENT ---
// This component renders a skeleton version of the table body.
const ProjectTableSkeleton = () => (
    <tbody className="animate-pulse">
        {[...Array(8)].map((_, i) => (
            <tr key={i} className="border-b border-slate-200">
                <td className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-slate-200 rounded-md flex-shrink-0"></div>
                        <div>
                            <div className="h-5 w-48 bg-slate-200 rounded-md"></div>
                            <div className="h-3 w-24 bg-slate-200 rounded-md mt-2"></div>
                        </div>
                    </div>
                </td>
                <td className="p-4 hidden lg:table-cell"><div className="h-4 w-32 bg-slate-200 rounded-md"></div></td>
                <td className="p-4"><div className="h-6 w-20 bg-slate-200 rounded-full"></div></td>
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

const StatusBadge = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        'Completed': 'bg-green-100 text-green-800',
        'Ongoing': 'bg-blue-100 text-blue-800',
        'Upcoming': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const ManageProjects = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const dispatch = useDispatch();
    const { data: projects, loading, error } = useSelector(selectManageProjects);

    useEffect(() => {
        // Fetch projects only if the list is empty to prevent re-fetching
        if (projects.length === 0) {
            dispatch(fetchProjectsAsync());
        }
    }, [dispatch, projects.length]);

    const handleAddNew = () => { setSelectedProject(null); setIsEditorOpen(true); };
    const handleEdit = (project) => { setSelectedProject(project); setIsEditorOpen(true); };
    const handleDeleteClick = (project) => { setSelectedProject(project); setIsDeleteModalOpen(true); };

    const SERVER_URL = "https://vaidhei-backend.onrender.com";
    
    const confirmDelete = () => {
        if (selectedProject) {
            dispatch(deleteProjectAsync(selectedProject._id))
                .unwrap()
                .then(() => setIsDeleteModalOpen(false))
                .catch(err => console.error("Failed to delete project:", err));
        }
    };

    const handleSave = (projectData) => {
        const action = selectedProject
            ? updateProjectAsync({ id: selectedProject._id, updatedData: projectData })
            : addProjectAsync(projectData);
        
        dispatch(action)
            .unwrap()
            .then(() => setIsEditorOpen(false))
            .catch(err => console.error("Failed to save project:", err));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Case Studies</h1>
                    <p className="text-slate-500 mt-1">Oversee your entire portfolio of case studies.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Case Study
                </button>
            </div>

            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-4">Error: {error}</p>}

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Case Study Title</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Location</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    
                    {loading && projects.length === 0 ? (
                        <ProjectTableSkeleton />
                    ) : projects.length > 0 ? (
                        <tbody>
                            {projects.map(project => (
                                <tr key={project._id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <img src={`${SERVER_URL}${project.image}`} alt={project.title} className="w-16 h-12 object-cover rounded-md flex-shrink-0 bg-gray-100" />
                                            <div>
                                                <p className="font-semibold text-slate-800">{project.title}</p>
                                                <p className="text-xs text-slate-500">/{project.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600 hidden lg:table-cell">{project.location}</td>
                                    <td className="p-4"><StatusBadge status={project.status} /></td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(project)} className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-100"><PencilIcon className="w-5 h-5" /></button>
                                            <button onClick={() => handleDeleteClick(project)} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100"><TrashIcon className="w-5 h-5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center py-16">
                                    <h3 className="text-xl font-semibold text-slate-700">No Case Studies Found</h3>
                                    <p className="text-slate-500 mt-2">Click "Add New Case Study" to get started.</p>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            
            <ProjectEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} project={selectedProject} isSaving={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedProject?.title} isDeleting={loading} />
        </div>
    );
};

export default ManageProjects;